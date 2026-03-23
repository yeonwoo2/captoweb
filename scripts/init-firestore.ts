/**
 * Firestore 초기 데이터 설정 스크립트
 *
 * 실행 방법:
 * npx ts-node scripts/init-firestore.ts
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin 초기화
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

async function initSubscriptionPlans() {
  console.log('📦 Firestore 초기 데이터 설정 시작...\n');

  // Free 플랜
  await db.collection('subscriptions').doc('free').set({
    name: 'Free',
    price: 0,
    currency: 'KRW',
    features: {
      can_capture: true,
      can_use_auto_capture: false,
      max_captures_per_month: 100,
    },
    created_at: new Date(),
    updated_at: new Date(),
  });
  console.log('✅ Free 플랜 생성 완료');

  // Basic 플랜
  await db.collection('subscriptions').doc('basic').set({
    name: 'Basic',
    price: 9900,
    currency: 'KRW',
    features: {
      can_capture: true,
      can_use_auto_capture: true,
      max_captures_per_month: 500,
    },
    created_at: new Date(),
    updated_at: new Date(),
  });
  console.log('✅ Basic 플랜 생성 완료');

  // Pro 플랜
  await db.collection('subscriptions').doc('pro').set({
    name: 'Pro',
    price: 29900,
    currency: 'KRW',
    features: {
      can_capture: true,
      can_use_auto_capture: true,
      max_captures_per_month: -1, // -1 = 무제한
    },
    created_at: new Date(),
    updated_at: new Date(),
  });
  console.log('✅ Pro 플랜 생성 완료');

  console.log('\n🎉 Firestore 초기 데이터 설정 완료!');
  console.log('\n생성된 문서:');
  console.log('- subscriptions/free');
  console.log('- subscriptions/basic');
  console.log('- subscriptions/pro');
}

// 스크립트 실행
initSubscriptionPlans()
  .then(() => {
    console.log('\n✨ 모든 작업이 완료되었습니다.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ 오류 발생:', error);
    process.exit(1);
  });
