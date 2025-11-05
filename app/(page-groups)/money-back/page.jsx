import React from 'react';
import PageLayout from '../../components/PageLayout';

export const metadata = {
  title: 'Money-Back Policy — Lovi',
  description: 'Science-backed AI-Cosmetologist you can trust',
};

export default function MoneyBackPage() {
  return (
    <PageLayout title="Money-Back Policy" lastUpdate="August 15, 2024">

      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          We value our users&apos; satisfaction and offer a money-back guarantee for
          our subscription services under the following conditions:
        </p>
        <ol>
          <li>
            <p>
              <strong className="font-medium text-gray-900">Eligibility for a Refund:</strong> To be eligible for a refund, you
              must submit a request within 30 days of your initial purchase.
            </p>
          </li>
          <li>
            <p>
              <strong className="font-medium text-gray-900">Non-Refundable Circumstances:</strong> Refunds will not be granted
              for renewal periods of any subscription. You are responsible for
              managing your subscription and canceling it before the renewal
              date if you do not wish to continue.
            </p>
          </li>
          <li>
            <p>
              <strong className="font-medium text-gray-900">How to Request a Refund:</strong> To request a refund, please contact
              our support team at{' '}
              <a href="mailto:care@lovi.care">care@lovi.care</a> with your
              purchase details and the reason for your request.
            </p>
          </li>
          <li>
            <p>
              <strong className="font-medium text-gray-900">Processing:</strong> Once your request is received and approved, your
              refund will be processed, and a credit will automatically be
              applied to your original method of payment within 7-10 business
              days.
            </p>
          </li>
        </ol>
        <p>
          Please note that deleting the app will not automatically cancel your
          subscription. You must cancel your account via the app settings or by
          contacting us.
        </p>
      </div>
    </PageLayout>
  );
}