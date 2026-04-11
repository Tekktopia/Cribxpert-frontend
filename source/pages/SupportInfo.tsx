// frontend/src/features/support/components/SupportInfo.tsx
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
import { 
  CheckCircle, 
  XCircle, 
  X, 
  Copy, 
  Check,
  Search,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  LifeBuoy
} from 'lucide-react';
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

const subjects = [
  { id: 'booking', label: 'Booking Issues' },
  { id: 'technical', label: 'Technical Support' },
  { id: 'billing', label: 'Billing Issues' },
  { id: 'report', label: 'Report' },
  { id: 'others', label: 'Others' },
];

type ModalState = 'success' | 'error' | null;

// FAQ Data
const faqData = [
  {
    category: 'Booking & Cancellations',
    questions: [
      { q: 'How do I cancel or modify a booking?', a: 'You can cancel or modify your booking by going to "My Bookings" in your account dashboard. Select the booking you wish to change and click "Modify" or "Cancel".' },
      { q: 'What is the refund process?', a: 'Refunds are processed within 5-7 business days after cancellation approval. The amount depends on the cancellation policy.' },
      { q: 'What is the cancellation policy?', a: 'Cancellation policies vary by property. Free cancellation is available up to 48 hours before check-in.' },
      { q: 'How do I change my booking date?', a: 'Navigate to "My Bookings", select the booking, and click "Modify Dates". Price differences may apply.' },
    ]
  },
  {
    category: 'Payments & Refunds',
    questions: [
      { q: 'How do I update my payment method?', a: 'Go to Account Settings > Payment Methods to add, remove, or update your payment methods.' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 5-7 business days after approval.' },
      { q: 'What payment methods are accepted?', a: 'We accept credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers.' },
      { q: 'How do I request a refund?', a: 'Go to your booking details and click "Request Refund". Our team will review within 48 hours.' },
    ]
  },
  {
    category: 'Account & Security',
    questions: [
      { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.' },
      { q: 'How do I update my profile?', a: 'Go to Account Settings > Profile Information to update your details.' },
      { q: 'How do I enable 2FA?', a: 'In Account Settings > Security, click "Enable Two-Factor Authentication".' },
      { q: 'How do I delete my account?', a: 'Go to Account Settings > Privacy & Data > Delete Account. This action is permanent.' },
    ]
  },
  {
    category: 'Technical Support',
    questions: [
      { q: 'Website not loading?', a: 'Try clearing your browser cache, disabling extensions, or using a different browser.' },
      { q: 'App crashing issues?', a: 'Update to the latest version, clear app cache, or reinstall the app.' },
      { q: 'Payment gateway error?', a: 'Ensure your payment method has sufficient funds or try a different payment method.' },
      { q: 'Notifications not working?', a: 'Check your device notification settings and in-app notification preferences.' },
    ]
  }
];

const SupportInfo = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [lastTicketId, setLastTicketId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Search modal states
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ category: string; question: string; answer: string }>>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedResult, setExpandedResult] = useState<number | null>(null);
  const [showContactFormInModal, setShowContactFormInModal] = useState(false);
  
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

  // Search functionality
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      return;
    }
    
    setSearchQuery(query);
    setIsSearchModalOpen(true);
    setShowContactFormInModal(false);
    
    const results: Array<{ category: string; question: string; answer: string }> = [];
    const searchTerm = query.toLowerCase();
    
    faqData.forEach(category => {
      category.questions.forEach(faq => {
        if (faq.q.toLowerCase().includes(searchTerm) || faq.a.toLowerCase().includes(searchTerm)) {
          results.push({
            category: category.category,
            question: faq.q,
            answer: faq.a
          });
        }
      });
    });
    
    setSearchResults(results);
    setHasSearched(true);
    setExpandedResult(null);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    setExpandedResult(null);
  };

  const toggleResult = (index: number) => {
    setExpandedResult(expandedResult === index ? null : index);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
    setShowContactFormInModal(false);
    clearSearch();
  };

  const redirectToContactForm = () => {
    setShowContactFormInModal(true);
  };

  // In SupportInfo.tsx, update the handleSubmit function:

