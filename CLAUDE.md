# Capto - 웹사이트 기획서

## 프로젝트 개요

Capto는 iOS와 Android 기기의 화면을 macOS에서 캡처할 수 있는 데스크톱 애플리케이션입니다. 이 문서는 Capto의 공식 웹사이트 기획을 담고 있습니다.

---

## 1. 사이트 구조

### 원페이지 구조 (Discord 스타일)

```
Capto Website
├── / (메인 원페이지)
│   ├── #hero (히어로)
│   ├── #features (기능)
│   ├── #pricing (요금제)
│   ├── #how-it-works (사용법)
│   ├── #download (다운로드)
│   └── #faq (FAQ)
│
└── 별도 페이지 (최소화)
    ├── /login (로그인)
    ├── /signup (회원가입)
    └── /dashboard (대시보드)
```

**설계 원칙**:
- Discord, Notion, Linear와 같은 모던 SaaS 웹사이트 스타일
- 모든 주요 정보를 원페이지에 스크롤로 제공
- 최소한의 별도 페이지 (로그인, 회원가입, 대시보드만)
- 부드러운 애니메이션과 인터랙션

---

## 2. 페이지별 상세 설계

### 2.1 네비게이션 바 (고정)

**기능**:
- 초기: 투명 배경
- 스크롤 후: 불투명 다크 배경 + 그림자
- 스무스 스크롤 네비게이션

**구성**:
```
[로고] Capto     기능  요금제  사용법  FAQ     [다운로드] [로그인] [시작하기]
```

**스타일**:
- 고정 위치 (fixed top)
- 스크롤 시 `background: #202225` + `box-shadow`
- 호버 효과: `color: #5865f2`

---

### 2.2 Hero 섹션

**목적**: 첫 인상으로 제품 가치 전달

**레이아웃**:
```
┌──────────────────────────────────────┐
│      [그라데이션 배경]               │
│                                      │
│   iOS & Android 화면을               │
│   macOS에서 쉽게 캡처하세요          │
│                                      │
│   [무료로 시작하기] [앱 다운로드]    │
│                                      │
│   [앱 스크린샷 목업]                 │
└──────────────────────────────────────┘
```

**배경 효과**:
```css
background: linear-gradient(135deg, #5865f2 0%, #7983f5 100%);
```

**애니메이션**:
- 타이틀: 페이드 인 + 위로 슬라이드
- 버튼: 딜레이 후 페이드 인
- 스크린샷: 회전 + 페이드 인
- 스크롤 인디케이터: Bounce 애니메이션

**CTA 버튼**:
- 주 버튼: "무료로 시작하기" → `/signup`
- 부 버튼: "앱 다운로드" → `#download` (스크롤)

---

### 2.3 Features 섹션

**목적**: 주요 기능 6가지 소개

**레이아웃**: 3열 그리드 (모바일: 1열)

**기능 목록**:
1. **📱 iOS & Android 지원**
   - USB 연결만으로 간편하게

2. **⚡ 실시간 캡처**
   - 현재 화면 즉시 캡처

3. **🎨 고품질 이미지**
   - 원본 해상도 PNG 저장

4. **🤖 자동 캡처**
   - UI 탐색 중 자동 스크린샷

5. **💾 갤러리 관리**
   - 캡처한 이미지 쉽게 관리

6. **🔍 UI 요소 탐색**
   - 앱 UI 계층 구조 파악

**카드 디자인**:
```
┌─────────────┐
│   아이콘    │
│   제목      │
│   설명      │
└─────────────┘
```

**스타일**:
- 배경: `#2f3136`
- 호버: `#40444b`
- 둥근 모서리: `border-radius: 12px`
- 패딩: `2rem`

**애니메이션**:
- 스크롤 시 순차적 페이드 인
- Intersection Observer 사용
- 각 카드 0.1초 딜레이

---

### 2.4 Pricing 섹션

**목적**: 요금제 비교 및 구독 유도

**플랜 구성**:

