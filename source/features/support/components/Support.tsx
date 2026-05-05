// import Title from '@/components/ui/Title';
import { useEffect, useState, useRef } from 'react';
import { fetchSheetData, SheetRow, clearCache  } from '@/services/sheetService';
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
import { CheckCircle, XCircle, X, Copy, Check, ChevronDownIcon } from 'lucide-react';
import { createTicket } from '@/features/ticket/ticketService';

import Title from '@/shared/components/ui/Title';

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
  { id: 'payment', label: 'Payment Issues' },
  { id: 'billing', label: 'Billing Issues' },
  { id: 'report', label: 'Report' },
  { id: 'others', label: 'Others' },
];

type TitleType = 'success' | 'error' | 'info' | 'warning';

const Support = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: TitleType;
    title: string;
    message: string;
    primaryAction?: { label: string; onClick: () => void };
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });
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

  const [faqs, setFaqs] = useState<SheetRow[]>([]);
  const [loadingFAQs, setLoadingFAQs] = useState(true);

  const [faqError, setFaqError] = useState<string | null>(null);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoadingFAQs(true);
        setFaqError(null);

        console.log('🚀 Starting to fetch FAQs...');

        clearCache();

        const data = await fetchSheetData("Sheet1");
        console.log('📊 All FAQs from sheet:', data);

        // Filter only active ones
        const active = data.filter((f) => f.isactive);
        console.log('✅ Active FAQs:', active);
        console.log('📈 Active count:', active.length, 'out of', data.length);

        if (active.length === 0) {
          console.warn('⚠️ No active FAQs found. Check the isActive column in your sheet.');
          setFaqError('No FAQs available at the moment. Please check back later.');
        }
        
        setFaqs(active);
      } catch (err) {
        console.error('Failed to load FAQs', err);
        setFaqError('Failed to load FAQs. Please try refreshing the page.');
      } finally {
        setLoadingFAQs(false);
      }
    };

    loadFAQs();
  }, []);

  const groupedFAQs = faqs.reduce((acc, faq) => {
    const key = faq.section;

    if (!acc[key]) acc[key] = [];

    acc[key].push(faq);

    return acc;
  }, {} as Record<string, SheetRow[]>);

  console.log('📑 Grouped FAQs:', groupedFAQs);
  console.log('🔑 Section keys:', Object.keys(groupedFAQs));

  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleQuestionEnter = (key: string) => {
    hoverTimerRef.current = setTimeout(() => setOpenQuestion(key), 180);
  };

  const handleQuestionLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setOpenQuestion(null);
  };

  const handleQuestionClick = (key: string) => {
    setOpenQuestion((prev) => (prev === key ? null : key));
  };

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
      setModal({
        isOpen: true,
        type: 'warning',
        title: 'Missing Fields',
        message: 'Please fill in all required fields before submitting.',
      });
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

      setModal({
        isOpen: true,
        type: 'success',
        title: 'Message Sent!',
        message: `Thank you for reaching out. Your ticket ID is ${ticketId}. We'll get back to you within 24-48 hours.`,
      });
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
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Something Went Wrong',
        message: 'We couldn\'t send your message. Please try again or email us directly at info@cribxpert.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
    setLastTicketId(null);
    setCopied(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-8">
        { loadingFAQs ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006073]"></div>
            <span className="ml-3 text-gray-600">Loading FAQs...</span>
          </div>
        ) : faqError ? (
          <div className="col-span-full text-center py-12">
            <p className="text-red-500">{faqError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#006073] text-white px-4 py-2 rounded hover:bg-hoverColor"
            >
              Refresh Page
            </button>
          </div>
        ) : Object.keys(groupedFAQs).length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No FAQs available at the moment.</p>
            <p className="text-sm text-gray-400 mt-2">Please check back later or contact support.</p>
          </div>
        ) : (
          Object.entries(groupedFAQs).map(([section, items]) => (
            // <div
            //   key={section}
            //   className="bg-white rounded-lg shadow-sm hover:shadow-md p-4"
            //   data-section={section}
            //   data-count={items.length}
            // >
            <div
              key={section}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 md:p-4"
              data-section={section}
              data-count={items.length}
            >
              {/* <div className="flex items-center gap-3 mb-3">
                <InformationCircleIcon className="h-5 w-5 text-[#1D5C5C]" />
                <h1 className="font-bold">{section}</h1>
              </div> */}
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#e6ecf1] rounded-full p-2 md:p-3">
                  <InformationCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-[#1D5C5C]" />
                </div>
                <h1 className="text-sm md:text-base text-[#070707] font-bold">{section}</h1>
              </div>

              {/* {items
              .sort((a, b) => a.order - b.order)
              .map((item, idx) => {
                const key = `${section}-${idx}`;
                const isOpen = openQuestion === key;

                return (
                  <div key={key}>
                    <div 
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                      onMouseEnter={() => handleQuestionEnter(key)}
                      onMouseLeave={handleQuestionLeave}
                      onClick={() => handleQuestionClick(key)}
                    >
                      <div className="flex-shrink-0">
                        <DocumentTextIcon className="h-5 w-5 md:h-6 md:w-6 text-[#6F6F6F]" />
                      </div>
                      <span className="flex-1 text-sm">{item.question}</span>

                      <ChevronDownIcon
                        className={`h-3 w-3 text-[#6F6F6F] flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    {isOpen && (
                      <p className="text-xs text-gray-500 pl-6 pb-2">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })} */}
              <div className="flex flex-col gap-1 py-3 md:py-4 px-1 md:px-2">
                {items
                .sort((a, b) => a.order - b.order)
                .map((item, idx) => {
                  const key = `${section}-${idx}`;
                  const isOpen = openQuestion === key;

                  return (
                    <div key={key}>
                      <div 
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors duration-300 hover:bg-hoverColor select-none"
                        onMouseEnter={() => handleQuestionEnter(key)}
                        onMouseLeave={handleQuestionLeave}
                        onClick={() => handleQuestionClick(key)}
                      >
                        <div className="flex-shrink-0">
                          <DocumentTextIcon className="h-5 w-5 md:h-6 md:w-6 text-[#6F6F6F]" />
                        </div>

                        <span className="text-xs md:text-sm text-[#070707] flex-1">
                          {item.question}
                        </span>

                        <ChevronDownIcon
                          className={`h-3 w-3 text-[#6F6F6F] flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-xs text-[#6F6F6F] leading-relaxed px-2 pt-1 pb-2 border-l-2 border-[#1D5C5C] ml-2 mt-1">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </div>
          ))
          )}
        {/* {header.map((item: SupportType, index: number) => {

            const questions = [
              { q: item.list1, a: item.ans1 },
              { q: item.list2, a: item.ans2 },
              { q: item.list3, a: item.ans3 },
              { q: item.list4, a: item.ans4 },
              { q: item.list5, a: item.ans5 },
            ];

            return (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 md:p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#e6ecf1] rounded-full p-2 md:p-3">
                      {item.icon}
                    </div>
                    <h1 className="text-sm md:text-base text-[#070707] font-bold">
                      {item.title}
                    </h1>
                  </div>

                  <div className="flex flex-col gap-1 py-3 md:py-4 px-1 md:px-2">
                    {questions.map(({q, a}, qIdx) => {
                      const key = `${index}-${qIdx}`;
                      const isOpen = openQuestion === key;

                      return (
                        <div key={key}>
                          <div 
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors duration-300 hover:bg-hoverColor select-none"
                            onMouseEnter={() => handleQuestionEnter(key)}
                            onMouseLeave={handleQuestionLeave}
                            onClick={() => handleQuestionClick(key)}
                            >
                              <div className="flex-shrink-0">{item.iconList}</div>

                              <span className="text-xs md:text-sm text-[#070707] flex-1">
                                {q}
                              </span>

                              <ChevronDownIcon
                                className={`h-3 w-3 text-[#6F6F6F] flex-shrink-0 transition-transform duration-300 ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                              />
                          </div>

                          <div 
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                            >
                              <p className="text-xs text-[#6F6F6F] leading-relaxed px-2 pt-1 pb-2 border-l-2 border-[#1D5C5C] ml-2 mt-1">
                                {a}
                              </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
            );
          })} */}
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
      <Title
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        primaryAction={{
          label: modal.type === 'error' ? 'Try Again' : 'Done',
          onClick: closeModal,
        }}
        secondaryAction={
          modal.type === 'error'
            ? {
                label: 'Email Support',
                onClick: () => {
                  window.location.href = 'mailto:info@cribxpert.com';
                  closeModal();
                },
              }
            : undefined
        }
      />
    </div>
  );
};

export default Support;









// (
  //   <div
  //     key={index}
  //     className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 md:p-4"
  //   >
  //     <div className="flex items-center gap-3">
  //       <div className="bg-[#e6ecf1] rounded-full p-2 md:p-3">
  //         {item.icon}
  //       </div>
  //       <h1 className="text-sm md:text-base text-[#070707] font-bold">
  //         {item.title}
  //       </h1>
  //     </div>
  //     <div className="flex flex-col gap-3 py-3 md:py-4 px-1 md:px-2">
  //       <div className="flex gap-2 md:gap-3">
  //         <div className="flex-shrink-0">{item.iconList}</div>
  //         <Link
  //           to={`/faqs`}
  //           className="text-xs md:text-sm text-[#070707] hover:text-[#1D5C5C] transition-colors"
  //         >
  //           {item.list1}
  //         </Link>
  //       </div>
  //       <div className="flex items-center gap-2 md:gap-3">
  //         <div className="flex-shrink-0">{item.iconList}</div>
  //         <h1 className="text-xs md:text-sm text-[#070707]">
  //           {item.list2}
  //         </h1>
  //       </div>
  //       <div className="flex items-center gap-2 md:gap-3">
  //         <div className="flex-shrink-0">{item.iconList}</div>
  //         <h1 className="text-xs md:text-sm text-[#070707]">
  //           {item.list3}
  //         </h1>
  //       </div>
  //       <div className="flex items-center gap-2 md:gap-3">
  //         <div className="flex-shrink-0">{item.iconList}</div>
  //         <h1 className="text-xs md:text-sm text-[#070707]">
  //           {item.list4}
  //         </h1>
  //       </div>
  //       <div className="flex items-center gap-2 md:gap-3">
  //         <div className="flex-shrink-0">{item.iconList}</div>
  //         <h1 className="text-xs md:text-sm text-[#070707]">
  //           {item.list5}
  //         </h1>
  //       </div>
  //     </div>
  //   </div>
  // )
  