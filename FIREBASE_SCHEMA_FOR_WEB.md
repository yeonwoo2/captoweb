# Capto Firebase Firestore 구조 (웹사이트 개발용)

## 개요

Capto는 Firebase Firestore를 데이터베이스로 사용하며, 현재 **정규화된 구조(Normalized Schema with JOIN)**로 설계되어 있습니다.

웹사이트의 회원가입/로그인 로직에서 사용자 정보를 저장할 때 아래 구조를 따라야 합니다.

---

## 1. Firestore Collections

### 1.1 Users Collection (`users/{uid}`)

**목적**: 사용자 기본 정보 및 구독 참조 저장

**구조**:
```
users/
├── user_uid_1/
│   ├── email: "user@example.com"
│   ├── subscription_plan: "free"  (FK to subscriptions/{plan_id})
│   ├── status: "active"           (active | expired | suspended)
│   ├── start_date: 2026-03-23T00:00:00Z
│   ├── end_date: 2027-03-23T23:59:59Z
│   └── (features는 여기 없음 - subscriptions에서 조인)
│
└── user_uid_2/
    └── ...
```

**필드 상세**:

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `email` | String | O | 사용자 이메일 |
| `subscription_plan` | String | O | 구독 플랜 ID: `free`, `basic`, `pro` |
| `status` | String | O | 구독 상태: `active`, `expired`, `suspended` |
| `start_date` | Timestamp | O | 구독 시작일 |
| `end_date` | Timestamp | O | 구독 만료일 |

**회원가입 시 초기값**:
```python
{
    "email": "new_user@example.com",
    "subscription_plan": "free",  # 기본값: 무료 플랜
    "status": "active",            # 기본값: 활성화
    "start_date": datetime.now(),  # 현재 시각
    "end_date": datetime.now() + timedelta(days=365)  # 1년 뒤
}
```

---

### 1.2 Subscriptions Collection (`subscriptions/{plan_id}`)

**목적**: 구독 플랜 정의 (프로, 베이직, 무료)

**구조**:
```
subscriptions/
├── free/
│   ├── name: "Free Plan"
│   ├── price: 0
│   ├── currency: "KRW"
│   ├── features:
│   │   ├── can_capture: true
│   │   ├── can_use_auto_capture: false
│   │   └── max_captures_per_month: 100
│   └── description: "무료 플랜"
│
├── basic/
│   ├── name: "Basic Plan"
│   ├── price: 9900
│   ├── currency: "KRW"
│   ├── features:
│   │   ├── can_capture: true
│   │   ├── can_use_auto_capture: true
│   │   └── max_captures_per_month: 500
│   └── description: "기본 플랜"
│
└── pro/
    ├── name: "Pro Plan"
    ├── price: 29900
    ├── currency: "KRW"
    ├── features:
    │   ├── can_capture: true
    │   ├── can_use_auto_capture: true
    │   └── max_captures_per_month: -1  # -1 = 무제한
    └── description: "프로 플랜"
```

**주요 특징**:
- 문서 ID는 플랜 이름 (`free`, `basic`, `pro`)
- 플랜 정의는 수정되지 않음 (읽기만)
- 모든 사용자가 참조하므로 한 곳에만 저장

**features 필드 설명**:

| 필드 | 타입 | 설명 |
|------|------|------|
| `can_capture` | Boolean | 단일 캡처 사용 가능 여부 |
| `can_use_auto_capture` | Boolean | 자동 캡처 사용 가능 여부 |
| `max_captures_per_month` | Integer | 월간 캡처 한도 (-1=무제한) |

---

### 1.3 Usage Collection (`usage/{user_id}/monthly/{YYYY-MM}`)

**목적**: 사용자의 월간 캡처 횟수 추적

**구조**:
```
usage/
└── user_uid_1/
    └── monthly/
        ├── 2026-03/
        │   ├── user_id: "user_uid_1"
        │   ├── month: "2026-03"
        │   ├── capture_count: 19
        │   ├── created_at: 2026-03-05T10:30:00Z
        │   └── last_capture_at: 2026-03-23T15:45:00Z
        │
        └── 2026-02/
            ├── user_id: "user_uid_1"
            ├── month: "2026-02"
            ├── capture_count: 47
            └── ...
```

