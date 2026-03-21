import LegalHeader from "@/features/support/components/LegalHeader";
import Footer from "@/shared/components/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LegalHeader 
        title="Cribxpert Privacy Policy" 
        subtitle="Cribxpert is a short‑stay property booking platform owned and operated by Tekktopia Limited. This Privacy Policy explains how we collect, use, protect, and share your personal information when you access or use the Cribxpert platform. By using Cribxpert, you agree to the practices described in this Privacy Policy."
        lastUpdated="March 2026"
      />
      
      <div className="flex-1 flex justify-center">
        <div className=" w-full px-4 py-12">
          {/* 1. Information We Collect */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">1</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            <div className="space-y-4 ml-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">a. Personal Information</h3>
                <ul className="space-y-1 text-gray-600 list-disc pl-5">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Payment details (processed securely by our payment partners)</li>
                  <li>Identity information required for verification</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">b. Platform Usage Data</h3>
                <ul className="space-y-1 text-gray-600 list-disc pl-5">
                  <li>Pages viewed, buttons clicked, and actions taken on the platform</li>
                  <li>Property details entered by hosts</li>
                  <li>Booking details (dates, prices, duration, security deposit)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">2</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
            </div>
            <ul className="space-y-2 text-gray-600 list-disc pl-5 ml-4">
              <li>Facilitate bookings between hosts and guests</li>
              <li>Process payments securely</li>
              <li>Hold guest payments during their stay and release them to hosts afterward</li>
              <li>Communicate booking updates, confirmations, and support messages</li>
              <li>Improve platform functionality, security, and user experience</li>
              <li>Detect, investigate, and prevent fraud, scams, and unauthorized activities</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          {/* 3. Payments and Financial Information */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">3</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Payments and Financial Information</h2>
            </div>
            <ul className="space-y-2 text-gray-600 list-disc pl-5 ml-4 mb-4">
              <li>All payments on Cribxpert are processed through secure third‑party payment gateways.</li>
              <li>Cribxpert does not store full card details—only tokens or references provided by our payment partners.</li>
              <li>If a guest pays on the Cribxpert platform, we hold the funds from the date of payment until the end of the stay.</li>
              <li>Hosts receive their payout within 24–48 hours after the guest checks out, provided no disputes or issues arise.</li>
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 ml-4">
              <p className="text-red-700 font-medium">⚠️ Important:</p>
              <p className="text-red-600 text-sm mt-1">Cribxpert will not be responsible for any payments made outside the platform, including private or secret transactions between hosts and guests.</p>
            </div>
          </section>

          {/* 4. Security Deposit Handling */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">4</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Security Deposit Handling</h2>
            </div>
            <ul className="space-y-2 text-gray-600 list-disc pl-5 ml-4 mb-3">
              <li>Security deposits collected on Cribxpert are held securely until after checkout.</li>
              <li>The deposit may be applied to damages, missing items, or late cancellation penalties.</li>
              <li>If no issues are reported by the host, the deposit is refunded in full.</li>
            </ul>
            <p className="text-gray-600 font-medium ml-4">Cribxpert does not allow off‑platform deposit handling.</p>
          </section>

          {/* 5. How We Protect Your Information */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">5</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">How We Protect Your Information</h2>
            </div>
            <p className="text-gray-600 mb-3 ml-4">We use industry‑standard security measures to protect your data, including:</p>
            <ul className="space-y-1 text-gray-600 list-disc pl-5 ml-8">
              <li>Encrypted payment processing</li>
              <li>Secure servers and firewalls</li>
              <li>Restricted access to sensitive information</li>
              <li>Regular platform monitoring to detect unauthorized activity</li>
            </ul>
            <p className="text-gray-500 text-sm mt-3 ml-4">While we take strong measures, no online service can guarantee 100% security.</p>
          </section>

          {/* 6. Sharing of Information */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">6</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Sharing of Information</h2>
            </div>
            <p className="text-gray-600 mb-3 ml-4">We may share your information with:</p>
            <div className="space-y-4 ml-8">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">a. Hosts/Guests</h3>
                <p className="text-gray-600">Limited booking‑related information is shared strictly for the purpose of completing reservations.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">b. Third‑Party Service Providers</h3>
                <p className="text-gray-600 mb-2">We work with trusted partners to provide:</p>
                <ul className="space-y-1 text-gray-600 list-disc pl-5">
                  <li>Payment processing</li>
                  <li>Identity verification</li>
                  <li>Customer support</li>
                  <li>Platform analytics</li>
                </ul>
                <p className="text-gray-600 mt-2">All partners are required to protect your data.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">c. Legal Requirements</h3>
                <p className="text-gray-600">We may disclose data when required by law, regulation, or to respond to legal claims.</p>
              </div>
            </div>
          </section>

          {/* 7. Fraud, Scams & Security Alerts */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">7</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Fraud, Scams & Security Alerts</h2>
            </div>
            <p className="text-gray-600 mb-3 ml-4">Cribxpert does not support or participate in any off‑platform transactions or communications intended to scam or deceive users.</p>
            <p className="text-gray-600 mb-2 ml-4">If you encounter suspicious activity:</p>
            <ul className="space-y-1 text-gray-600 list-disc pl-5 ml-8 mb-3">
              <li>Report it immediately via Cribxpert support.</li>
              <li>Our team will respond within 24–48 hours.</li>
            </ul>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 ml-4">
              <p className="text-red-700 font-medium">⚠️ Any payments made outside Cribxpert are not protected.</p>
            </div>
          </section>

          {/* 8. Your Rights */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">8</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Your Rights</h2>
            </div>
            <p className="text-gray-600 mb-3 ml-4">Depending on your location and applicable laws, you may have the right to:</p>
            <ul className="space-y-1 text-gray-600 list-disc pl-5 ml-8 mb-3">
              <li>Access the personal data we hold about you</li>
              <li>Request corrections to your information</li>
              <li>Request deletion of your profile</li>
              <li>Opt out of non‑essential communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p className="text-gray-600 ml-4">Requests can be made through our support channel.</p>
          </section>

          {/* 9. Cookies & Tracking Technologies */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">9</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Cookies & Tracking Technologies</h2>
            </div>
            <p className="text-gray-600 mb-3 ml-4">Cribxpert uses cookies to:</p>
            <ul className="space-y-1 text-gray-600 list-disc pl-5 ml-8 mb-3">
              <li>Improve your browsing experience</li>
              <li>Remember your login session</li>
              <li>Analyze platform performance</li>
              <li>Provide personalized content</li>
            </ul>
            <p className="text-gray-600 ml-4">You can manage or disable cookies in your browser settings.</p>
          </section>

          {/* 10. Children's Privacy */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">10</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Children's Privacy</h2>
            </div>
            <p className="text-gray-600 ml-4">Cribxpert is not intended for persons under 18 years old. We do not knowingly collect data from minors.</p>
          </section>

          {/* 11. Data Retention */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">11</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Data Retention</h2>
            </div>
            <p className="text-gray-600 mb-3 ml-4">We retain your information only as long as necessary to:</p>
            <ul className="space-y-1 text-gray-600 list-disc pl-5 ml-8">
              <li>Provide platform services</li>
              <li>Fulfill legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce our Terms & Conditions</li>
            </ul>
          </section>

          {/* 12. Ownership */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">12</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Ownership</h2>
            </div>
            <p className="text-gray-600 ml-4">
              Cribxpert is a fully owned software product of{' '}
              <a 
                href="https://tekktopia.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Tekktopia Limited
              </a>
              . All data collected is processed under Tekktopia Limited's governance and policies.
            </p>
          </section>

          {/* 13. Changes to This Privacy Policy */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">13</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Changes to This Privacy Policy</h2>
            </div>
            <p className="text-gray-600 ml-4">We may update this Privacy Policy periodically. Continued use of Cribxpert after updates indicates acceptance of the new terms.</p>
          </section>

          {/* 14. Contact Us */}
          <section className="bg-primary/5 rounded-xl border border-primary/20 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              For questions or concerns about this Privacy Policy, or to report suspicious behavior, contact Cribxpert Support.
            </p>
            <p className="text-primary font-medium">Our team will respond within 24–48 hours.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}