| 플랜  | 가격      | 월간 한도 | 자동 캡처 | 우선 지원 | API |
|-------|-----------|-----------|-----------|-----------|-----|
| Free  | 무료      | 100회     | ✗         | ✗         | ✗   |
| Basic | ₩9,900/월 | 500회     | ✓         | ✗         | ✗   |
| Pro   | ₩29,900/월| 무제한    | ✓         | ✓         | ✓   |

**디자인 특징**:
- Basic 플랜: 강조 (위로 살짝 올림, 테두리)
- 호버: 전체 카드 위로 이동
- "⭐ 인기" 뱃지 표시

**레이아웃**:
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Free      │  │   Basic     │  │    Pro      │
│             │  │  ⭐ 인기    │  │  🚀 최고    │
│   무료      │  │  ₩9,900/월  │  │  ₩29,900/월 │
│             │  │             │  │             │
│ 100회/월    │  │ 500회/월    │  │ 무제한      │
│ [시작하기]  │  │ [지금 구독] │  │ [지금 구독] │
└─────────────┘  └─────────────┘  └─────────────┘
```

**CTA**:
- Free: "시작하기" → `/signup`
- Basic/Pro: "지금 구독" → `/signup` (플랜 파라미터 포함)

**하단 메시지**:
```
💰 모든 플랜 7일 무료 체험 가능
```

---

### 2.5 How It Works 섹션

**목적**: 3단계 사용법 시각화

**단계**:

1. **Capto 다운로드**
   - macOS 10.13 이상에서 무료 사용
   - [다운로드 이미지]

2. **기기 연결**
   - USB로 iPhone/iPad 또는 Android 연결
   - [연결 이미지]

3. **캡처 시작**
   - 원클릭으로 고품질 스크린샷 저장
   - [캡처 결과 이미지]

**레이아웃**: 세로 타임라인 스타일

**애니메이션**:
- 각 단계 순차적 슬라이드 인
- 이미지는 약간의 딜레이 후 페이드 인

**하단 CTA**:
```
[지금 무료로 시작하기 →]
```

---

### 2.6 Download 섹션

**목적**: DMG 파일 다운로드 유도

**레이아웃**:
```
┌────────────────────────────┐
│  지금 바로 Capto를         │
│  다운로드하세요            │
│                            │
│  macOS 10.13 이상 지원     │
│                            │
│  [Capto 아이콘]            │
│  Capto 1.0.0               │
│  81MB                      │
│                            │
│  [macOS용 다운로드 (DMG)]  │
│                            │
│  ✓ Intel & Apple Silicon   │
│  ✓ 무료 체험 가능          │
│  ✓ 클릭 한 번으로 설치     │
└────────────────────────────┘
```

**다운로드 버튼**:
- Firebase Storage 또는 GitHub Releases에서 DMG 다운로드
- 다운로드 시 이벤트 트래킹 (Google Analytics)

**하단 메시지**:
```
또는 계정을 만들고 웹에서 시작하기
[회원가입 →]
```

---

### 2.7 FAQ 섹션

**목적**: 자주 묻는 질문 답변

**질문 목록**:

1. **무료로 사용할 수 있나요?**
   - 네, Free 플랜으로 월 100회까지 무료로 캡처할 수 있습니다.

2. **iOS와 Android 모두 지원하나요?**
   - 네, iPhone/iPad와 모든 Android 기기를 지원합니다.

3. **플랜을 변경할 수 있나요?**
   - 네, 언제든지 업그레이드하거나 다운그레이드할 수 있습니다.

4. **환불 정책은 어떻게 되나요?**
   - 7일 이내 전액 환불 가능합니다.

5. **기업용 플랜이 있나요?**
   - 10명 이상의 팀을 위한 맞춤 플랜을 제공합니다. [문의하기]

**인터랙션**:
- 아코디언 방식
- 질문 클릭 시 답변 슬라이드 다운
- 열린 항목 아이콘 변경: `▼` → `▲`

**하단 CTA**:
```
더 궁금한 점이 있으신가요?
[문의하기 →]
```

---

### 2.8 Footer

**레이아웃**:
```
[로고] Capto

제품         지원         회사
기능         문서         소개
요금제       가이드       블로그
다운로드     FAQ          연락처

───────────────────────────────