**특징**:
- **자동 월 단위 분리**: 사용자가 캡처할 때마다 현재 월에 해당하는 문서가 자동 생성/업데이트
- **스케줄러 불필요**: 매달 자동으로 새로운 문서가 생성되므로 별도 초기화 필요 없음
- **히스토리 보관**: 이전 달의 문서는 그대로 유지 (분석 목적)

**필드 설명**:

| 필드 | 타입 | 설명 |
|------|------|------|
| `user_id` | String | 사용자 UID |
| `month` | String | 연월 (YYYY-MM 형식) |
| `capture_count` | Integer | 해당 달의 캡처 총 횟수 |
| `created_at` | Timestamp | 문서 생성 시각 |
| `last_capture_at` | Timestamp | 마지막 캡처 시각 |

**중요**: 회원가입 시에는 이 컬렉션에 데이터를 생성하지 않습니다.
- 사용자가 **첫 번째 캡처를 할 때** 자동으로 생성됨
- 로그인만 해서는 usage 문서가 생성되지 않음

---

## 2. JOIN 패턴 설명

이 구조는 **1:N 관계를 정규화한 JOIN 패턴**입니다.

### 구독 정보 조회 흐름

```
1. users/{uid} 문서 읽기
   → subscription_plan: "pro" (FK)

2. subscriptions/{plan_id} 문서 읽기 (subscription_plan 값 사용)
   → features, price 등 플랜 정의 조회

3. 두 데이터를 병합 (JOIN)
   → 최종: 사용자 정보 + 구독 플랜 상세
```

### 코드 예제 (JavaScript/Node.js)

```javascript
// 1. 사용자 정보 조회
const userDoc = await db.collection('users').doc(uid).get();
const userData = userDoc.data();
// {
//   email: "user@example.com",
//   subscription_plan: "pro",
//   status: "active",
//   ...
// }

// 2. 플랜 정의 조회 (subscription_plan 값으로)
const planDoc = await db
  .collection('subscriptions')
  .doc(userData.subscription_plan)  // "pro"
  .get();
const planData = planDoc.data();
// {
//   name: "Pro Plan",
//   price: 29900,
//   features: {
//     can_capture: true,
//     can_use_auto_capture: true,
//     max_captures_per_month: -1
//   }
// }

// 3. 병합 (JOIN)
const subscription = {
  ...userData,
  ...planData
};
```

---

## 3. 웹사이트 회원가입 로직

### 3.1 회원가입 프로세스

```
사용자 입력 (이메일, 비밀번호)
         ↓
Firebase Auth 계정 생성
         ↓
users/{uid} 문서 생성 ← 여기!
         ↓
로그인 페이지로 리다이렉트
```

### 3.2 회원가입 시 users 문서 생성

**JavaScript (웹사이트)**:

```javascript
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

async function signUp(email, password) {
  // 1. Firebase Auth에 사용자 생성
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // 2. Firestore users 문서 생성
  const now = new Date();
  const oneYearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  await setDoc(doc(db, 'users', uid), {
    email: email,
    subscription_plan: 'free',  // 기본값: 무료 플랜
    status: 'active',           // 기본값: 활성화
    start_date: now,
    end_date: oneYearLater,
    // features는 저장하지 않음 (subscriptions에서 조인)
  });

  return uid;
}
```

**Python (데스크톱 앱)**:

```python
from datetime import datetime, timedelta

def create_user_document(user_id: str, email: str):
    """회원가입 후 users 문서 생성."""
    from src.firebase.firebase_client import FirebaseClient

    firebase_client = FirebaseClient()
    db = firebase_client.get_firestore()

    now = datetime.now()
    one_year_later = now + timedelta(days=365)

    db.collection('users').document(user_id).set({
        'email': email,
        'subscription_plan': 'free',  # 기본값
        'status': 'active',            # 기본값
        'start_date': now,
        'end_date': one_year_later,
    })
```

