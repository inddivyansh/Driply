import React from 'react';
import PolicySection from '../../components/PolicySection';
import PageLayout from '../../components/PageLayout';

export const metadata = {
  title: 'Terms of Use — Lovi',
  description: 'Science-backed AI-Cosmetologist you can trust',
};

export default function TermsPage() {
  return (
    <PageLayout title="Terms of Use" lastUpdate="February 13, 2022">

      <PolicySection title="Acceptance of Terms" number={1}>
        <p>
          By downloading, accessing, or using the Lovi mobile application
          ("Application") or our website ("Website"), you agree to be bound by
          these Terms of Use ("Agreement"). If you do not agree to these
          terms, do not use the Services.
        </p>
      </PolicySection>

      <PolicySection title="Medical Disclaimer" number={2}>
        <p>
          Lovi is not a medical device. The Services are for informational and
          educational purposes only and are not intended to be a substitute
          for professional medical advice, diagnosis, or treatment. Always
          seek the advice of your physician or other qualified health provider
          with any questions you may have regarding a medical condition.
        </p>
      </PolicySection>

      <PolicySection title="Subscriptions & Fees" number={3}>
        <p>
          We offer subscriptions that grant you access to premium features.
          Payment will be charged to your payment method at confirmation of
          purchase. Subscriptions automatically renew unless canceled at least
          24 hours before the end of the current period. You can manage your
          subscription and turn off auto-renewal in your account settings.
        </p>
      </PolicySection>

      <PolicySection title="Restrictions on use" number={4}>
        <p>
          You agree not to: (a) reverse engineer the Application; (b) copy,
          modify, or create derivative works of the Application; (c) use the
          Application to engage in any illegal conduct; (d) upload any
          material that contains viruses or harmful code.
        </p>
      </PolicySection>

      <PolicySection title="Warranty Disclaimer" number={11}>
        <p>
          The Application is provided “AS IS” and “AS AVAILABLE” without any
          warranties of any kind, express or implied. We do not warrant that
          the services will be uninterrupted, secure, or error-free.
        </p>
      </PolicySection>

      <PolicySection title="Limitation of Liability" number={12}>
        <p>
          In no event shall the Company be liable for any indirect,
          incidental, or consequential damages arising out of or in connection
          with the use of this app. Our total liability will not exceed the
          amounts you have paid to the Company or $100, whichever is greater.
        </p>
      </PolicySection>

      <PolicySection title="Governing Law" number={19}>
        <p>
          This Agreement shall be governed by the laws of the State of
          Delaware, United States, without regard to its conflict of law
          provisions.
        </p>
      </PolicySection>

      <PolicySection title="Questions and comments">
        <p>
          If you have any comments or questions, please feel free to contact
          us at <a href="mailto:care@lovi.care" className="text-[#151581] hover:underline">care@lovi.care</a>.
        </p>
      </PolicySection>
    </PageLayout>
  );
}