© 2026 Capto. All rights reserved.
개인정보처리방침 | 이용약관
```

**링크**:
- 제품: `#features`, `#pricing`, `#download`
- 지원: `/docs`, `/docs/guides`, `#faq`
- 회사: `/about`, `/blog`, `/contact`

---

## 3. 별도 페이지

### 3.1 로그인 페이지 (`/login`)

**레이아웃**: 센터 정렬 폼

**컨텐츠**:
```
┌────────────────────┐
│  [로고] Capto      │
│                    │
│  Capto에 로그인    │
│                    │
│  이메일            │
│  [______________]  │
│                    │
│  비밀번호          │
│  [______________]  │
│                    │
│  □ 로그인 상태 유지│
│     [비밀번호 찾기]│
│                    │
│  [로그인]          │
│                    │
│  ─── 또는 ───      │
│                    │
│  [Google 로그인]   │
│  [Apple 로그인]    │
│                    │
│  계정이 없으신가요?│
│  [회원가입]        │
└────────────────────┘
```

**기능**:
- Firebase Authentication 연동
- 이메일/비밀번호 로그인
- Google/Apple 소셜 로그인 (향후)
- 비밀번호 찾기 (이메일 인증)
- 로그인 성공 시 `/dashboard`로 리다이렉트

---

### 3.2 회원가입 페이지 (`/signup`)

**레이아웃**: 로그인과 유사

**컨텐츠**:
```
┌────────────────────┐
│  [로고] Capto      │
│                    │
│  Capto 계정 만들기 │
│                    │
│  이메일            │
│  [______________]  │
│                    │
│  비밀번호          │
│  [______________]  │
│                    │
│  비밀번호 확인     │
│  [______________]  │
│                    │
│  □ 이용약관 동의   │
│                    │
│  [회원가입]        │
│                    │
│  ─── 또는 ───      │
│                    │
│  [Google 계속하기] │
│  [Apple 계속하기]  │
│                    │
│  이미 계정이 있나요?│
│  [로그인]          │
└────────────────────┘
```

**기능**:
- Firebase Authentication 연동
- 이메일 중복 확인
- 비밀번호 강도 체크
- 약관 동의 필수
- 회원가입 완료 시 이메일 인증 발송
- 성공 시 `/dashboard`로 리다이렉트

---

### 3.3 대시보드 페이지 (`/dashboard`)

**레이아웃**: 사이드바 + 메인 컨텐츠

**사이드바 메뉴**:
- 📊 대시보드
- 🔑 구독 관리
- 👤 프로필
- 📥 다운로드
- 📖 사용 가이드

**메인 컨텐츠 (대시보드)**:
```
안녕하세요, user@example.com님

┌──────────────────────┐
│ 현재 플랜: Basic     │
│ 상태: 활성화 ✓       │
│ 갱신 예정일: 2027-03-22│
│                      │
│ [플랜 변경] [구독 취소]│
└──────────────────────┘

┌──────────────────────┐
│ 이번 달 사용량       │
│                      │
│ 47 / 500 회 (9%)     │
│ [██░░░░░░░░░░░░]     │
│                      │
│ 남은 횟수: 453회     │
└──────────────────────┘

┌──────────────────────┐
│ 빠른 시작            │
│                      │
│ 1. [Capto 다운로드]  │
│ 2. [기기 연결 방법]  │
│ 3. [첫 캡처 시작]    │
└──────────────────────┘
```

**구독 관리 탭**:
- 현재 플랜 정보
- 사용량 그래프
- 결제 내역
- 영수증 다운로드

**프로필 탭**:
- 계정 정보
- 비밀번호 변경
- 알림 설정
- 계정 삭제

---

## 4. 기술 스택

### 4.1 프론트엔드

```
Next.js 14 (App Router)
├── React 18
├── TypeScript
├── TailwindCSS (스타일링)
├── Framer Motion (애니메이션)
└── shadcn/ui (UI 컴포넌트)
```

**선택 이유**:
- **Next.js**: SEO 최적화, 서버사이드 렌더링
- **TypeScript**: 타입 안정성, 개발 경험
- **TailwindCSS**: 빠른 스타일링, 일관성
- **Framer Motion**: 부드러운 애니메이션
- **shadcn/ui**: 접근성 좋은 UI 컴포넌트

