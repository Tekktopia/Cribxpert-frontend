const Host = () => {
  return (
    <div className="text-[#6F6F6F] p-4">
      <div className="flex  lg:flex-row flex-col justify-between lg:items-center mb-4">
        <div className="mb-4 lg:mb-1">
          <h1 className="font-semibold text-[#313131]">Host</h1>
        </div>
        <div className="flex flex-col gap-3 lg:gap-6">
          <div className="flex flex-col lg:flex-row  lg:items-center gap-2">
            <p className="flex flex-col lg:flex-row  lg:items-center gap-2">
              <span className="font-semibold">Host Name:</span>
              Oluwaseun Adisa
            </p>
          </div>
          <div className="flex flex-col lg:flex-row  lg:items-center gap-2">
            <p className="flex flex-col lg:flex-row  lg:items-center gap-2">
              <span className="font-semibold">Contact Details: </span>
              Seun20@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Host;
