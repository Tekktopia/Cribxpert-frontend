import LegalHeader from "@/features/support/components/LegalHeader";
import Footer from "@/shared/components/layout/Footer";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <div>
        <div className=" w-full my-12 px-4">
          {/* Header Section */}
          <div className="mb-12">
            <LegalHeader 
              title="Cribxpert Terms & Conditions" 
              subtitle="Cribxpert is a property listing and booking platform owned and operated by Tekktopia Limited. By accessing, using, or booking through Cribxpert, you agree to the Terms & Conditions outlined below."
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
                "General Use",
                "Online Scams",
                "Payments",
                "Guest Payments",
                "Security Deposit",
                "Service Fee",
                "Host Responsibilities",
                "Guest Responsibilities",
                "Cancellations",
                "Support",
                "Liability",
                "Ownership",
                "Acceptance"
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
            {/* 1. General Use of the Platform */}
            <section id="section-1" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">General Use of the Platform</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cribxpert provides a digital marketplace where hosts can list properties and guests can book short‑stay accommodations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>All users must provide accurate information when creating or managing their accounts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cribxpert reserves the right to modify or update these Terms & Conditions at any time.</span>
                </li>
              </ul>
            </section>

            {/* 2. No Involvement in Online Scams */}
            <section id="section-2" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">No Involvement in Online Scams</h2>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
                <p className="text-red-700 text-sm font-medium">⚠️ Important Security Notice</p>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cribxpert, Tekktopia Limited, and all affiliated partners are not involved in or responsible for any form of online scam, fraudulent activity, or off‑platform negotiations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cribxpert will never request users to send money, gift cards, or private financial information outside the platform.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>If you encounter suspicious activity, please report it immediately using our support channel. Our team will respond within 24–48 hours.</span>
                </li>
              </ul>
            </section>

            {/* 3. Payments & Off‑Platform Transactions */}
            <section id="section-3" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Payments & Off‑Platform Transactions</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>All legitimate payments must be processed strictly through the Cribxpert payment gateway.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>If a host or guest chooses to complete payment outside the Cribxpert system—whether privately or secretly—Cribxpert will not be responsible or liable for:</span>
                  <ul className="ml-6 mt-2 space-y-1 text-gray-500">
                    <li className="flex items-start gap-2">- loss of funds</li>
                    <li className="flex items-start gap-2">- double charges</li>
                    <li className="flex items-start gap-2">- fraudulent behavior</li>
                    <li className="flex items-start gap-2">- booking issues or disputes</li>
                  </ul>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="font-medium text-red-600">Off‑platform payments void any Cribxpert protection for both host and guest.</span>
                </li>
              </ul>
            </section>

            {/* 4. How Guest Payments Are Held */}
            <section id="section-4" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">4</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">How Guest Payments Are Held</h2>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium">Secure Payment Holding</p>
                    <p className="text-blue-600 text-sm">Funds are securely held until after checkout confirmation</p>
                  </div>
                </div>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>When a guest pays for a booking on Cribxpert, the platform securely holds the funds from the date of payment until the end of the guest's stay.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>After checkout is confirmed and no issues are reported, Cribxpert will release the host's payout within 24–48 hours.</span>
                </li>
              </ul>
            </section>

            {/* 5. Security Deposit */}
            <section id="section-5" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">5</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Security Deposit</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>All properties may require a refundable security deposit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>This deposit is collected at the time of booking and held until after checkout.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The deposit covers damages, missing items, excessive cleaning, or penalties related to late cancellations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>If no issues are recorded by the host after inspection, the full deposit is refunded to the guest.</span>
                </li>
              </ul>
            </section>

            {/* 6. Service Fee (5%) */}
            <section id="section-6" className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl border border-primary/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">6</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Service Fee (5%)</h2>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold text-primary">5%</span>
                <span className="text-gray-600 ml-2">service fee on every successful booking</span>
              </div>
              <p className="text-gray-600 mb-3">This fee supports:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                {["Platform maintenance", "Customer support", "Fraud prevention", "Secure payment processing", "Continuous improvements to Cribxpert's technology"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-red-600 font-medium mt-2">⚠️ The service fee is non‑refundable.</p>
            </section>

            {/* 7. Host Responsibilities */}
            <section id="section-7" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">7</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Host Responsibilities</h2>
              </div>
              <p className="text-gray-600 mb-3 font-medium">Hosts agree to:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Provide accurate property information, pricing, and availability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Maintain a clean, safe, and functional property for guests.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Report any damages within the allowed timeframe after checkout.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Avoid soliciting or accepting off‑platform payments from guests.</span>
                </li>
              </ul>
            </section>

            {/* 8. Guest Responsibilities */}
            <section id="section-8" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">8</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Guest Responsibilities</h2>
              </div>
              <p className="text-gray-600 mb-3 font-medium">Guests agree to:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Respect the property rules set by the host.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Maintain the property in good condition during their stay.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Avoid causing disturbances, damages, or violating house rules.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pay all charges and deposits through the Cribxpert platform only.</span>
                </li>
              </ul>
            </section>

            {/* 9. Cancellations & Refunds */}
            <section id="section-9" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">9</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Cancellations & Refunds</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cancellation policies are determined by Cribxpert and displayed on the property listing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Refunds, when applicable, follow the stated cancellation policy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Late cancellations will result in the forfeiture of the entire security deposit.</span>
                </li>
              </ul>
            </section>

            {/* 10. Reporting Issues & Support Response */}
            <section id="section-10" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">10</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Reporting Issues & Support Response</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Guests or hosts experiencing issues, scams, fraud attempts, or conflicts can contact Cribxpert Support.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cribxpert will acknowledge and respond within 24–48 hours.</span>
                </li>
              </ul>
            </section>

            {/* 11. Limitation of Liability */}
            <section id="section-11" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">11</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Limitation of Liability</h2>
              </div>
              <p className="text-gray-600 mb-2">Cribxpert is not responsible for:</p>
              <ul className="space-y-2 text-gray-600 ml-6 mb-3">
                <li className="flex items-start gap-2">- off‑platform payments</li>
                <li className="flex items-start gap-2">- host–guest arrangements made outside Cribxpert</li>
                <li className="flex items-start gap-2">- damages caused by guests or property conditions created by hosts</li>
                <li className="flex items-start gap-2">- unavailable or inaccurate property information</li>
              </ul>
              <p className="text-gray-600">Cribxpert functions as a marketplace and does not own, manage, or operate listed properties.</p>
            </section>

            {/* 12. Platform Ownership */}
            <section id="section-12" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">12</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Platform Ownership</h2>
              </div>
              <p className="text-gray-600">
                Cribxpert is a software product, brand, and intellectual property of{' '}
                <a 
                  href="https://tekktopia.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Tekktopia Limited
                </a>
                . All rights reserved.
              </p>
            </section>

            {/* 13. Acceptance of Terms */}
            <section id="section-13" className="bg-primary/5 rounded-xl border border-primary/20 p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">13</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
            </div>
            <p className="text-gray-600 mb-6">
              By using the Cribxpert platform, you confirm that you have read, understood, and agreed to these Terms & Conditions.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                I Agree
              </button>
              <button className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
                Contact Support
              </button>
            </div>
          </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}