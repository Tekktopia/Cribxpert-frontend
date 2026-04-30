// source/features/bookings/components/Booking.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from '@/features/auth/authSlice';
import { useCreateBookingMutation } from '@/features/bookings/bookingService';
import { startBooking } from '@/features/bookings';
import useAlert from '@/hooks/useAlert';
import type { BookingData } from '@/types';

interface BookingProps {
  bookingData?: BookingData;
}

const Booking: React.FC<BookingProps> = ({ bookingData }) => {
  const currentUser = useSelector(selectCurrentUser);

  const nameParts = ((currentUser?.user_metadata as Record<string, string>)?.full_name ?? '').split(' ').filter(Boolean);
  const defaultFirstName = nameParts[0] || '';
  const defaultLastName = nameParts.slice(1).join(' ') || '';

  const [firstName, setFirstName] = useState(defaultFirstName);
  const [lastName, setLastName] = useState(defaultLastName);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [createBooking] = useCreateBookingMutation();

  useEffect(() => {
    if (!bookingData) {
      return;
    }

    dispatch(
      startBooking({
        propertyId: bookingData.propertyId,
        checkIn: bookingData.startDate?.toLocaleDateString('en-CA') || '',
        checkOut: bookingData.endDate?.toLocaleDateString('en-CA') || '',
        guests: bookingData.guests,
        totalPrice: bookingData.totalPrice,
        userId: currentUser?.id || '',
        specialRequests: message,
      })
    );
  }, [bookingData, currentUser?.id, dispatch, message]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to make a booking.',
      });
      navigate('/login');
      return;
    }

    if (!bookingData?.startDate || !bookingData?.endDate) {
      alert({
        icon: 'error',
        title: 'Missing Dates',
        text: 'Please select check-in and check-out dates.',
      });
      return;
    }

    if (!firstName || !lastName || !email || !phone || !dateOfBirth) {
      alert({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all required fields including date of birth.',
      });
      return;
    }

    window.dispatchEvent(new CustomEvent('bookingSubmissionStart'));

    try {
      const bookingRequest = {
        startDate: bookingData.startDate.toISOString(),
        endDate: bookingData.endDate.toISOString(),
        travelersNo: bookingData.guests,
        totalPrice: bookingData.totalPrice,
        listing: bookingData.propertyId,
        userId: currentUser?.id || '',
        firstName,
        lastName,
        email,
        phoneNo: phone,
        sex,
        age: age ? Number(age) : 0,
        location,
        message,
        dateOfBirth,
      };

      console.log('bookingRequest:', bookingRequest);

      const result = await createBooking(bookingRequest).unwrap();
      const createdBooking = result?.booking;

      if (!createdBooking?._id) {
        throw new Error('Booking created but no booking ID was returned.');
      }

      alert({
        icon: 'success',
        title: 'Booking Confirmed!',
        text: 'Redirecting to secure payment...',
      });

      navigate(`/escrow/${createdBooking._id}`);
    } catch (error) {
      const err = error as {
        data?: { message?: string; error?: string };
        message?: string;
      };

      alert({
        icon: 'error',
        title: 'Booking Failed',
        text:
          err?.data?.message ||
          err?.data?.error ||
          err?.message ||
          'Failed to create booking. Please try again.',
      });

      console.error('Booking creation failed:', error);
      console.error('Booking creation failed data:', (error as any)?.data);
    } finally {
      window.dispatchEvent(new CustomEvent('bookingSubmissionEnd'));
    }
  };

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Booking Form</h2>

      <form id="booking-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label htmlFor="firstName" className="text-[#6F6F6F]">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="lastName" className="text-[#6F6F6F]">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
              placeholder="Enter last name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label htmlFor="email" className="text-[#6F6F6F]">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="phone" className="text-[#6F6F6F]">
              Phone number *
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
              placeholder="+2348012345678"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label htmlFor="dateOfBirth" className="text-[#6F6F6F]">
              Date of Birth *{' '}
              <span className="text-xs text-gray-400">
                (required for payment verification)
              </span>
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              max={
                new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split('T')[0]
              }
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="sex" className="text-[#6F6F6F]">
              Sex
            </label>
            <select
              name="sex"
              id="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label htmlFor="age" className="text-[#6F6F6F]">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
              placeholder="Enter age"
              min="18"
              max="100"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="location" className="text-[#6F6F6F]">
              Location
            </label>
            <select
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
            >
              <option value="">Select Location</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="kano">Kano</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="message" className="text-[#6F6F6F]">
            Message for host
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Include a message for the host (optional)"
            className="border border-[#CCCCCC66]/40 p-2 w-full mt-2"
          />
        </div>

        <div className="mt-4 w-full">
          <p className="text-[#6F6F6F] mb-2">Booking Instruction</p>
          <p className="text-[#6F6F6F]">
            By clicking &quot;Confirm Booking&quot;, you agree to our terms and
            conditions. Your booking will be confirmed and you will be
            redirected to the secure escrow payment page.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Booking;
