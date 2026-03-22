# captoweb - 자동 스크린 캡쳐 앱

captoweb은 핸드폰과 PC를 USB로 연결했을 때 모바일 앱 탐색을 자동으로 캡쳐해주는 도구입니다. iOS와 Android 모두 지원합니다.

## 🌟 주요 기능

- **현재화면 캡쳐** - 핸드폰 화면의 특정 부분을 원클릭으로 캡쳐
- **자동 캡쳐** - 앱 탐색 중 모든 화면을 자동으로 캡쳐
- **빠른 동기화** - USB 연결로 즉시 PC에 저장
- **iOS & Android 지원** - 양쪽 플랫폼 모두 호환

## 📦 기술 스택

### Frontend
- React 18+
- Vite
- React Router v6
- Tailwind CSS 4

### Backend
- Firebase Authentication
- Firestore Database

### 기타
- Pretendard 폰트 (한글 최적화)
- Iconify Solar Icons

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+
- npm 또는 yarn
- Firebase 프로젝트

### 설치

```bash
# 1. 저장소 클론
git clone <repository-url>
cd captoweb

# 2. 의존성 설치
npm install

# 3. Firebase 설정
# .env.local 파일을 생성하고 Firebase 설정값을 추가합니다
cp .env.example .env.local
# .env.local에서 VITE_FIREBASE_* 값을 실제 Firebase 설정값으로 변경
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 http://localhost:5173에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # 네비게이션 바
│   │   ├── Footer.jsx         # 푸터
│   │   └── ProtectedRoute.jsx # 보호된 라우트
│   ├── landing/
│   │   ├── HeroSection.jsx    # 히어로 섹션
│   │   ├── FeaturesSection.jsx # 기능 섹션
│   │   ├── PricingSection.jsx # 가격 섹션
│   │   └── DownloadSection.jsx # 다운로드 섹션
│   ├── auth/
│   │   ├── LoginForm.jsx      # 로그인 폼
│   │   ├── SignupForm.jsx     # 회원가입 폼
│   │   └── SocialLogin.jsx    # 소셜 로그인
│   └── subscription/
│       ├── PlanCard.jsx       # 플랜 카드
│       ├── PaymentModal.jsx   # 결제 모달
│       └── SubscriptionStatus.jsx # 구독 상태
├── pages/
│   ├── Landing.jsx       # 랜딩 페이지
│   ├── Login.jsx         # 로그인 페이지
│   ├── Signup.jsx        # 회원가입 페이지
│   ├── Dashboard.jsx     # 대시보드
│   ├── Subscription.jsx  # 구독 관리
│   └── Profile.jsx       # 프로필 관리
├── contexts/
│   └── AuthContext.jsx   # 인증 상태 관리
├── hooks/
│   └── useAuth.js        # 인증 훅
├── config/
│   └── firebase.js       # Firebase 설정
├── App.jsx               # 루트 컴포넌트
└── index.css             # 글로벌 스타일
```

## 🔐 인증 및 보안

### Firebase Authentication
- 이메일/비밀번호 인증
- Google 로그인 (구현 가능)
- GitHub 로그인 (구현 가능)

### Protected Routes
비로그인 사용자는 다음 페이지에 접근할 수 없습니다:
- /dashboard
- /subscription
- /profile

## 💳 구독 모델

### 요금제

| 플랜 | 가격 | 일일 캡쳐 | 자동 캡쳐 | 기능 |
|------|------|---------|---------|------|
| Free | 무료 | 10 | ❌ | 기본 |
| Basic | ₩4,990/월 | 100 | ✅ | 고급 |
| Pro | ₩14,990/월 | 무제한 | ✅ | 모든 기능 |

**참고:** 현재 구독 시스템은 Mock 결제로 구현되어 있습니다. 실제 결제 연동은 Stripe 또는 토스페이먼츠를 통해 추가해야 합니다.

## 🎨 디자인 테마

전체 앱은 Discord 스타일 어두운 테마를 사용합니다.

### 색상 팔레트
- **배경**: `#0f1419` ~ `#1a1f2e`
- **메인**: `#5865f2` (Discord Blurple)
- **세컨더리**: `#7289da`
- **텍스트**: `#e0e6ed`
- **카드**: `rgba(30, 37, 55, 0.8)`

## 🔧 설정

### Firebase 설정

Firebase Console에서 다음을 설정해야 합니다:

1. **Authentication 활성화**
   - Email/Password 사용자 인증 활성화

2. **Firestore Database 생성**
   - 데이터 콜렉션: `users`
   - 문서 구조:
     ```json
     {
       "email": "user@example.com",
       "displayName": "User Name",
       "plan": "free|basic|pro",
       "subscriptionStartDate": "timestamp",
       "captureUsage": {
         "today": 0,
         "total": 0,
         "limit": 10
       },
       "createdAt": "timestamp"
     }
     ```

3. **Web 앱 등록**
   - Firebase 설정 값을 `.env.local`에 추가

### .env.local 설정

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🧪 테스트

### Demo 계정으로 로그인

```
이메일: demo@captoweb.app
비밀번호: demo123456
```

이 계정을 사용하여 대시보드, 구독 관리, 프로필 기능을 테스트할 수 있습니다.

## 📝 주요 기능 상세

### Landing Page
- 앱 소개 및 주요 기능 설명
- 가격 비교
- 다운로드 링크 (Windows/macOS)

### Dashboard
- 사용자 환영 메시지
- 현재 플랜 및 사용량 표시
- 월별/일별 캡쳐 통계 (Mock 데이터)
- 앱 다운로드 CTA

### Subscription (구독 관리)
- 모든 플랜 비교
- 플랜 변경 (Mock 결제)
- 결제 모달 (실제 결제 없음)
- 구독 취소

### Profile (프로필 관리)
- 개인정보 수정
- 비밀번호 변경
- 계정 삭제

## 🚀 배포

### Vercel 배포 (권장)

```bash
npm install -g vercel
vercel
```

### 빌드 및 호스팅

```bash
npm run build
# dist 폴더를 웹 서버에 배포
```

## 📞 지원

문제가 발생하거나 기능을 요청하고 싶으시면 GitHub Issues를 통해 연락주세요.

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🎯 향후 계획

- [ ] 실제 결제 시스템 연동 (Stripe/토스)
- [ ] 소셜 로그인 (Google, GitHub)
- [ ] 캡쳐 이미지 자동 분류
- [ ] 팀 협업 기능
- [ ] 캡쳐 공유 링크
- [ ] 모바일 앱 연동 API
- [ ] 다국어 지원

## 💡 팁

### 개발 중 유용한 명령어

```bash
# 형식 확인 (ESLint 있는 경우)
npm run lint

# 타입 확인 (TypeScript 있는 경우)
npm run type-check

# 모든 테스트 실행
npm run test
```

### 성능 최적화

- Vite의 Code Splitting 활용
- React.lazy와 Suspense를 사용한 동적 import
- 이미지 최적화
- 번들 사이즈 모니터링

---

**마지막 업데이트**: 2024년 3월
