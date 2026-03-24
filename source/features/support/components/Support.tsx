import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ContactInfo, SupportType } from '@/types';
import {
  DocumentTextIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  PhoneArrowUpRightIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router';
import { socialIcons } from '@/assets';
import { CheckCircle, XCircle, X, Copy, Check } from 'lucide-react';
import { createTicket } from '@/features/ticket/ticketService';

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

const header: Array<SupportType> = [
  {
    icon: (
      <InformationCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-[#1D5C5C]" />
    ),
    title: 'Booking & Cancellations',
    iconList: (
      <DocumentTextIcon className="h-5 w-5 md:h-6 md:w-6 text-[#6F6F6F]" />
    ),
    list1: 'How do i cancel or modify a booking?',
    list2: 'What is refund process?',
    list3: 'What is the cancellation policy?',
    list4: 'How do I change my booking date?',
    list5: 'What happens if host cancels?',
  },
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#1D5C5C]" />,
    title: 'Payments & Refunds',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'How do I update my payment method?',
    list2: 'When will I receive my refund?',
    list3: 'What payment methods are accepted?',
    list4: 'How do I request a refund?',
    list5: 'Are there any hidden fees?',
  },
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#1D5C5C]" />,
    title: 'Account & Security',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'How do I reset my password?',
    list2: 'How do I update my profile?',
    list3: 'How do I enable 2FA?',
    list4: 'How do I delete my account?',
    list5: 'How do I change my email?',
  },
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#1D5C5C]" />,
    title: 'Property Management',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'How do I list my property?',
    list2: 'How to set availability?',
    list3: 'How to manage pricing?',
    list4: 'How to view booking requests?',
    list5: 'How to communicate with guests?',
  },
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#1D5C5C]" />,
    title: 'Hosting Guidelines',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'What are hosting requirements?',
    list2: 'How to prepare my property?',
    list3: 'What are guest expectations?',
    list4: 'How to handle complaints?',
    list5: 'What is the host guarantee?',
  },
  {
    icon: <InformationCircleIcon className="h-6 w-6 text-[#1D5C5C]" />,
    title: 'Technical Support',
    iconList: <DocumentTextIcon className="h-6 w-6 text-[#6F6F6F]" />,
    list1: 'Website not loading?',
    list2: 'App crashing issues?',
    list3: 'Payment gateway error?',
    list4: 'Notification not working?',
    list5: 'How to clear cache?',
  },
];

const subjects = [
  { id: 'booking', label: 'Booking Issues' },
  { id: 'technical', label: 'Technical Support' },
  { id: 'payment', label: 'Payment Issues' },
  { id: 'billing', label: 'Billing Issues' },
  { id: 'report', label: 'Report' },
  { id: 'others', label: 'Others' },
];

type ModalState = 'success' | 'error' | null;

const Support = () => {
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
      // 1. Create ticket in backend (MongoDB)
      const result = await createTicket({
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.user_email,
        phone: formData.user_phone,
        subject: formData.subject,
        message: formData.message,
        source: 'website',
      });

      if (!result.success) {
        throw new Error(result.message || 'Failed to create ticket');
      }

      const ticketId = result.data.ticketId;
      setLastTicketId(ticketId);

      // 2. Optional: Send confirmation email via EmailJS
      try {
        const templateParams = {
          first_name: formData.first_name,
          last_name: formData.last_name,
          user_email: formData.user_email,
          user_phone: formData.user_phone,
          subject: formData.subject,
          message: formData.message,
          ticket_id: ticketId,
          department_code: ticketId.split('-')[0],
          date_submitted: new Date().toLocaleString(),
        };

        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } catch (emailError) {
        console.warn('Email notification failed, but ticket was created:', emailError);
      }

      setModal('success');
      setFormData({
        first_name: '',
        last_name: '',
        user_email: '',
        user_phone: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      console.error('Error submitting ticket:', error);
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
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-8">
        {header.map((item: SupportType, index: number) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 md:p-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#e6ecf1] rounded-full p-2 md:p-3">
                {item.icon}
              </div>
              <h1 className="text-sm md:text-base text-[#070707] font-bold">
                {item.title}
              </h1>
            </div>
            <div className="flex flex-col gap-3 py-3 md:py-4 px-1 md:px-2">
              <div className="flex gap-2 md:gap-3">
                <div className="flex-shrink-0">{item.iconList}</div>
                <Link
                  to={`/faqs`}
                  className="text-xs md:text-sm text-[#070707] hover:text-[#1D5C5C] transition-colors"
                >
                  {item.list1}
                </Link>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex-shrink-0">{item.iconList}</div>
                <h1 className="text-xs md:text-sm text-[#070707]">
                  {item.list2}
                </h1>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex-shrink-0">{item.iconList}</div>
                <h1 className="text-xs md:text-sm text-[#070707]">
                  {item.list3}
                </h1>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex-shrink-0">{item.iconList}</div>
                <h1 className="text-xs md:text-sm text-[#070707]">
                  {item.list4}
                </h1>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex-shrink-0">{item.iconList}</div>
                <h1 className="text-xs md:text-sm text-[#070707]">
                  {item.list5}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Form Section */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12 mb-8 items-center justify-center">
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
            <div className="items-center justify-center flex bg-[#1F7384] rounded-full w-8 h-8 p-2">
              <img src={facebook} alt="facebook" className="w-4 h-4" />
            </div>
            <div className="items-center justify-center flex bg-[#1F7384] rounded-full w-8 h-8 p-2">
              <img src={instagram} alt="instagram" className="w-4 h-4" />
            </div>
            <div className="items-center justify-center flex bg-[#1F7384] rounded-full w-8 h-8 p-2">
              <img src={x} alt="x" className="w-4 h-4" />
            </div>
          </div>
          <div className="w-[269px] rounded-full h-[269px] bg-[#FFFFFF1F] absolute -bottom-20 -right-20"></div>
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
                placeholder="johndoe@cribxpert.com"
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
                placeholder="+2348123456789"
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

export default Support;