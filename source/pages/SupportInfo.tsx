import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import SupportHeader from '@/features/support/components/SupportHeader';
import Footer from '@/shared/components/layout/Footer';
import { ContactInfo } from '@/types';
import { socialIcons } from '@/assets';
import {
  PhoneArrowUpRightIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import { CheckCircle, XCircle, X, Copy, Check } from 'lucide-react';

const { facebook, instagram, x } = socialIcons;

const contactInfo: Array<ContactInfo> = [
  {
    icon: <PhoneArrowUpRightIcon className="h-5 w-5 md:h-6 md:w-6" />,
    title: '+2348105963769',
  },
  {
    icon: <EnvelopeIcon className="h-5 w-5 md:h-6 md:w-6" />,
    title: 'info@cribxpert.com',
  },
  {
    icon: <MapPinIcon className="h-5 w-5 md:h-6 md:w-6" />,
    title: 'Lagos, Nigeria',
  },
];

const subjects = [
  { id: 'booking', label: 'Booking Issues' },
  { id: 'technical', label: 'Technical Support' },
  { id: 'billing', label: 'Billing Issues' },
  { id: 'report', label: 'Report' },
  { id: 'others', label: 'Others' },
];

type ModalState = 'success' | 'error' | null;

// Generate ticket ID with sequential numbers
const generateTicketId = (subject: string) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');

  // Map subject to department code
  const departmentMap: Record<string, string> = {
    'Booking Issues': 'BK',
    'Technical Support': 'TC',
    'Payment Issues': 'PY',
    'Billing Issues': 'BL',
    'Report': 'RP',
    'Others': 'OT'
  };

  const deptCode = departmentMap[subject] || 'GN';
  const key = `ticket_${deptCode}_${year}${month}`;

  // Get current count for this department this month
  let currentCount = localStorage.getItem(key);
  let nextNumber = currentCount ? parseInt(currentCount) + 1 : 1;

  // Store the new count
  localStorage.setItem(key, nextNumber.toString());

  // Format: BK-202403-001
  return `${deptCode}-${year}${month}-${nextNumber.toString().padStart(3, '0')}`;
};


const SupportInfo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [lastTicketId, setLastTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    user_email: '',
    user_phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const copyTicketId = () => {
    if (lastTicketId) {
      navigator.clipboard.writeText(lastTicketId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.first_name || !formData.user_email || !formData.message || !formData.subject) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate ticket ID based on subject
      const ticketId = generateTicketId(formData.subject);
      setLastTicketId(ticketId);

      const templateParams = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        user_email: formData.user_email,
        user_phone: formData.user_phone,
        subject: formData.subject,
        message: formData.message,
        ticket_id: ticketId,
        department_code: ticketId.split('-')[0], // Extract department code
        date_submitted: new Date().toLocaleString(),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setModal('success');
      setFormData({
        first_name: '',
        last_name: '',
        user_email: '',
        user_phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setModal('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setModal(null);
    setLastTicketId(null);
    setCopied(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SupportHeader />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12 items-center justify-center">

            {/* Contact Information Card */}
            <div className="w-full lg:w-[45%] xl:w-[500px] bg-[#006073] flex flex-col justify-between relative overflow-hidden rounded-lg min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
              <div className="p-8 text-white flex flex-col gap-24">
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-2xl">Contact Information</h1>
                  <p className="text-white">We'll get back to you within 24-48 hours</p>
                </div>
                <div className="flex flex-col gap-12">
                  {contactInfo.map((item: ContactInfo, index: number) => (
                    <div className="flex gap-3 items-center" key={index}>
                      {item.icon}
                      <p className="text-[16px]">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 flex gap-4">
                {[facebook, instagram, x].map((icon, i) => (
                  <div key={i} className="items-center justify-center flex bg-[#1F7384] rounded-full w-8 h-8 p-2">
                    <img src={icon} alt="" className="w-4 h-4" />
                  </div>
                ))}
              </div>
              <div className="w-[269px] rounded-full h-[269px] bg-[#FFFFFF1F] absolute -bottom-20 -right-20" />
            </div>

            {/* Contact Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-[42px] text-[#6F6F6F] w-full lg:w-[540px] p-3"
            >
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-1 flex-col w-full lg:w-[250px] mb-4">
                  <label className="text-[#999999]">First Name *</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full py-3 px-4 border rounded border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-[#006073]"
                  />
                </div>

                <div className="flex gap-1 flex-col w-full lg:w-[250px] mb-4">
                  <label className="text-[#999999]">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full py-3 px-4 border rounded border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-[#006073]"
                  />
                </div>

                <div className="flex gap-1 flex-col w-full lg:w-[250px] mb-4">
                  <label className="text-[#999999]">Email *</label>
                  <input
                    type="email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full py-3 px-4 border rounded border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-[#006073]"
                  />
                </div>

                <div className="flex gap-1 flex-col w-full lg:w-[250px] mb-4">
                  <label className="text-[#999999]">Phone Number</label>
                  <input
                    type="tel"
                    name="user_phone"
                    value={formData.user_phone}
                    onChange={handleChange}
                    placeholder="+2348167990657"
                    className="w-full py-3 px-4 border rounded border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-[#006073]"
                  />
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-[#313131]">Select Subject *</h3>
                <div className="flex gap-4 flex-wrap">
                  {subjects.map((s) => (
                    <div key={s.id} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="subject"
                        id={s.id}
                        value={s.label}
                        checked={formData.subject === s.label}
                        onChange={handleChange}
                        required
                        className="accent-[#006073]"
                      />
                      <label htmlFor={s.id}>{s.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message"
                  rows={4}
                  required
                  className="w-full py-3 px-4 border rounded border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-[#006073] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[156px] bg-[#006073] text-white p-[10px] rounded-lg hover:bg-hoverColor transition-colors self-end disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />

      {/* Success Modal */}
      {modal === 'success' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <CheckCircle className="w-16 h-16 text-[#006073] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#313131] mb-2">Message Sent!</h2>

            {/* Ticket ID Section */}
            {lastTicketId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">Your Ticket ID:</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="text-lg font-mono font-bold text-[#006073] bg-white px-3 py-1 rounded border border-gray-200">
                    {lastTicketId}
                  </code>
                  <button
                    onClick={copyTicketId}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="Copy ticket ID"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Please save this ticket ID for reference
                </p>
              </div>
            )}

            <p className="text-[#6F6F6F] mb-6">
              Thank you for reaching out. We've received your message and will get back to you within 24–48 hours.
            </p>
            <button
              onClick={closeModal}
              className="bg-[#006073] text-white px-8 py-3 rounded-lg hover:bg-hoverColor transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {modal === 'error' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#313131] mb-2">Something went wrong</h2>
            <p className="text-[#6F6F6F] mb-6">
              We couldn't send your message. Please try again or email us directly at info@cribxpert.com.
            </p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportInfo;