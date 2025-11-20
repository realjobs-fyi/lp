import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Real Jobs Terms & Conditions",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen max-h-full h-full py-24 px-4">
      <Link href="/">
        <div className="absolute left-12 top-12 flex items-center justify-center gap-2 pr-3 pl-2 py-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 max-md:hidden">
          <ChevronLeft className="w-4 h-4" />
          <p className="text-sm font-medium">Home</p>
        </div>
      </Link>

      <div className="flex flex-col items-start justify-start gap-10 max-w-xl w-full">
        <h1 className="font-bold">Terms & Conditions</h1>
        <p className="text-gray-500 font-medium">Last updated: November 2025</p>

        <div className="w-full flex flex-col gap-6">
          <p>
            Welcome to <strong>Real Jobs</strong>. These Terms govern your use of
            our Chrome extension, website, and associated backend services
            (collectively, the “Service”). By installing or using Real Jobs, you
            agree to these Terms. If you do not agree, please discontinue use.
          </p>

          {/* 1 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">1. Service Description</h2>
            <p>
              Real Jobs is a browser extension that helps job seekers filter
              low-quality or misleading job postings and generate tailored PDF
              résumés using user-provided information and job descriptions.
              Real Jobs does <strong>not</strong> scrape private data, automate
              applications on third-party websites, or collect LinkedIn content
              on behalf of the user.
            </p>
            <p>
              Some features are free; others require an authenticated account
              and a paid subscription.
            </p>
          </div>

          {/* 2 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">2. Eligibility</h2>
            <p>
              To use Real Jobs, you must be at least 16 years old and capable of
              entering into a binding agreement. When using Real Jobs on behalf
              of a company or organization, you confirm you are authorized to
              accept these Terms on its behalf.
            </p>
          </div>

          {/* 3 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">3. Accounts & Subscriptions</h2>
            <p>
              Some features, such as résumé generation, require you to create an
              account using Google or GitHub authentication. Paid plans are
              billed through our payment provider. You authorize Real Jobs and
              the provider to charge your chosen payment method according to the
              plan you select.
            </p>
            <p>
              Subscription periods, renewals, cancellations, and refunds are
              managed directly through our payment provider. Free tiers may have
              monthly usage limits.
            </p>
          </div>

          {/* 4 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">4. Acceptable Use</h2>
            <p>You agree <strong>not</strong> to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                Use the extension or API in a way that violates any applicable
                laws or terms of third-party platforms.
              </li>
              <li>
                Attempt to bypass, disrupt, reverse engineer, or interfere with
                Real Jobs systems.
              </li>
              <li>
                Use Real Jobs to generate misleading or fraudulent résumés,
                profiles, or job applications.
              </li>
              <li>
                Share or expose API keys, tokens, or authentication credentials.
              </li>
            </ul>
            <p>
              We may suspend or terminate access to the Service if misuse is
              detected.
            </p>
          </div>

          {/* 5 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">5. User Data & Privacy</h2>
            <p>
              You retain ownership of all information you provide, including
              job data, résumé content, and personal details. Real Jobs only
              processes your data temporarily to generate results and does not
              sell, share, or repurpose it for training external models.
            </p>
            <p>
              By using the extension, you grant Real Jobs a temporary license to
              process your data strictly for the purpose of fulfilling your
              requests.
            </p>
          </div>

          {/* 6 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">6. Accuracy of Output</h2>
            <p>
              Résumé outputs and job-quality insights are generated
              programmatically and may not always be accurate. Real Jobs
              provides all output <strong>&quot;as is&quot;</strong> with no guarantees of
              completeness, correctness, or suitability for specific purposes.
            </p>
          </div>

          {/* 7 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                Real Jobs is not liable for indirect, incidental, special, or
                consequential damages.
              </li>
              <li>
                The total liability of Real Jobs, under any claim, shall not
                exceed <strong>USD $100</strong>.
              </li>
            </ul>
          </div>

          {/* 8 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">8. Third-Party Services</h2>
            <p>
              Real Jobs may interact with third-party platforms such as LinkedIn
              solely on the client side. We are not affiliated with or endorsed
              by any job board or employer. Your use of third-party websites is
              governed by their separate terms and conditions.
            </p>
          </div>

          {/* 9 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">9. Termination</h2>
            <p>
              You may stop using Real Jobs at any time. We may suspend or
              terminate your access if you violate these Terms or misuse the
              Service. Paid users may lose access to premium features when a
              subscription expires or is canceled.
            </p>
          </div>

          {/* 10 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of{" "}
              <strong>Ontario, Canada</strong>. Disputes arising under these
              Terms will be resolved exclusively in the courts of Ontario.
            </p>
          </div>

          {/* 11 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">11. Contact</h2>
            <p>For legal inquiries or requests, contact:</p>
            <p>
              <Link
                href="mailto:hello@realjobs.fyi"
                className="underline"
              >
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