### 3.3 필수 필드 체크리스트

회원가입 시 Firestore에 저장할 때 반드시 포함:

- [ ] `email` (String): 사용자 이메일
- [ ] `subscription_plan` (String): "free" (기본값)
- [ ] `status` (String): "active" (기본값)
- [ ] `start_date` (Timestamp): 현재 시각
- [ ] `end_date` (Timestamp): 1년 뒤

**주의**: `features` 필드는 저장하지 마세요!
- features는 subscriptions 컬렉션에만 저장
- users에서는 subscription_plan (FK)로 참조

---

## 4. Firestore 보안 규칙

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // users: 본인 문서만 읽기/쓰기 가능
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // subscriptions: 모두 읽기 가능 (플랜 정보는 공개)
    match /subscriptions/{planId} {
      allow read: if true;
      allow write: if false;  // 관리자만 수정 (Admin SDK)
    }

    // usage: 본인 데이터만 읽기 가능
    match /usage/{userId}/monthly/{month} {
      allow read: if request.auth != null && userId == request.auth.uid;
      allow write: if false;  // 백엔드만 업데이트 (Admin SDK)
    }
  }
}
```

---

## 5. 데이터 검증 규칙

### subscription_plan 유효성

```javascript
// subscription_plan은 반드시 다음 중 하나여야 함
const VALID_PLANS = ['free', 'basic', 'pro'];

if (!VALID_PLANS.includes(userData.subscription_plan)) {
  throw new Error('Invalid subscription plan');
}
```

### status 유효성

```javascript
// status는 반드시 다음 중 하나여야 함
const VALID_STATUSES = ['active', 'expired', 'suspended'];

if (!VALID_STATUSES.includes(userData.status)) {
  throw new Error('Invalid status');
}
```

### 날짜 유효성

```javascript
// end_date는 start_date보다 뒤여야 함
if (userData.end_date <= userData.start_date) {
  throw new Error('end_date must be after start_date');
}
```

---

## 6. 쿼리 예제

### 사용자 구독 정보 조회

```javascript
// users 문서 조회
const userDoc = await db.collection('users').doc(uid).get();
const user = userDoc.data();

// subscriptions 문서 조회 (JOIN)
const planDoc = await db
  .collection('subscriptions')
  .doc(user.subscription_plan)
  .get();
const plan = planDoc.data();

// 통합 정보
const subscription = {
  plan: user.subscription_plan,
  status: user.status,
  startDate: user.start_date,
  endDate: user.end_date,
  features: plan.features,
  price: plan.price,
};
```

### 월간 캡처 횟수 조회

```javascript
// 현재 월 (YYYY-MM)
const month = new Date().toISOString().slice(0, 7);  // "2026-03"

// usage 문서 조회
const usageDoc = await db
  .collection('usage')
  .doc(uid)
  .collection('monthly')
  .doc(month)
  .get();

if (usageDoc.exists()) {
  const usage = usageDoc.data();
  console.log(`Captures this month: ${usage.capture_count}`);
} else {
  console.log('No captures yet this month');
}
```

### 월간 한도 확인

```javascript
// 사용자 구독 조회 (위의 예제 참고)
const maxCaptures = plan.features.max_captures_per_month;

// 월간 캡처 횟수 조회 (위의 예제 참고)
const currentCaptures = usageDoc.exists() ? usageDoc.data().capture_count : 0;

// 한도 체크
const isAllowed = maxCaptures === -1 || currentCaptures < maxCaptures;
const remaining = maxCaptures === -1 ? -1 : maxCaptures - currentCaptures;

