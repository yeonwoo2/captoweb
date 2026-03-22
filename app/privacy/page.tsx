'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
      <header className="bg-bg-medium border-b border-bg-light">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-[#4752c4] transition-colors">
            Capto
          </Link>
        </div>
      </header>

      {/* Content */}
      <motion.div
        className="max-w-4xl mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">개인정보처리방침</h1>
        <p className="text-text-secondary mb-8">시행일: 2026년 3월 22일</p>

        <div className="prose prose-invert max-w-none">
          {/* 1. 개인정보의 처리 목적 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">1. 개인정보의 처리 목적</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Capto(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증</li>
              <li>서비스 제공: 화면 캡처 서비스 제공, 캡처 기록 관리, 사용량 추적</li>
              <li>결제 처리: 유료 서비스 이용에 따른 요금 결제 및 정산</li>
              <li>고객 지원: 고객 문의 응대, 공지사항 전달, 불만처리 등</li>
            </ul>
          </section>

          {/* 2. 수집하는 개인정보 항목 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">2. 수집하는 개인정보 항목</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              회사는 다음의 개인정보 항목을 처리하고 있습니다:
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">필수 항목</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>이메일 주소</li>
              <li>비밀번호 (암호화하여 저장)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">선택 항목</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>프로필 사진</li>
              <li>표시 이름</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">자동 수집 항목</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>IP 주소</li>
              <li>기기 정보 (운영체제, 브라우저 종류)</li>
              <li>서비스 이용 기록 (캡처 횟수, 접속 시간)</li>
              <li>쿠키 및 세션 정보</li>
            </ul>
          </section>

          {/* 3. 개인정보의 처리 및 보유기간 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">3. 개인정보의 처리 및 보유기간</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>회원 정보: 회원 탈퇴 시까지 (단, 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지)</li>
              <li>결제 정보: 전자상거래법에 따라 5년간 보관</li>
              <li>서비스 이용 기록: 통신비밀보호법에 따라 3개월간 보관</li>
            </ul>
          </section>

          {/* 4. 개인정보의 제3자 제공 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우는 예외로 합니다:
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">서비스 제공을 위한 필수 제공</h3>
            <div className="bg-bg-medium rounded-lg p-4 mb-4">
              <p className="text-white font-semibold mb-2">Google (Firebase)</p>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>제공 목적: 회원 인증, 데이터베이스 관리, 파일 저장</li>
                <li>제공 항목: 이메일, 비밀번호(암호화), 서비스 이용 기록</li>
                <li>보유 기간: 회원 탈퇴 시까지</li>
              </ul>
            </div>

            <div className="bg-bg-medium rounded-lg p-4 mb-4">
              <p className="text-white font-semibold mb-2">Stripe (결제 대행)</p>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>제공 목적: 유료 서비스 결제 처리</li>
                <li>제공 항목: 이메일, 결제 정보</li>
                <li>보유 기간: 전자상거래법에 따라 5년</li>
              </ul>
            </div>

            <div className="bg-bg-medium rounded-lg p-4">
              <p className="text-white font-semibold mb-2">Google Analytics</p>
              <ul className="list-disc list-inside text-text-secondary space-y-1 ml-4">
                <li>제공 목적: 서비스 이용 통계 분석</li>
                <li>제공 항목: IP 주소, 기기 정보, 서비스 이용 기록</li>
                <li>보유 기간: Google Analytics 정책에 따름 (최대 26개월)</li>
              </ul>
            </div>
          </section>

          {/* 5. 개인정보 처리의 위탁 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">5. 개인정보 처리의 위탁</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              회사는 원활한 서비스 제공을 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>수탁업체: Google Cloud Platform (Firebase)</li>
              <li>위탁업무 내용: 클라우드 인프라 제공, 데이터베이스 관리</li>
            </ul>
          </section>

          {/* 6. 개인정보의 파기 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">6. 개인정보의 파기</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              파기 절차 및 방법은 다음과 같습니다:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>파기 절차: 회원 탈퇴 즉시 개인정보를 파기하며, 법령에 따라 보관이 필요한 정보는 별도 분리 보관</li>
              <li>파기 방법: 전자적 파일 형태의 정보는 복구 불가능한 방법으로 영구 삭제</li>
            </ul>
          </section>

          {/* 7. 정보주체의 권리·의무 및 행사방법 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">7. 정보주체의 권리·의무 및 행사방법</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              이용자는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4">
              권리 행사는 회사에 대해 서면, 전화, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.
            </p>
          </section>

          {/* 8. 개인정보의 안전성 확보조치 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">8. 개인정보의 안전성 확보조치</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
              <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 비밀번호 암호화 저장</li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ul>
          </section>

          {/* 9. 쿠키의 운영 및 거부 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">9. 쿠키의 운영 및 거부</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
            </p>
            <h3 className="text-xl font-semibold text-white mb-3 mt-6">쿠키 사용 목적</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
              <li>로그인 세션 유지</li>
              <li>서비스 이용 분석 및 개선</li>
              <li>맞춤형 서비스 제공</li>
            </ul>
            <p className="text-text-secondary leading-relaxed">
              이용자는 웹 브라우저의 설정을 통해 쿠키 허용, 쿠키 차단 등의 설정을 할 수 있습니다.
            </p>
          </section>

          {/* 10. 개인정보 보호책임자 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">10. 개인정보 보호책임자</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="bg-bg-medium rounded-lg p-6">
              <p className="text-white font-semibold mb-2">개인정보 보호책임자</p>
              <ul className="text-text-secondary space-y-1">
                <li>이메일: support@capto.app</li>
                <li>담당부서: 운영팀</li>
              </ul>
            </div>
          </section>

          {/* 11. 개인정보 처리방침 변경 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">11. 개인정보 처리방침 변경</h2>
            <p className="text-text-secondary leading-relaxed">
              이 개인정보 처리방침은 2026년 3월 22일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>

          {/* 부칙 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">부칙</h2>
            <p className="text-text-secondary leading-relaxed">
              본 방침은 2026년 3월 22일부터 시행됩니다.
            </p>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-bg-light">
          <div className="flex flex-wrap gap-4 justify-center text-text-secondary">
            <Link href="/" className="hover:text-primary transition-colors">
              홈으로
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              이용약관
            </Link>
            <span>•</span>
            <a href="mailto:support@capto.app" className="hover:text-primary transition-colors">
              문의하기
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
