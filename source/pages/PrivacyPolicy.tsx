import LegalHeader from "@/features/support/components/LegalHeader";
import Footer from "@/shared/components/layout/Footer";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <div>
        <div className=" w-full my-12 px-4">
          {/* Header Section */}
          <div className="mb-12">
            <LegalHeader 
              title="Cribxpert Privacy Policy" 
              subtitle="Cribxpert is a short‑stay property booking platform owned and operated by Tekktopia Limited. This Privacy Policy explains how we collect, use, protect, and share your personal information when you access or use the Cribxpert platform. By using Cribxpert, you agree to the practices described in this Privacy Policy."
            />
            <div className="flex items-center gap-3 mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Last Updated: March 2026
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Version 2.0
              </span>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "Information We Collect",
                "How We Use Your Info",
                "Payments",
                "Security Deposit",
                "Data Protection",
                "Sharing Info",
                "Fraud & Scams",
                "Your Rights",
                "Cookies",
                "Children's Privacy",
                "Data Retention",
                "Ownership",
                "Policy Changes",
                "Contact Us"
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#section-${index + 1}`}
                  className="text-sm text-gray-600 hover:text-primary hover:underline transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* 1. Information We Collect */}
            <section id="section-1" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">a. Personal Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Full name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Email address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Phone number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Payment details (processed securely by our payment partners)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Identity information required for verification</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">b. Platform Usage Data</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Pages viewed, buttons clicked, and actions taken on the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Property details entered by hosts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Booking details (dates, prices, duration, security deposit)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. How We Use Your Information */}
            <section id="section-2" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Facilitate bookings between hosts and guests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Process payments securely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Hold guest payments during their stay and release them to hosts afterward</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Communicate booking updates, confirmations, and support messages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Improve platform functionality, security, and user experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Detect, investigate, and prevent fraud, scams, and unauthorized activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Comply with legal and regulatory requirements</span>
                </li>
              </ul>
            </section>

            {/* 3. Payments and Financial Information */}
            <section id="section-3" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Payments and Financial Information</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>All payments on Cribxpert are processed through secure third‑party payment gateways.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cribxpert does not store full card details—only tokens or references provided by our payment partners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>If a guest pays on the Cribxpert platform, we hold the funds from the date of payment until the end of the stay.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Hosts receive their payout within 24–48 hours after the guest checks out, provided no disputes or issues arise.</span>
                </li>
              </ul>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mt-4">
                <p className="text-red-700 text-sm font-medium">⚠️ Important:</p>
                <p className="text-red-600 text-sm mt-1">Cribxpert will not be responsible for any payments made outside the platform, including private or secret transactions between hosts and guests.</p>
              </div>
            </section>

            {/* 4. Security Deposit Handling */}
            <section id="section-4" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">4</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Security Deposit Handling</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Security deposits collected on Cribxpert are held securely until after checkout.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The deposit may be applied to damages, missing items, or late cancellation penalties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>If no issues are reported by the host, the deposit is refunded in full.</span>
                </li>
              </ul>
              <p className="text-gray-600 font-medium mt-3">Cribxpert does not allow off‑platform deposit handling.</p>
            </section>

            {/* 5. How We Protect Your Information */}
            <section id="section-5" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">5</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">How We Protect Your Information</h2>
              </div>
              <p className="text-gray-600 mb-3">We use industry‑standard security measures to protect your data, including:</p>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Encrypted payment processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Secure servers and firewalls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Restricted access to sensitive information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Regular platform monitoring to detect unauthorized activity</span>
                </li>
              </ul>
              <p className="text-gray-500 text-sm mt-3">While we take strong measures, no online service can guarantee 100% security.</p>
            </section>

            {/* 6. Sharing of Information */}
            <section id="section-6" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">6</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Sharing of Information</h2>
              </div>
              <p className="text-gray-600 mb-3">We may share your information with:</p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">a. Hosts/Guests</h3>
                  <p className="text-gray-600">Limited booking‑related information is shared strictly for the purpose of completing reservations.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">b. Third‑Party Service Providers</h3>
                  <p className="text-gray-600 mb-2">We work with trusted partners to provide:</p>
                  <ul className="space-y-1 text-gray-600 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Payment processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Identity verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Customer support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Platform analytics</span>
                    </li>
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
            <section id="section-7" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">7</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Fraud, Scams & Security Alerts</h2>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                <p className="text-red-700 text-sm font-medium">⚠️ Important Security Notice</p>
              </div>
              <p className="text-gray-600 mb-3">Cribxpert does not support or participate in any off‑platform transactions or communications intended to scam or deceive users.</p>
              <p className="text-gray-600 mb-2">If you encounter suspicious activity:</p>
              <ul className="space-y-2 text-gray-600 ml-4 mb-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Report it immediately via Cribxpert support.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Our team will respond within 24–48 hours.</span>
                </li>
              </ul>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <p className="text-red-700 font-medium">⚠️ Any payments made outside Cribxpert are not protected.</p>
              </div>
            </section>

            {/* 8. Your Rights */}
            <section id="section-8" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">8</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Your Rights</h2>
              </div>
              <p className="text-gray-600 mb-3">Depending on your location and applicable laws, you may have the right to:</p>
              <ul className="space-y-2 text-gray-600 ml-4 mb-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Access the personal data we hold about you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Request corrections to your information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Request deletion of your profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Opt out of non‑essential communications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Withdraw consent where applicable</span>
                </li>
              </ul>
              <p className="text-gray-600">Requests can be made through our support channel.</p>
            </section>

            {/* 9. Cookies & Tracking Technologies */}
            <section id="section-9" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">9</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Cookies & Tracking Technologies</h2>
              </div>
              <p className="text-gray-600 mb-3">Cribxpert uses cookies to:</p>
              <ul className="space-y-2 text-gray-600 ml-4 mb-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Improve your browsing experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Remember your login session</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Analyze platform performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Provide personalized content</span>
                </li>
              </ul>
              <p className="text-gray-600">You can manage or disable cookies in your browser settings.</p>
            </section>

            {/* 10. Children's Privacy */}
            <section id="section-10" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">10</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Children's Privacy</h2>
              </div>
              <p className="text-gray-600">Cribxpert is not intended for persons under 18 years old. We do not knowingly collect data from minors.</p>
            </section>

            {/* 11. Data Retention */}
            <section id="section-11" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">11</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Data Retention</h2>
              </div>
              <p className="text-gray-600 mb-3">We retain your information only as long as necessary to:</p>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Provide platform services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Fulfill legal obligations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Resolve disputes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Enforce our Terms & Conditions</span>
                </li>
              </ul>
            </section>

            {/* 12. Ownership */}
            <section id="section-12" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">12</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Ownership</h2>
              </div>
              <p className="text-gray-600">
                Cribxpert is a fully owned software product of{' '}
                <a 
                  href="https://tekktopia.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Tekktopia Limited
                </a>
                . All data collected is processed under Tekktopia Limited's governance and policies.
              </p>
            </section>

            {/* 13. Changes to This Privacy Policy */}
            <section id="section-13" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">13</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Changes to This Privacy Policy</h2>
              </div>
              <p className="text-gray-600">We may update this Privacy Policy periodically. Continued use of Cribxpert after updates indicates acceptance of the new terms.</p>
            </section>

            {/* 14. Contact Us */}
            <section id="section-14" className="bg-primary/5 rounded-xl border border-primary/20 p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">14</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-gray-600 mb-4">
              For questions or concerns about this Privacy Policy, or to report suspicious behavior, contact <Link to="/support" className="text-primary hover:underline font-medium" >Cribxpert Support </Link> .
            </p>
            <p className="text-primary font-medium">Our team will respond within 24–48 hours.</p>
          </section>              
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}