### 4.2 백엔드 / 데이터베이스

```
Firebase
├── Authentication (인증)
├── Firestore (데이터베이스)
├── Storage (파일 저장 - DMG)
└── Cloud Functions (서버리스)
```

**선택 이유**:
- 이미 데스크톱 앱에서 사용 중
- 서버 관리 불필요
- 실시간 동기화
- 확장성

### 4.3 결제 시스템

```
Stripe
└── Stripe Billing (구독 관리)
```

**대안**:
- Paddle (해외 결제)
- 토스페이먼츠 (국내)

### 4.4 호스팅

```
Vercel
```

**장점**:
- Next.js 최적화
- 무료 티어
- 자동 배포 (GitHub 연동)
- 글로벌 CDN

### 4.5 분석 및 추적

```
Google Analytics 4
└── 주요 이벤트:
    - page_view
    - sign_up
    - login
    - download_app
    - subscribe
    - purchase
```

---

## 4.6 Firebase 설정 및 환경 변수

### Firebase 프로젝트 정보

**중요**: 데스크톱 앱과 동일한 Firebase 프로젝트 사용

현재 프로젝트는 이미 Firebase가 설정되어 있습니다:
- **프로젝트 ID**: `capto-91742`
- **프로젝트 위치**: `config/firebase_config.yaml`

### 웹사이트 Firebase 설정

#### 1. Firebase 콘솔 설정

**Firebase Console**: https://console.firebase.google.com/project/capto-91742

**필수 단계**:

1. **Authentication 활성화** (이미 완료)
   - Firebase Console → Authentication → Sign-in method
   - 활성화할 제공업체:
     - ✅ 이메일/비밀번호 (필수)
     - ⬜ Google (향후)
     - ⬜ Apple (향후)

2. **Firestore Database 설정** (이미 완료)
   - Firebase Console → Firestore Database
   - 모드: 프로덕션
   - 위치: `asia-northeast3` (서울)

3. **웹 앱 추가** (새로 추가 필요)
   - Firebase Console → 프로젝트 설정 → 일반
   - "앱 추가" → 웹 (</>)
   - 앱 닉네임: "Capto Website"
   - Firebase Hosting 설정 안함 (Vercel 사용)

4. **Web SDK 구성 정보 복사**
   ```javascript
   // Firebase 콘솔에서 제공하는 설정
   const firebaseConfig = {
     apiKey: "AIzaSyDJQu2KU9dfk3jMEpcwuaipw0AAvrBH-s8",
     authDomain: "capto-91742.firebaseapp.com",
     databaseURL: "https://capto-91742.firebaseio.com",
     projectId: "capto-91742",
     storageBucket: "capto-91742.firebasestorage.app",
     messagingSenderId: "783548063478",
     appId: "1:783548063478:web:84997762e8d393ec8c96d7"
   };
   ```

#### 2. 환경 변수 설정

**파일 생성**: `.env.local` (프로젝트 루트)

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDJQu2KU9dfk3jMEpcwuaipw0AAvrBH-s8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=capto-91742.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://capto-91742.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=capto-91742
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=capto-91742.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=783548063478
NEXT_PUBLIC_FIREBASE_APP_ID=1:783548063478:web:84997762e8d393ec8c96d7

# Firebase Admin SDK (서버 사이드 전용)
FIREBASE_ADMIN_PROJECT_ID=capto-91742
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@capto-91742.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Stripe (향후 결제 연동시)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 기타
NEXT_PUBLIC_APP_URL=https://capto.app
```

**⚠️ 보안 주의사항**:
```bash
# .gitignore에 추가 (필수!)
.env.local
.env*.local
.env.production
```

#### 3. Firebase SDK 초기화 코드

**파일**: `lib/firebase.ts`

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
```

#### 4. Firebase Admin SDK 초기화 (서버 사이드)

**파일**: `lib/firebase-admin.ts`

```typescript
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();

export default admin;
```

#### 5. Firestore 보안 규칙

