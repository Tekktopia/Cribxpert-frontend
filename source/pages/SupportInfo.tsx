import SupportHeader from '@/features/support/components/SupportHeader';
import Footer from '@/shared/components/layout/Footer';
import { ContactInfo } from '@/types';
import { socialIcons } from '@/assets';
import {
  PhoneArrowUpRightIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';

const { facebook, instagram, x } = socialIcons;

const contactInfo: Array<ContactInfo> = [
  {
    icon: <PhoneArrowUpRightIcon className="h-5 w-5 md:h-6 md:w-6" />,
    title: '+2348167890978',
  },
  {
    icon: <EnvelopeIcon className="h-5 w-5 md:h-6 md:w-6" />,
    title: 'shortletng.com',
  },
  {
    icon: <MapPinIcon className="h-5 w-5 md:h-6 md:w-6" />,
    title: 'Lagos, Nigeria',
  },
];

const SupportInfo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SupportHeader />
      
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-10 lg:gap-12 items-center justify-center">
            
            {/* Contact Information Card */}
            <div className="w-full lg:w-[45%] xl:w-[500px] bg-[#006073] flex flex-col justify-between relative overflow-hidden rounded-lg min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
              <div className="p-8 text-white flex flex-col gap-24">
                <div className="flex flex-col gap-3">
                  <h1 className="font-semibold text-2xl">Contact Information</h1>
                  <p className="text-white">
                    We'll get back to you within 24-48 hours
                  </p>
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
            <form className="flex flex-col gap-[42px] text-[#6F6F6F] w-full lg:w-[540px] p-3">
              <div className="flex flex-wrap gap-4">
                <div className="flex gap-1 flex-col w-full lg:w-[250px] h-[70px] mb-4">
                  <label className="text-[#999999]">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John Doe"
                    className="w-full py-3 px-4 border rounded border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-[#006073]"
                  />
                </div>

                <div className="flex gap-1 flex-col w-full lg:w-[250px] h-[70px] mb-4">
                  <label className="text-[#999999]">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="John Doe"
                    className="w-full py-3 px-4 border rounded border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-[#006073]"
                  />
                </div>

                <div className="flex gap-1 flex-col w-full lg:w-[250px] h-[70px] mb-4">
                  <label className="text-[#999999]">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="amoriamakinwa@gmail.com"
                    className="w-full py-3 px-4 border rounded border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-[#006073]"
                  />
                </div>

                <div className="flex gap-1 flex-col w-full lg:w-[250px] h-[70px] mb-4">
                  <label className="text-[#999999]">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+2348167990657"
                    className="w-full py-3 px-4 border rounded border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-[#006073]"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="mb-4 text-[#313131]">Select Subject</h3>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="subject" id="booking" />
                    <label htmlFor="booking">Booking Issues</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="subject" id="technical" />
                    <label htmlFor="technical">Technical Support</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="subject" id="billing" />
                    <label htmlFor="billing">Billing Issues</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="subject" id="report" />
                    <label htmlFor="report">Report</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="subject" id="others" />
                    <label htmlFor="others">Others</label>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message"
                  rows={4}
                  className="w-full py-3 px-4 border rounded border-[#DFE4EA] text-[#999999] focus:outline-none focus:border-[#006073] resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-[156px] bg-[#006073] text-white p-[10px] rounded-lg hover:bg-[#004d5c] transition-colors self-end"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SupportInfo;