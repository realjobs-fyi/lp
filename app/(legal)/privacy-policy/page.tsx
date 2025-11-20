import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Real Jobs Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen max-h-full h-full py-24 px-4">
      <Link href="/">
        <div className="absolute left-12 top-12 flex items-center justify-center gap-2 pr-3 pl-2 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 max-md:hidden">
          <ChevronLeft className="w-4 h-4" />
          <p className="text-sm font-medium">Home</p>
        </div>
      </Link>

      <div className="flex flex-col items-start justify-start gap-10 max-w-xl w-full">
        <h1 className="font-bold">Privacy Policy</h1>
        <p className="text-gray-500 font-medium">
          Last updated: November 2025
        </p>

        <div className="w-full flex flex-col gap-6">
          <p>
            At <strong>Real Jobs</strong>, privacy is a core principle. Our mission is to
            help job seekers identify low-quality or misleading job postings and generate
            tailored résumés while keeping personal data protected, minimal, and under user control.
          </p>

          {/* 1 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">1. Overview</h2>
            <p>
              Real Jobs is a Chrome extension and associated backend service designed to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Filter and highlight low-quality or misleading job postings.</li>
              <li>Provide basic job-search analytics.</li>
              <li>Generate PDF résumés based on user-provided information and selected job descriptions.</li>
            </ul>
            <p>
              Real Jobs does <strong>not</strong> scrape private data, automate applications on third-party platforms, or store résumé documents after they are generated.
            </p>
          </div>

          {/* 2 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">2. Information We Collect</h2>
            <p>We collect only the minimum data required to operate the service:</p>

            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>Account data (if you sign in)</strong> – such as name, email, and profile photo from Google or GitHub OAuth.
              </li>
              <li>
                <strong>Résumé input data</strong> – information you voluntarily provide (experience, projects, skills, etc.) for résumé generation.
              </li>
              <li>
                <strong>Limited job information</strong> – basic job metadata (such as title and company name) provided by the extension for contextual résumé tailoring.
              </li>
              <li>
                <strong>Usage metadata</strong> – timestamps, feature usage, and generation counts for enforcing plan limits and improving reliability.
              </li>
            </ul>

            <p>
              We do <strong>not</strong> collect, store, or sell:
            </p>

            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Full LinkedIn profiles or scraped job board content</li>
              <li>Saved résumés or generated PDF files</li>
              <li>Sensitive personal identifiers such as government IDs or financial data</li>
            </ul>
          </div>

          {/* 3 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">3. How Your Data Is Used</h2>
            <p>Your data is used strictly to:</p>

            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Generate tailored, ATS-friendly résumés on your request</li>
              <li>Enforce free and paid plan usage limits</li>
              <li>Improve service reliability, performance, and user experience</li>
              <li>Communicate with you about account-related issues (if applicable)</li>
            </ul>

            <p>
              We never use your information for advertising, profiling, or resale to third parties.
            </p>
          </div>

          {/* 4 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">4. Data Retention and Storage</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                Résumé data is processed <strong>in real time</strong> and is <strong>not stored</strong>
                after the PDF is generated and returned to you.
              </li>
              <li>
                Temporary data may exist in memory during processing and is automatically discarded.
              </li>
              <li>
                Minimal usage logs (non-content, non-sensitive) may be retained for up to 30 days
                for debugging and billing accuracy.
              </li>
              <li>
                Account information remains stored while your account is active and may be deleted upon request.
              </li>
            </ul>
          </div>

          {/* 5 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">5. AI & Model Privacy</h2>
            <p>
              Real Jobs uses controlled AI processing solely to generate résumé content
              during your request. Your inputs and outputs are:
            </p>

            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Not stored for future reuse</li>
              <li>Not used to train third-party or internal AI models</li>
              <li>Not shared with advertisers or data brokers</li>
            </ul>

            <p>
              All processing happens only to fulfill your specific action and is then discarded.
            </p>
          </div>

          {/* 6 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">6. Security</h2>
            <p>
              All traffic between the Real Jobs extension, website, and backend is secured using
              <strong> HTTPS/TLS encryption</strong>. Access to infrastructure and internal systems
              is strictly limited and monitored.
            </p>
          </div>

          {/* 7 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">7. Cookies & Analytics</h2>
            <p>
              Our website may use privacy-respecting analytics tools (e.g., Plausible or Fathom)
              to understand usage trends without tracking individuals. We do not use advertising
              or tracking cookies.
            </p>
          </div>

          {/* 8 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">8. Your Rights</h2>
            <p>You may request at any time:</p>

            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Deletion of your account</li>
              <li>Access to the limited data associated with your account</li>
              <li>Removal from any communications list</li>
            </ul>

            <p>
              To exercise these rights, contact us at{" "}
              <Link href="mailto:hello@realjobs.fyi" className="underline">
                <strong>hello@realjobs.fyi</strong>
              </Link>
              .
            </p>
          </div>

          {/* 9 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">9. Updates to This Policy</h2>
            <p>
              This Privacy Policy may be updated as the service evolves.
              Any significant changes will be posted on this page and, if necessary,
              communicated through the extension or your account.
            </p>
          </div>

          {/* 10 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">10. Contact</h2>
            <p>For any privacy-related questions, contact:</p>
            <p>
              <Link href="mailto:hello@realjobs.fyi" className="underline">
                <strong>hello@realjobs.fyi</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-0 left-0 mx-auto w-full flex items-center justify-center px-4">
        <div className="flex flex-col items-start justify-center max-w-lg w-full gap-2">
          <span className="w-full h-px bg-gray-100"></span>
          <p className="text-xs py-2 text-gray-500 font-medium">
            © 2025 <Link className="underline" href="/">Real Jobs</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
