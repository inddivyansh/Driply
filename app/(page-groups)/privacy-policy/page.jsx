import React from 'react';
import PolicySection from '../../components/PolicySection';
import PageLayout from '../../components/PageLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Lovi',
  description: 'Science-backed AI-Cosmetologist you can trust',
};

// A simple table component for the privacy policy data
const PolicyTable = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function PrivacyPolicyPage() {
  const dataTable = {
    headers: ['Data Category', 'Collection Means', 'Purpose', 'Legal Basis'],
    rows: [
      [
        'Device information (hardware model, device type, unique identifiers, OS, IP address, etc.)',
        'Collected automatically',
        'To enable seamless Service use and address technical issues.',
        'Art. 6.1 (b) - performance of a contract. Art. 6.1 (f) - legitimate interest.',
      ],
      [
        'App usage data (features used, pages viewed, time spent, etc.)',
        'Collected automatically',
        'To see what features you interact with most and build analytics.',
        'Art. 6.1 (b) - performance of a contract. Art. 6.1 (f) - legitimate interest.',
      ],
      [
        'Your name and e-mail',
        'You provide it to us',
        'To manage your account and provide customer support.',
        'Art. 6.1 (b) - performance of a contract. Art. 6.1 (f) - legitimate interest.',
      ],
      [
        'Your e-mail (EU users)',
        'You provide it to us',
        'To send updates, special offers, and promotions.',
        'Art. 6.1 (a) - you give your consent',
      ],
      [
        'Your e-mail (non-EU users)',
        'You provide it to us',
        'To send updates, special offers, and promotions.',
        'Art. 6.1 (f) - we have a legitimate interest in marketing.',
      ],
      [
        'Your age, year of birth, and gender',
        'You provide it to us',
        'To adjust your skincare plan and ensure your experience is safe.',
        'Art. 6.1 (f) - we have a legitimate interest of keeping you safe.',
      ],
      [
        'Skin goals, issues, habits, behaviors, physical characteristics, including Face Data',
        'You provide it to us',
        'To customize your experience and tailor content.',
        'Art. 6.1 (a) - you give your consent',
      ],
      [
        'Photos of your cosmetic products',
        'You provide it to us',
        'To provide cosmetics scanner, for analytics (anonymized), and for AI fine-tuning (anonymized).',
        'Art. 6.1 (b) - performance of a contract. Art. 6.1 (f) - legitimate interest.',
      ],
    ],
  };

  return (
    <PageLayout title="Privacy Policy" lastUpdate="January 30, 2025">
      <div className="mb-6">
        <Link href="/privacy-policy/2025-01-30" className="text-[#151581] hover:underline">
          View previous privacy policy →
        </Link>
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 mb-12">
        <p>
          This Privacy Policy explains how Digital Skincare Inc. (further will be
          referred to as “we” or “us”) collects, stores, uses, and protects
          your Personal Data in connection with usage of our website lovi.care
          and our application Lovi (together referred to as “Lovi” or the
          “Services”). This policy also explains your personal data protection
          rights, and we are happy to help you exercise them. We value your
          privacy and do our best to ensure its security.
        </p>
      </div>

      <PolicySection title="What data do we collect and why" number={1}>
        <p>When you use our services, we may collect the following data:</p>
        <PolicyTable headers={dataTable.headers} rows={dataTable.rows} />
      </PolicySection>

      <PolicySection title="Face Data" number={2}>
        <p>
          We may collect photos or videos of your face (“Face Data”) to
          provide you with the face scanning feature. This data is processed
          on your device, and we do not store it on our servers. The scan
          results (e.g., skin condition metrics) are stored on our servers to
          track your progress.
        </p>
      </PolicySection>

      <PolicySection title="How we protect your data" number={3}>
        <p>
          We implement technical and organizational measures to protect your
          data. This includes encryption, access controls, and secure storage
          solutions.
        </p>
      </PolicySection>

      <PolicySection title="Your rights" number={4}>
        <p>
          You have the right to access, correct, delete, or restrict the
          processing of your personal data. You can also object to processing
          and have the right to data portability.
        </p>
      </PolicySection>

      <PolicySection title="Data retention" number={5}>
        <p>
          We retain your Personal Data for as long as your account is active
          or as needed to provide you with the Services. We may retain data
          longer if required for legal or regulatory reasons.
        </p>
      </PolicySection>

      <PolicySection title="Children’s privacy" number={6}>
        <p>
          We do not knowingly collect Personal Data from anyone under the age
          of 13 (or 16 for EU residents). If you are aware of such a case,
          please contact us at <a href="mailto:care@lovi.care">care@lovi.care</a>.
        </p>
      </PolicySection>

      <PolicySection title="Sharing of your Personal Data" number={7}>
        <p>
          We do not sell your data. We may share your data with third-party
          service providers who help us operate our Services, such as cloud
          hosting, analytics, and payment processing.
        </p>
        <ul>
          <li>Amplitude: For analytics.</li>
          <li>Google Crashlytics & Firebase: For performance monitoring.</li>
          <li>RevenueCat: For subscription management.</li>
          <li>Braintree: For payment processing.</li>
          <li>SendGrid: For email delivery.</li>
          {/* ... and so on */}
        </ul>
      </PolicySection>

      <PolicySection title="Cookie policy" number={8}>
        <p>
          We use cookies to operate and analyze our website. You can manage
          your cookie preferences through your browser settings.
        </p>
      </PolicySection>

      <PolicySection title="Changes to our privacy policy" number={9}>
        <p>
          We review our policies regularly. You can always find the
          up-to-date version on our website.
        </p>
      </PolicySection>

      <PolicySection title="Contact Us">
        <p>
          You can contact us using the following email:{' '}
          <a href="mailto:care@lovi.care" className="text-[#151581] hover:underline">care@lovi.care</a>
        </p>
        <p>
          You can also contact our DPO and EU representative:{' '}
          <a href="mailto:dpo@lovi.care" className="text-[#151581] hover:underline">dpo@lovi.care</a> (please
          indicate that you are a Lovi user).
        </p>
      </PolicySection>
    </PageLayout>
  );
}