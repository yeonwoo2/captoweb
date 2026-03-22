'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold text-white mb-4">이용약관</h1>
        <p className="text-text-secondary mb-8">시행일: 2026년 3월 22일</p>

        <div className="prose prose-invert max-w-none">
          {/* 제1조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제1조 (목적)</h2>
            <p className="text-text-secondary leading-relaxed">
              본 약관은 Capto(이하 "회사")가 제공하는 iOS 및 Android 기기의 화면 캡처 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          {/* 제2조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제2조 (정의)</h2>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>"서비스"란 회사가 제공하는 macOS용 화면 캡처 애플리케이션 및 웹 대시보드를 의미합니다.</li>
              <li>"회원"이란 본 약관에 동의하고 회사와 이용계약을 체결한 자를 의미합니다.</li>
              <li>"아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 설정하고 회사가 승인한 이메일 주소를 의미합니다.</li>
            </ul>
          </section>

          {/* 제3조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제3조 (약관의 효력 및 변경)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              1. 본 약관은 서비스를 이용하고자 하는 모든 회원에게 그 효력이 발생합니다.
            </p>
            <p className="text-text-secondary leading-relaxed">
              2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경된 약관은 시행일 7일 전부터 공지합니다.
            </p>
          </section>

          {/* 제4조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제4조 (회원가입)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의함으로써 회원가입을 신청합니다.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              2. 회원가입은 만 14세 이상만 가능합니다.
            </p>
            <p className="text-text-secondary leading-relaxed">
              3. 회사는 다음 각 호에 해당하는 신청에 대하여는 승인을 거부할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-2">
              <li>타인의 명의를 이용한 경우</li>
              <li>허위 정보를 기재한 경우</li>
              <li>사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우</li>
            </ul>
          </section>

          {/* 제5조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제5조 (구독 및 결제)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              1. 서비스는 다음과 같은 플랜을 제공합니다:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
              <li>Free 플랜: 월 100회 캡처 무료</li>
              <li>Basic 플랜: 월 ₩9,900 (500회 캡처)</li>
              <li>Pro 플랜: 월 ₩29,900 (무제한 캡처)</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mb-4">
              2. 유료 플랜은 월 단위로 자동 갱신되며, 회원은 언제든지 구독을 취소할 수 있습니다.
            </p>
            <p className="text-text-secondary leading-relaxed">
              3. 모든 플랜은 7일 무료 체험이 제공됩니다.
            </p>
          </section>

          {/* 제6조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제6조 (환불 정책)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              1. 유료 플랜 구독 후 7일 이내에 환불을 요청할 수 있습니다.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              2. 환불은 사용량이 10회 미만인 경우에 한하여 가능합니다.
            </p>
            <p className="text-text-secondary leading-relaxed">
              3. 환불 요청은 support@capto.app로 문의하시기 바랍니다.
            </p>
          </section>

          {/* 제7조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제7조 (서비스 이용 제한)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              회원은 다음 각 호에 해당하는 행위를 해서는 안 됩니다:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>타인의 기기를 무단으로 캡처하는 행위</li>
              <li>불법 콘텐츠 제작을 위한 서비스 사용</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
              <li>회사 또는 제3자의 지식재산권을 침해하는 행위</li>
              <li>타인의 개인정보를 무단으로 수집하는 행위</li>
            </ul>
          </section>

          {/* 제8조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제8조 (지식재산권)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              1. 서비스에 대한 저작권 및 지식재산권은 회사에 귀속됩니다.
            </p>
            <p className="text-text-secondary leading-relaxed">
              2. 회원이 서비스를 이용하여 캡처한 이미지에 대한 권리는 회원에게 귀속됩니다.
            </p>
          </section>

          {/* 제9조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제9조 (서비스의 중단)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              1. 회사는 다음 각 호에 해당하는 경우 서비스 제공을 중단할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
              <li>서비스용 설비의 보수 등 공사로 인한 부득이한 경우</li>
              <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
              <li>국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 서비스 이용에 지장이 있는 때</li>
            </ul>
            <p className="text-text-secondary leading-relaxed">
              2. 회사는 서비스 중단 시 사전에 공지하며, 부득이한 경우 사후에 공지할 수 있습니다.
            </p>
          </section>

          {/* 제10조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제10조 (면책조항)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              1. 회사는 천재지변, 전쟁 및 기타 불가항력적 사유로 서비스를 제공할 수 없는 경우에는 책임이 면제됩니다.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              2. 회사는 회원의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.
            </p>
            <p className="text-text-secondary leading-relaxed">
              3. 회사는 회원이 서비스를 이용하여 얻은 자료로 인한 손해에 대하여 책임을 지지 않습니다.
            </p>
          </section>

          {/* 제11조 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">제11조 (분쟁 해결)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              1. 회사와 회원 간 발생한 분쟁에 관한 소송은 대한민국 법률을 적용합니다.
            </p>
            <p className="text-text-secondary leading-relaxed">
              2. 회사와 회원 간 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제기합니다.
            </p>
          </section>

          {/* 부칙 */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">부칙</h2>
            <p className="text-text-secondary leading-relaxed">
              본 약관은 2026년 3월 22일부터 시행됩니다.
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
            <Link href="/privacy" className="hover:text-primary transition-colors">
              개인정보처리방침
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
