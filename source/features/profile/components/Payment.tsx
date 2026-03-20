import Footer from '@/shared/components/layout/Footer';

const Payment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex justify-center">
        <div className="lg:w-[800px] w-full flex flex-col gap-6 my-9 px-4">
          <div className="flex flex-col gap-10">
            <div className="flex gap-6 flex-col text-[#999]">
              <div className="flex gap-2 flex-col">
                <label htmlFor="card">Card Number</label>
                <input
                  type="text"
                  name="card"
                  placeholder="Enter"
                  className="rounded-md border border-[#DFE4EA] py-3 px-4 w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div className="flex gap-2 flex-col">
                <label htmlFor="name">Name on Card</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter"
                  className="rounded-md border border-[#DFE4EA] py-3 px-4 w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div className="flex gap-2">
                <div className="flex gap-2 flex-col w-full">
                  <label htmlFor="date">Expiration Date</label>
                  <input
                    type="month"
                    name="date"
                    className="rounded-md border border-[#DFE4EA] py-3 px-4 w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-2 flex-col w-full">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="Enter"
                    className="rounded-md border border-[#DFE4EA] py-3 px-4 w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                <button
                  type="submit"
                  className="w-[156px] bg-primary text-white p-[10px] rounded-lg hover:bg-hoverColor transition-colors"
                >
                  Update Payment
                </button>
                <button 
                  type="button"
                  className="w-[156px] border-2 border-primary text-primary p-[10px] rounded-lg hover:bg-primary/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
              
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  name="default"
                  id="default"
                  className="accent-primary w-5 h-5 cursor-pointer"
                />
                <label htmlFor="default" className="text-[#070707] cursor-pointer">
                  Make this my default payment method
                </label>
              </div>
            </div>

            <div>
              <a href="#" className="text-primary font-medium text-xl hover:underline">
                Add a new payment method
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;