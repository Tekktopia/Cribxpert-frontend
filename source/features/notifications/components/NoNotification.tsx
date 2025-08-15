const NoNotification = () => {
  return (
    <div className="flex items-center justify-center mt-[50px]">
      <div className="flex flex-col items-center justify-center gap-4 w-[500px]">
        <img
          src={'/images/No-Notification.png'}
          alt="No notification"
          className="sm:w-[250px] w-[200px]"
        />
        <div>
          <h1 className="text-[31px] text-[#000] font-bold text-center ">
            No Notifications Yet
          </h1>
          <p className=" text-[#9E9E9E] text-[16px] text-center font-medium">
            When you get notifications, they’ll show up here
          </p>
        </div>
        <button
          type="submit"
          className=" bg-[#1D5C5C] items-center justify-center text-white p-[10px] rounded-[5px] hover:bg-[#01363f] flex  text-[12px]  sm:text-[16px] lg:text-[18px]"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default NoNotification;
