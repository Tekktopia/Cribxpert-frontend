const Booking = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Booking Form</h2>
      <form>
        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label htmlFor="firstName" className="text-[#6F6F6F]">
              First Name
            </label>
            <input
              type="text"
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
              placeholder="Makinwa"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="LastName" className="text-[#6F6F6F]">
              Last Name
            </label>
            <input
              type="text"
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
              placeholder="Makinwa"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label htmlFor="email" className="text-[#6F6F6F]">
              Email Address{' '}
            </label>
            <input
              type="text"
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="phone" className="text-[#6F6F6F]">
              Phone number{' '}
            </label>
            <input
              type="text"
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
              placeholder="Input"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label htmlFor="sex" className="text-[#6F6F6F]">
              Sex{' '}
            </label>
            <select
              name="sex"
              id="sex"
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="age" className="text-[#6F6F6F]">
              Age{' '}
            </label>
            <input
              type="number"
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
              placeholder="40"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="location" className="text-[#6F6F6F]">
            Location{' '}
          </label>
          <select
            name="location"
            id="location"
            className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
          >
            <option value="">Select Location</option>
            <option value="lagos">Lagos</option>
            <option value="addisababa">Addis Ababa</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="message" className="text-[#6F6F6F]">
            Include a message for the host
          </label>
          <textarea
            name="messsage"
            id="message"
            rows={5}
            cols={33}
            placeholder="Input message"
            className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
          ></textarea>
        </div>
        <div className="mt-4 w-full">
          <p className="text-[#6F6F6F] mb-2">Booking Instruction</p>
          <p className="text-[#6F6F6F]">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. But I
            must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness.{' '}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Booking;