console.log({
  allowed: isAllowed,
  current: currentCaptures,
  max: maxCaptures,
  remaining: remaining,
});
```

---

## 7. 마이그레이션 고려사항

### 기존 사용자 데이터

이전 구조에서 마이그레이션 완료됨:
- ✅ features 필드는 users에서 subscriptions로 이동
- ✅ plan 필드는 subscription_plan으로 이름 변경
- ✅ subscription_plan은 FK (subscriptions 문서의 ID)

### 캡처 횟수 필드명

현재 통일된 필드명:
- ✅ `capture_count` (snake_case로 통일)
- ✅ `last_capture_at` (snake_case로 통일)
- ✅ `max_captures_per_month` (일일 한도가 아님, 월간 한도)

---

## 8. 개발 체크리스트

웹사이트 회원가입 구현 시:

- [ ] 회원가입 폼에서 이메일, 비밀번호 입력 받기
- [ ] Firebase Auth로 사용자 계정 생성
- [ ] Auth 성공 후 users/{uid} 문서 생성
  - [ ] email: 사용자 이메일
  - [ ] subscription_plan: "free"
  - [ ] status: "active"
  - [ ] start_date: 현재 시각
  - [ ] end_date: 1년 뒤
- [ ] 데이터 유효성 검증
- [ ] 에러 처리 (중복 이메일 등)
- [ ] 로그인 페이지로 리다이렉트

---

## 9. 문제 해결

### Q: features는 왜 users에 저장하면 안 되나?

**A**: 정규화 때문입니다.
- features는 플랜(free, basic, pro)에만 의존
- 같은 플랜의 모든 사용자가 동일한 features를 가짐
- 따라서 한 곳(subscriptions)에만 저장하고 FK로 참조
- **장점**: 플랜의 features를 수정할 때 한 곳만 수정하면 모든 사용자에게 적용

### Q: usage 문서는 회원가입 때 생성하나?

**A**: 아니요, **첫 캡처 시**에 자동 생성됩니다.
- 회원가입: users 문서만 생성
- 첫 캡처: usage/{uid}/monthly/{YYYY-MM} 문서 자동 생성
- **이유**: 비활성 사용자를 위한 불필요한 문서 생성 방지

### Q: 월간 한도는 자동 초기화되나?

**A**: 예, 자동 초기화됩니다.
- 1월: usage/.../monthly/2026-01 (capture_count: 50)
- 2월: usage/.../monthly/2026-02 (capture_count: 0 또는 새로 시작)
- 월별 독립적인 문서이므로 자동 초기화

### Q: subscription_plan을 직접 입력하나?

**A**: 절대 아닙니다!
- 회원가입: **항상** "free"로 설정
- 관리자만 업그레이드 가능 (Admin SDK 또는 Firebase Console)
- 사용자는 웹사이트에서 플랜 변경 요청만 (향후 결제 연동)

---

## 10. 예제 데이터

### users 예제

```json
{
  "uid": "KLjX9mP2vFqZ8wN5aB7cD3E",
  "email": "user@example.com",
  "subscription_plan": "free",
  "status": "active",
  "start_date": "2026-03-23T10:30:00.000Z",
  "end_date": "2027-03-23T23:59:59.000Z"
}
```

### subscriptions/{plan_id} 예제

```json
{
  "free": {
    "name": "Free Plan",
    "price": 0,
    "currency": "KRW",
    "features": {
      "can_capture": true,
      "can_use_auto_capture": false,
      "max_captures_per_month": 100
    },
    "description": "무료 플랜"
  }
}
```

### usage/{uid}/monthly/{month} 예제

```json
{
  "2026-03": {
    "user_id": "KLjX9mP2vFqZ8wN5aB7cD3E",
    "month": "2026-03",
    "capture_count": 19,
    "created_at": "2026-03-05T10:30:00.000Z",
    "last_capture_at": "2026-03-23T15:45:00.000Z"
  }
}
```

---

## 11. 질문이 있을 때

이 문서가 부족하거나 명확하지 않은 부분은 다음을 확인하세요:

- **데스크톱 앱 구현**: `/src/subscription/subscription_manager.py`
- **모델 정의**: `/src/subscription/models.py`
- **Firebase 설정**: `/config/firebase_config.yaml`
- **보안 규칙**: Firebase Console → Firestore → 규칙

---

**최종 수정**: 2026-03-23
**작성자**: Claude Code + 개발팀
