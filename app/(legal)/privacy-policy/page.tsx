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
            help job seekers identify low-quality or misleading job postings while keeping
            personal data protected, minimal, and under user control.
          </p>

          {/* 1 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">1. Overview</h2>
            <p>
              Real Jobs is a Chrome extension that runs entirely on your device (client-side). It is designed to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Filter and highlight low-quality or misleading job postings.</li>
              <li>Provide basic job-search analytics.</li>
            </ul>
            <p>
              All extension logic runs locally in your browser. <strong>No job data, usage data, or personal data from the extension is sent to or stored on our servers.</strong> Real Jobs does not scrape private data or automate applications on third-party platforms.
            </p>
          </div>

          {/* 2 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">2. Information We Collect</h2>
            <p>
              <strong>Extension:</strong> The Real Jobs extension does not send any of your data to our servers. All processing (filtering, analytics) happens on your device. We do not collect, store, or receive any job data, browsing data, or personal information from the extension.
            </p>
            <p>
              <strong>This website:</strong> If you visit this website, we may collect only what is typical for a static site: privacy-respecting analytics (e.g., anonymized page views) as described in the Cookies & Analytics section. We do not collect, store, or sell personal identifiers, LinkedIn or job board content, or sensitive data.
            </p>
          </div>

          {/* 3 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">3. How Your Data Is Used</h2>
            <p>
              Because the extension does not send data to our servers, we do not use any of your extension data. Any website analytics we use are limited to understanding aggregate usage of this site (e.g., page views) and are not used for advertising, profiling, or resale to third parties.
            </p>
          </div>

          {/* 4 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">4. Data Retention and Storage</h2>
            <p>
              We do not store any data from the extension on our servers. Any data the extension uses (e.g., job listings you view) exists only in your browser and is not transmitted to us. For this website, we may retain only minimal, anonymized analytics data as needed for site operation; we do not maintain user accounts or store personal data on our systems.
            </p>
          </div>

          {/* 5 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">5. Security</h2>
            <p>
              The extension runs entirely on your device, so your job and browsing data never leaves your machine to reach our servers. This website is served over <strong>HTTPS/TLS</strong>. We do not operate backend services that receive or store your personal data.
            </p>
          </div>

          {/* 6 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">6. Cookies & Analytics</h2>
            <p>
              Our website may use privacy-respecting analytics tools (e.g., Plausible or Fathom)
              to understand usage trends without tracking individuals. We do not use advertising
              or tracking cookies.
            </p>
          </div>

          {/* 7 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">7. Your Rights</h2>
            <p>
              Because we do not collect or store your personal data from the extension, there is no account or stored data to access or delete for extension use. For any privacy-related requests regarding this website, contact us through the extension or this website.
            </p>
          </div>

          {/* 8 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">8. Updates to This Policy</h2>
            <p>
              This Privacy Policy may be updated as the service evolves.
              Any significant changes will be posted on this page.
            </p>
          </div>

          {/* 9 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">9. Contact</h2>
            <p>For any privacy-related questions, contact us through the extension or this website.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 right-0 left-0 mx-auto w-full flex items-center justify-center px-4">
        <div className="flex flex-col items-start justify-center max-w-xl w-full gap-2">
          <span className="w-full h-px bg-gray-100"></span>
          <p className="text-xs py-2 text-gray-500 font-medium">
            © {new Date().getFullYear()} <Link className="underline" href="/">Real Jobs</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
