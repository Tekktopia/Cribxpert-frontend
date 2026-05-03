// import { useState } from 'react';
import { ActiveBooking } from '@/types';
import BookingsLinks from './BookingsLinks';
// import { Menu, X } from 'lucide-react';
type Props = {
  active: ActiveBooking;
  setActive: (value: ActiveBooking) => void;
};

const BookingsNav = ({ active, setActive }: Props) => {
  // const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // const toggleNavbar = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const bookingTabs = [
    { label: 'All Bookings', value: ActiveBooking.All },
    { label: 'Upcoming Bookings', value: ActiveBooking.Upcoming },
    { label: 'Past Bookings', value: ActiveBooking.Past },
    { label: 'Cancelled Bookings', value: ActiveBooking.Cancelled },
  ];
  return (
    // <nav>
    //   <div className="flex justify-between items-center">
    //     <div className=" w-full py-3 lg:gap-[10px] text-neutralLight text-[12px]  sm:text-[14px]  hidden lg:flex    ">
    //       <div className=" items-center justify-center py-2  lg:px-4 ">
    //         <BookingsLinks
    //           page="All Bookings"
    //           active={active}
    //           setActive={setActive}
    //         />
    //       </div>
    //       <div className=" items-center justify-center py-2  px-4">
    //         <BookingsLinks
    //           page="Upcoming Bookings"
    //           active={active}
    //           setActive={setActive}
    //         />
    //       </div>
    //       <div className=" items-center justify-center py-2  px-4">
    //         <BookingsLinks
    //           page="Past Bookings"
    //           active={active}
    //           setActive={setActive}
    //         />
    //       </div>
    //       <div className=" items-center justify-center py-2  px-4">
    //         <BookingsLinks
    //           page="Cancelled Bookings"
    //           active={active}
    //           setActive={setActive}
    //         />
    //       </div>
    //     </div>
    //     <div>
    //       <button className="text-white p-[10px] w-full text-nowrap  bg-primary rounded-xl hover:bg-hoverColor hover:shadow/80 transition duration-300">
    //         Discover Properties
    //       </button>
    //     </div>
    //     <div className="lg:hidden gap-3 w-full text-primary  flex items-center justify-between py-2  px-4">
    //       <div className="font-bold text-[18px]">
    //         <h1>Bookings</h1>
    //       </div>
    //       <button onClick={toggleNavbar}>
    //         {mobileOpen ? <X /> : <Menu />}
    //       </button>
    //     </div>
    //   </div>
    //   {mobileOpen && (
    //     <div className="fixed right-0 z-20 p-12  border-neutral-900 w-full flex flex-col justify-center items-center lg:hidden text-center backdrop-blur-lg ">
    //       <div className=" px-4 mx-auto relative text-sm">
    //         <div className="flex items-center justify-center py-2  lg:px-4 ">
    //           <BookingsLinks
    //             page="All Bookings"
    //             active={active}
    //             setActive={setActive}
    //           />
    //         </div>
    //         <div className="flex items-center justify-center py-2  px-4">
    //           <BookingsLinks
    //             page="Upcoming Bookings"
    //             active={active}
    //             setActive={setActive}
    //           />
    //         </div>
    //         <div className="flex items-center justify-center py-2  px-4">
    //           <BookingsLinks
    //             page="Past Bookings"
    //             active={active}
    //             setActive={setActive}
    //           />
    //         </div>
    //         <div className="flex items-center justify-center py-2  px-4">
    //           <BookingsLinks
    //             page="Cancelled Bookings"
    //             active={active}
    //             setActive={setActive}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </nav>

    <nav className="flex flex-col gap-3 py-3">
      <div>
        <button className="text-white p-[10px] text-nowrap bg-primary rounded-xl hover:bg-hoverColor hover:shadow/80 transition duration-300">
          Discover Properties
        </button>
      </div>

      <div className="flex flex-row gap-1 overflow-x-auto whitespace-nowrap text-neutralLight text-[12px] sm:text-[14px]">
        {bookingTabs.map((tab) => (
          <div key={tab.value} className="flex items-center justify-center py-2 px-4">
            <BookingsLinks page={tab.value} label={tab.label} active={active} setActive={setActive} />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default BookingsNav;