**Firebase Console → Firestore Database → 규칙**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 사용자 문서 - 본인만 읽기/쓰기
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 구독 정보 - 읽기는 본인만, 쓰기는 관리자만
    match /subscriptions/{subscriptionId} {
      allow read: if request.auth != null &&
                     resource.data.userId == request.auth.uid;
      allow write: if false; // Admin SDK만 가능
    }

    // 사용량 추적 - 읽기는 본인만, 쓰기는 서버에서만
    match /usage/{userId}/monthly/{month} {
      allow read: if request.auth != null && userId == request.auth.uid;
      allow write: if false; // Cloud Functions 또는 Admin SDK만
    }

    // 다운로드 정보 - 모두 읽기 가능
    match /downloads/{downloadId} {
      allow read: if true;
      allow write: if false; // Admin SDK만
    }
  }
}
```

#### 6. Authentication 설정

**Firebase Console → Authentication → Settings**

**이메일 템플릿 커스터마이징**:
- 이메일 확인
- 비밀번호 재설정
- 이메일 주소 변경

**승인된 도메인**:
- `capto.app` (프로덕션)
- `capto-website.vercel.app` (스테이징)
- `localhost` (개발)

#### 7. 인증 컨텍스트 (React Context)

**파일**: `contexts/AuthContext.tsx`

```typescript
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    // 이메일 인증 발송
    await sendEmailVerification(user);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

#### 8. 구독 정보 조회 훅

