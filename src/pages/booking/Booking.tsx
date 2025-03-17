
const Booking: React.FC = () => {
  return (
    <div className="bg-white border border-[#E6E6E6] p-4 rounded-lg h-full">
      <h2 className="text-lg font-medium mb-4 text-[#040404]">Booking Form</h2>
      
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="text-[#6F6F6F] text-[14px]">
              First Name <span className="text-[#FF3B3B">*</span>
            </label>
            <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          </div>
          
          <div>
            <label htmlFor="lastName" className="text-[#6F6F6F] text-[14px]">
              Last Name <span className="text-[#FF3B3B">*</span>
            </label>
         
            <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="text-[#6F6F6F] text-[14px]">
              Email Address <span className="text-[#FF3B3B">*</span>
            </label>
            <input
            type="text"
            id="name"
            placeholder="amoriademakinwa@gmail.com"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          </div>
          
          <div>
            <label htmlFor="phone" className="text-[#6F6F6F] text-[14px]">
              Phone number 
            </label>
            <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="sex" className="text-[#6F6F6F] text-[14px]">
              Sex 
            </label>
            <select
              id="sex"
              className="w-full h-10 mt-1 rounded-md border border-[#CCCCCC66]/40 bg-background px-3 py-2 text-[14px]"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="age" className="text-[#6F6F6F] text-[14px]">
              Age 
            </label>
            <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          </div>
        </div>
        
        <div>
          <label htmlFor="location" className="text-[#6F6F6F] text-[14px]">
            Location 
          </label>
          <select
            id="location"
            className="w-full h-10 mt-1 rounded-md border border-[#CCCCCC66]/40 bg-background px-3 py-2 text-[14px]"
          >
            <option value="">Select Location</option>
            <option value="lagos">Lagos</option>
            <option value="addisababa">Addis Ababa</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="text-[#6F6F6F] text-[14px]">
            Include a message for the host 
          </label>
          <textarea
            name="messsage"
            id="message"
            rows={5}
          
            placeholder="Input message"
            className="border border-[#CCCCCC66]/40 p-2 w-full mt-2 rounded-md"/>
        </div>
        
        <div>
          <p className="text-[#6F6F6F] text-[14px] mb-2">Booking Instruction</p>
          <p className="text-[#6F6F6F] text-[14px] text-sm">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. But I
            must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Booking;
