const Payment = () => {
  return (
    <div className="my-9 flex flex-col gap-10">
      <div className="flex gap-6 flex-col text-[#999] lg:w-[800px]">
        <div className="flex gap-2 flex-col  ">
          <label htmlFor="card">Card Number</label>
          <input
            type="text"
            name="card"
            placeholder="Enter"
            className="rounded-md border border-[#DFE4EA] py-3 px-4 w-full"
          />
        </div>
        <div className="flex gap-2 flex-col  ">
          <label htmlFor="name">Name on Card </label>
          <input
            type="text"
            name="name"
            placeholder="Enter"
            className="rounded-md border border-[#DFE4EA] py-3 px-4 w-full"
          />
        </div>
        <div className="flex gap-2 ">
          <div className="flex gap-2 flex-col w-full  ">
            <label htmlFor="date">Expiration Date</label>
            <input
              type="month"
              name="date"
              // placeholder="Enter"
              className="rounded-md border border-[#DFE4EA] py-3 px-4 w-full"
            />
          </div>
          <div className="flex gap-2 flex-col w-full  ">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              name="cvv"
              placeholder="Enter"
              className="rounded-md border border-[#DFE4EA] py-3 px-4 w-full"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-[156px] bg-primary text-white p-[10px] rounded-lg hover:bg-hoverColor"
          >
            Update Payment
          </button>
          <button className="w-[156px] border-2 border-primary text-primary p-[10px] rounded-lg ">
            Cancel
          </button>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="checkbox"
            name="default"
            id=""
            className="accent-primary outline-4  outline-primary w-5 h-5"
          />
          <label htmlFor="default" className="text-[#070707] ">
            Make this my default payment method
          </label>
        </div>
      </div>

      <div>
        <a href="#" className="text-primary font-medium text-xl">
          Add a new payment method
        </a>
      </div>
    </div>
  );
};

export default Payment;