// In SupportInfo.tsx, update the handleSubmit function with proper typing:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.first_name || !formData.user_email || !formData.message || !formData.subject) {
    alert('Please fill in all required fields');
    return;
  }

  setIsSubmitting(true);

  try {
    console.log('Submitting ticket with data:', {
      firstName: formData.first_name,
      lastName: formData.last_name,
      email: formData.user_email,
      phone: formData.user_phone,
      subject: formData.subject,
      message: formData.message,
      source: 'website',
    });

    const result = await createTicket({
      firstName: formData.first_name,
      lastName: formData.last_name,
      email: formData.user_email,
      phone: formData.user_phone,
      subject: formData.subject,
      message: formData.message,
      source: 'website',
    });

    console.log('Ticket creation result:', result);

    if (!result.success) {
      throw new Error(result.message || 'Failed to create ticket');
    }

    const ticketId = result.data.ticketId;
    setLastTicketId(ticketId);

    // Email notification (optional)
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
    setIsSearchModalOpen(false);
    setShowContactFormInModal(false);
  } catch (error) {
    console.error('Error submitting ticket:', error);
    
    // Type guard to safely access error message
    let errorMessage = 'An unknown error occurred';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = String(error.message);
    }
    
    alert(`Failed to submit ticket: ${errorMessage}. Please try again or contact us directly at info@cribxpert.com.`);
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
      <SupportHeader onSearch={handleSearch} />

      {/* Main Content - Quick Links Section (only visible when modal is closed) */}
      {!isSearchModalOpen && (
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl w-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Common Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {faqData.map((category, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(category.category)}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left border border-gray-100"
                  >
                    <HelpCircle className="w-8 h-8 text-[#006073] mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-2">{category.category}</h3>
                    <p className="text-sm text-gray-500">Click to search</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Search Modal - Stays open when showing contact form */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] overflow-hidden relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {!showContactFormInModal ? (
                  <>
                    <Search className="w-5 h-5 text-[#006073]" />
                    <h2 className="text-xl font-bold text-gray-800">Search Help Center</h2>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 text-[#006073]" />
                    <h2 className="text-xl font-bold text-gray-800">Contact Support</h2>
                  </>
                )}
              </div>
              <button
                onClick={closeSearchModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-70px)]">
              {!showContactFormInModal ? (
                <>
                  {/* Search Input */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                        placeholder="Search for answers... e.g., 'cancel booking', 'refund'"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#006073] focus:ring-1 focus:ring-[#006073]"
                        autoFocus
                      />
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => handleSearch(searchQuery)}
                        className="bg-[#006073] text-white px-4 py-1.5 rounded-lg text-sm hover:bg-[#004d5a] transition-colors"
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  {/* Search Results */}
                  <div className="p-4">
                    {!hasSearched ? (
                      <div className="text-center py-12">
                        <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Type your question above to search our FAQ</p>
                        <p className="text-sm text-gray-400 mt-2">Try: "How to cancel booking" or "Payment issues"</p>
                      </div>
                    ) : searchResults.length === 0 ? (
                      <div className="text-center py-12">
                        <XCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
                        <p className="text-gray-500 mb-4">We couldn't find an answer for "{searchQuery}"</p>
                        <button
                          onClick={redirectToContactForm}
                          className="bg-[#006073] text-white px-6 py-2 rounded-lg hover:bg-[#004d5a] transition-colors inline-flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Contact Support Instead
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Found {searchResults.length} result(s) for "{searchQuery}"</p>
                        </div>
                        <div className="space-y-3">
                          {searchResults.map((result, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleResult(idx)}
                                className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
                              >
                                <div className="flex-1">
                                  <span className="text-xs text-[#006073] font-medium">{result.category}</span>
                                  <p className="text-gray-800 font-medium">{result.question}</p>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedResult === idx ? 'rotate-180' : ''}`} />
                              </button>
                              {expandedResult === idx && (
                                <div className="px-4 pb-3 pt-2 border-t border-gray-100 bg-gray-50">
                                  <p className="text-gray-600 text-sm">{result.answer}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                          <p className="text-gray-600 mb-3">Still need help?</p>
                          <button
                            onClick={redirectToContactForm}
                            className="bg-white border-2 border-[#006073] text-[#006073] px-6 py-2 rounded-lg hover:bg-[#006073] hover:text-white transition-all inline-flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Contact Support
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                // Contact Form inside Modal
                <div className="p-6">
                  <button
                    onClick={() => setShowContactFormInModal(false)}
                    className="mb-4 text-[#006073] hover:underline flex items-center gap-2 text-sm"
                  >
                    ← Back to search
                  </button>
                  
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Contact Information Card */}
                    <div className="w-full lg:w-[40%] bg-[#006073] flex flex-col justify-between relative overflow-hidden rounded-lg p-6 text-white">
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Get Support</h3>
                        <p className="text-white/80 text-sm">We'll get back to you within 24-48 hours</p>
                        <div className="flex flex-col gap-4 mt-6">
                          {contactInfo.map((item: ContactInfo, index: number) => (
                            <div className="flex gap-3 items-center" key={index}>
                              {item.icon}
                              <p className="text-sm">{item.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        {[facebook, instagram, x].map((icon, i) => (
                          <div key={i} className="items-center justify-center flex bg-[#1F7384] rounded-full w-8 h-8 p-2">
                            <img src={icon} alt="" className="w-4 h-4" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600">First Name *</label>
                          <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 py-2 px-3 border rounded-lg focus:outline-none focus:border-[#006073]"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Last Name</label>
                          <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full mt-1 py-2 px-3 border rounded-lg focus:outline-none focus:border-[#006073]"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Email *</label>
                          <input
                            type="email"
                            name="user_email"
                            value={formData.user_email}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 py-2 px-3 border rounded-lg focus:outline-none focus:border-[#006073]"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">Phone</label>
                          <input
                            type="tel"
                            name="user_phone"
                            value={formData.user_phone}
                            onChange={handleChange}
                            className="w-full mt-1 py-2 px-3 border rounded-lg focus:outline-none focus:border-[#006073]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">Subject *</label>
                        <div className="flex gap-3 flex-wrap mt-2">
                          {subjects.map((s) => (
                            <label key={s.id} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="subject"
                                value={s.label}
                                checked={formData.subject === s.label}
                                onChange={handleChange}
                                required
                                className="accent-[#006073]"
                              />
                              <span className="text-sm">{s.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          required
                          className="w-full mt-1 py-2 px-3 border rounded-lg focus:outline-none focus:border-[#006073] resize-none"
                          placeholder="Please describe your issue in detail..."
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-[#006073] text-white px-6 py-2 rounded-lg hover:bg-[#004d5a] transition-colors disabled:opacity-60"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

export default SupportInfo;