**파일**: `hooks/useSubscription.ts`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface Subscription {
  plan: 'free' | 'basic' | 'pro';
  status: 'active' | 'expired' | 'suspended';
  startDate: Date;
  endDate: Date;
  features: {
    canCapture: boolean;
    canUseAutoCapture: boolean;
    maxCapturesPerDay: number;
  };
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    // Firestore 실시간 구독
    const unsubscribe = onSnapshot(
      doc(db, 'subscriptions', user.uid),
      (doc) => {
        if (doc.exists()) {
          setSubscription(doc.data() as Subscription);
        } else {
          setSubscription(null);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  return { subscription, loading };
}
```

#### 9. 서비스 계정 키 설정 (Admin SDK)

**Firebase Console → 프로젝트 설정 → 서비스 계정**

1. "새 비공개 키 생성" 클릭
2. JSON 파일 다운로드
3. 파일 내용을 환경 변수로 설정:

```bash
# .env.local
FIREBASE_ADMIN_PROJECT_ID=capto-91742
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@capto-91742.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFA...\n-----END PRIVATE KEY-----\n"
```

**⚠️ 절대 Git에 커밋하지 말 것!**

#### 10. 개발 환경 설정 체크리스트

**프론트엔드 (클라이언트 사이드)**:
- [ ] `.env.local` 파일 생성
- [ ] `NEXT_PUBLIC_FIREBASE_*` 환경 변수 설정
- [ ] `lib/firebase.ts` 파일 생성
- [ ] Firebase SDK 설치: `npm install firebase`

**백엔드 (서버 사이드)**:
- [ ] `FIREBASE_ADMIN_*` 환경 변수 설정
- [ ] `lib/firebase-admin.ts` 파일 생성
- [ ] Firebase Admin SDK 설치: `npm install firebase-admin`

**Firestore**:
- [ ] 보안 규칙 설정
- [ ] 인덱스 생성 (필요시)

**Authentication**:
- [ ] 이메일/비밀번호 로그인 활성화
- [ ] 이메일 템플릿 커스터마이징
- [ ] 승인된 도메인 추가

**배포 (Vercel)**:
- [ ] Vercel Dashboard → Environment Variables
- [ ] 모든 환경 변수 추가 (프로덕션, 프리뷰, 개발)
- [ ] 서비스 계정 키 추가

#### 11. 로컬 개발 시작

```bash
# 프로젝트 생성
npx create-next-app@latest capto-website --typescript --tailwind --app

# 디렉토리 이동
cd capto-website

# Firebase SDK 설치
npm install firebase firebase-admin

# Framer Motion 설치
npm install framer-motion

# 환경 변수 파일 생성
touch .env.local

# 개발 서버 시작
npm run dev
```

`.env.local` 파일에 위의 환경 변수들을 추가한 후 개발 시작!

---

## 5. 디자인 시스템

### 5.1 색상 팔레트

**주요 색상**:
```css
--primary: #5865f2;      /* 블루 */
--success: #43b581;      /* 그린 */
--warning: #faa61a;      /* 옐로우 */
--danger: #ed4245;       /* 레드 */
```

**배경 색상**:
```css
--bg-dark: #202225;      /* 다크 */
--bg-medium: #2f3136;    /* 미디엄 */
--bg-light: #36393f;     /* 라이트 */
```

**텍스트 색상**:
```css
--text-primary: #ffffff;   /* 화이트 */
--text-secondary: #dcddde; /* 라이트 그레이 */
--text-tertiary: #8e9297;  /* 그레이 */
```

### 5.2 타이포그래피

**폰트 패밀리**:
```css
--font-en: 'Inter', sans-serif;       /* 영문 */
--font-kr: 'Pretendard', sans-serif;  /* 한글 */
```

**폰트 크기**:
```css
--text-hero: 64px;    /* Hero */
--text-h1: 36px;      /* H1 */
--text-h2: 28px;      /* H2 */
--text-h3: 24px;      /* H3 */
--text-body: 16px;    /* Body */
--text-small: 14px;   /* Small */
```

### 5.3 간격 시스템

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

### 5.4 그림자

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.3);
```

### 5.5 버튼 스타일

**Primary 버튼**:
```css
background: #5865f2;
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;

hover: background: #4752c4;
```

**Secondary 버튼**:
```css
background: transparent;
border: 2px solid #5865f2;
color: #5865f2;

hover: background: rgba(88, 101, 242, 0.1);
```

**Tertiary 버튼**:
```css
background: #4f545c;
color: white;

hover: background: #5d6269;
```

---

## 6. 애니메이션 가이드

### 6.1 페이드 인

```typescript
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
```

### 6.2 슬라이드 인

```typescript
const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};
```

### 6.3 스케일 업

```typescript
const scaleUp = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8 }
};
```

### 6.4 순차 애니메이션

```typescript
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

## 7. SEO 최적화

### 7.1 메타 정보

```html
<title>Capto - iOS & Android 화면 캡처 for macOS</title>
<meta name="description" content="iOS와 Android 기기의 화면을 macOS에서 쉽게 캡처하세요. 앱 개발자와 디자이너를 위한 전문 스크린 캡처 도구.">
<meta name="keywords" content="iOS 캡처, Android 캡처, 스크린샷, macOS, 화면 캡처, 앱 개발, UI 디자인">

<!-- Open Graph -->
<meta property="og:title" content="Capto - iOS & Android 화면 캡처">
<meta property="og:description" content="전문가를 위한 크로스 플랫폼 스크린 캡처 솔루션">
<meta property="og:image" content="https://capto.app/og-image.png">
<meta property="og:url" content="https://capto.app">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Capto - iOS & Android 화면 캡처">
<meta name="twitter:description" content="전문가를 위한 크로스 플랫폼 스크린 캡처 솔루션">
<meta name="twitter:image" content="https://capto.app/og-image.png">
```

### 7.2 구조화된 데이터 (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Capto",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "macOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "250"
  }
}
```

### 7.3 sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://capto.app/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://capto.app/login</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://capto.app/signup</loc>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 8. 개발 로드맵

### Week 1: 프로젝트 셋업 & Hero
- [ ] Next.js 14 프로젝트 초기화
- [ ] TailwindCSS, Framer Motion 설치
- [ ] Firebase 프로젝트 연동
- [ ] 네비게이션 바 (스크롤 감지)
- [ ] Hero 섹션 (그라데이션 + 애니메이션)

### Week 2: 주요 섹션
- [ ] Features 섹션 (카드 그리드)
- [ ] Pricing 섹션 (플랜 비교)
- [ ] How It Works 섹션
- [ ] Download 섹션
- [ ] FAQ 섹션 (아코디언)
- [ ] Footer

### Week 3: 인증 시스템
- [ ] 로그인 페이지
- [ ] 회원가입 페이지
- [ ] Firebase Authentication 연동
- [ ] 비밀번호 찾기
- [ ] 이메일 인증

### Week 4: 대시보드
- [ ] 대시보드 레이아웃 (사이드바)
- [ ] 구독 상태 표시
- [ ] 사용량 그래프
- [ ] 프로필 관리
- [ ] 결제 내역 (향후 Stripe 연동)

### Week 5: 최적화 & 배포
- [ ] 반응형 디자인 (모바일)
- [ ] 애니메이션 디테일
- [ ] SEO 최적화 (메타 태그, sitemap)
- [ ] Google Analytics 연동
- [ ] Vercel 배포
- [ ] 도메인 연결

---

## 9. 참고 사이트

**디자인 영감**:
- Discord: https://discord.com (원페이지, 그라데이션)
- Notion: https://notion.so (섹션 전환, 타이포그래피)
- Linear: https://linear.app (미니멀, 애니메이션)
- Stripe: https://stripe.com (요금제 페이지)

**UI 컴포넌트**:
- shadcn/ui: https://ui.shadcn.com
- TailwindUI: https://tailwindui.com

**애니메이션**:
- Framer Motion: https://www.framer.com/motion
- Lottie: https://lottiefiles.com (아이콘 애니메이션)

---

## 10. 향후 확장 계획

### Phase 2 (Stripe 연동)
- 자동 결제 시스템
- 구독 업그레이드/다운그레이드
- 환불 처리
- 영수증 자동 발행

### Phase 3 (소셜 로그인)
- Google 로그인
- Apple 로그인
- GitHub 로그인 (개발자 타겟)

### Phase 4 (추가 기능)
- 팀 기능 (Pro 플랜)
- API 키 발급
- Webhook 설정
- 사용 통계 대시보드

### Phase 5 (콘텐츠)
- 블로그
- 튜토리얼 비디오
- 케이스 스터디
- 커뮤니티 포럼

---

## 11. 연락처 및 지원

**개발 팀**:
- 기획/개발: Claude AI + 개발자

**문의**:
- 이메일: support@capto.app
- GitHub Issues: https://github.com/capto/website/issues

**문서 업데이트**:
- 최종 수정일: 2026-03-22
- 버전: 1.0

---

## 부록: 데이터베이스 스키마

### Firestore 컬렉션 구조 (웹사이트 추가분)

#### users (사용자 정보)
```json
{
  "uid": "firebase_uid",
  "email": "user@example.com",
  "displayName": "사용자 이름",
  "photoURL": "https://...",
  "createdAt": "2026-03-22T10:00:00Z",
  "lastLoginAt": "2026-03-22T15:30:00Z",
  "preferences": {
    "newsletter": true,
    "notifications": true
  }
}
```

#### subscriptions (구독 정보)
```json
{
  "userId": "firebase_uid",
  "plan": "free | basic | pro",
  "status": "active | expired | suspended",
  "startDate": "2026-03-22T00:00:00Z",
  "endDate": "2027-03-22T23:59:59Z",
  "features": {
    "canCapture": true,
    "canUseAutoCapture": true,
    "maxCapturesPerDay": -1
  },
  "stripeCustomerId": "cus_xxx",
  "stripeSubscriptionId": "sub_xxx",
  "createdAt": "2026-03-22T10:00:00Z",
  "updatedAt": "2026-03-22T10:00:00Z"
}
```

#### usage (사용량 추적)
```json
{
  "userId": "firebase_uid",
  "monthly": {
    "2026-03": {
      "captureCount": 47,
      "lastCaptureAt": "2026-03-22T15:30:00Z"
    }
  }
}
```

#### downloads (다운로드 추적)
```json
{
  "version": "1.0.0",
  "platform": "macos",
  "downloadUrl": "https://storage.../Capto-1.0.0.dmg",
  "fileSize": 85053898,
  "sha256": "...",
  "releasedAt": "2026-03-22T00:00:00Z",
  "downloadCount": 1234
}
```

---

이 문서는 Capto 웹사이트의 완전한 기획서입니다. 개발 시 이 문서를 참고하여 일관된 디자인과 기능을 구현하세요.
