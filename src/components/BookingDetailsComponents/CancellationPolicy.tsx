const CancellationPolicy = () => {
  return (
    <div className="p-4 text-[#6F6F6F]">
      <div className="text-[#313131] font-bold text-xl">
        <h1>Cancellation Policy</h1>
      </div>
      <div className="flex  gap-1 mt-4">
        <p className="">
          Once payment has been successfully made and confirmed, the booking is
          considered final. We do not allow cancellations or provide refunds
          under any circumstances. We encourage guests to carefully review the
          booking details, including property information, dates, and host
          policies
          <a href="#" className="text-[#FF3B3B] ml-1">
            Read More
          </a>
        </p>
      </div>
    </div>
  );
};

export default CancellationPolicy;
