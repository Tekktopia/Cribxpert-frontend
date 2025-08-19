import otherFilterIcon from '@/assets/icons/otherFilterIcon.png';
import { PropertyListingCardProps } from '@/types';
import { BookingsType } from '@/types';
import beachside from '../assets/images/beachside.jpg';
import cityview from '../assets/images/cityview.jpg';
import downtown from '../assets/images/downtown.jpg';

// Payment History Types
export interface PaymentHistoryItem {
  id: string;
  bookingId: string;
  propertyName: string;
  propertyImage: string;
  checkInDate: string;
  checkOutDate: string;
  paymentStatus: 'CONFIRMED' | 'PENDING' | 'FAILED';
  amount: number;
  paymentMethod: string;
  transactionDate: string;
}

export interface PaymentHistoryFilters {
  status: 'all' | 'pending' | 'failed' | 'confirmed';
  dateRange?: {
    start: string;
    end: string;
  };
  propertyName?: string;
}

export interface PaymentHistoryDetail {
  id: string;
  bookingId: string;
  status: 'CONFIRMED' | 'PENDING' | 'FAILED';
  propertyImage: string;
  listingName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
    total: number;
  };
  bookingDate: string;
  bookingTime: string;
  paymentMethod: string;
  paymentDate: string;
  paymentTime: string;
  subtotal: number;
  securityDeposit: number;
  serviceCharge: number;
  totalAmount: number;
}

const SAMPLE_DATA: PropertyListingCardProps[] = [
  {
    id: '1',
    image: '/images/apartment4.jpg',
    images: [
      '/images/apartment4.jpg',
      '/images/apartment2.jpg',
      '/images/apartment3.jpg',
    ],
    name: "Makinwa's Cottage",
    location: 'Street 23, All Avenue, Lagos Nigeria',
    rating: 4.5,
    price: 50000,
    description: 'Newly Test Remodeled',
    bedrooms: 3,
    propertyType: 'Apartment',
  },
  {
    id: '2',
    image: '/images/apartment5.jpg',
    images: [
      '/images/apartment5.jpg',
      '/images/apartment4.jpg',
      '/images/apartment3.jpg',
      '/images/apartment2.jpg',
    ],
    name: 'Lekki Luxury Villa',
    location: 'Lekki Phase 1, Lagos',
    rating: 4.8,
    description: 'Stunning waterfront property',
    price: 75000,
    bedrooms: 4,
    propertyType: 'Villa',
  },
  {
    id: '3',
    image: '/images/apartment6.jpg',
    images: ['/images/apartment6.jpg', '/images/apartment2.jpg'],
    name: 'Downtown Abuja Studio',
    location: 'Central Business District, Abuja',
    rating: 4.2,
    price: 35000,
    description: 'Modern studio in the heart of the city',
    bedrooms: 1,
    propertyType: 'Studio',
  },
  {
    id: '4',
    image: '/images/apartment7.jpg',
    images: [
      '/images/apartment7.jpg',
      '/images/apartment3.jpg',
      '/images/apartment5.jpg',
    ],
    name: 'Waterside Cottage',
    location: 'Victoria Island, Lagos',
    rating: 4.7,
    price: 68000,
    description: 'Serene waterfront experience',
    bedrooms: 2,
    propertyType: 'Cottage',
  },
  {
    id: '5',
    image: '/images/apartment8.jpg',
    images: [
      '/images/apartment8.jpg',
      '/images/apartment7.jpg',
      '/images/apartment4.jpg',
      '/images/apartment2.jpg',
    ],
    name: 'Mountain View Cabin',
    location: 'Jos, Plateau State',
    rating: 4.9,
    description: 'Scenic mountain retreat',
    price: 45000,
    bedrooms: 2,
    propertyType: 'Cabin',
  },
  {
    id: '6',
    image: '/images/apartment9.jpg',
    images: ['/images/apartment9.jpg', '/images/apartment6.jpg'],
    name: 'Modern High-Rise',
    location: 'Ikoyi, Lagos',
    rating: 4.6,
    description: 'Luxury apartment with skyline views',
    price: 90000,
    bedrooms: 3,
    propertyType: 'Apartment',
  },
  {
    id: '7',
    image: '/images/apartment4.jpg',
    images: [
      '/images/apartment4.jpg',
      '/images/apartment5.jpg',
      '/images/apartment8.jpg',
    ],
    name: 'Garden Oasis',
    location: 'Ikeja GRA, Lagos',
    rating: 4.3,
    description: 'Peaceful garden property',
    price: 55000,
    bedrooms: 3,
    propertyType: 'House',
  },
  {
    id: '8',
    image: '/images/apartment7.jpg',
    images: ['/images/apartment7.jpg', '/images/apartment9.jpg'],
    name: 'Beachfront Paradise',
    location: 'Eleko Beach, Lagos',
    rating: 4.8,
    description: 'Direct beach access property',
    price: 85000,
    bedrooms: 4,
    propertyType: 'Beach House',
  },
  {
    id: '9',
    image: '/images/apartment6.jpg',
    images: [
      '/images/apartment6.jpg',
      '/images/apartment7.jpg',
      '/images/apartment8.jpg',
    ],
    name: 'City Center Loft',
    location: 'Marina, Lagos',
    rating: 4.4,
    price: 48000,
    description: 'Urban loft with modern amenities',
    bedrooms: 2,
    propertyType: 'Loft',
  },
  {
    id: '10',
    image: '/images/apartment5.jpg',
    images: [
      '/images/apartment5.jpg',
      '/images/apartment6.jpg',
      '/images/apartment7.jpg',
      '/images/apartment8.jpg',
    ],
    name: 'Riverside Retreat',
    location: 'Port Harcourt, Rivers State',
    rating: 4.7,
    description: 'Serene riverside accommodation',
    price: 65000,
    bedrooms: 3,
    propertyType: 'Cottage',
  },
  {
    id: '11',
    image: '/images/apartment9.jpg',
    images: ['/images/apartment9.jpg', '/images/apartment8.jpg'],
    name: 'Executive Suite',
    location: 'Victoria Island, Lagos',
    rating: 4.9,
    price: 120000,
    description: 'Luxury executive accommodation',
    bedrooms: 2,
    propertyType: 'Suite',
  },
  {
    id: '12',
    image: '/images/apartment4.jpg',
    images: [
      '/images/apartment4.jpg',
      '/images/apartment5.jpg',
      '/images/apartment6.jpg',
    ],
    name: 'Historic Townhouse',
    location: 'Calabar, Cross River State',
    rating: 4.5,
    price: 42000,
    description: 'Classic town house with character',
    bedrooms: 4,
    propertyType: 'Townhouse',
  },
];

const Filter = [
  {
    name: 'All Short-let',
    image: otherFilterIcon,
  },
  {
    name: 'House',
    image: otherFilterIcon,
  },
  {
    name: 'Apartment',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Cottage',
    image: otherFilterIcon,
  },
  {
    name: 'Cabin',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
  {
    name: 'Beach Houses',
    image: otherFilterIcon,
  },
];

const bookingsData: Array<BookingsType> = [
  {
    id: '100001',
    image: beachside,
    name: 'Beachside Villa',
    checkin: 'Dec 12 2024',
    checkout: 'Dec 19 2024',
    status: 'confirmed',
    description: ' Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100002',
    image: cityview,
    name: 'City View Cabin',
    checkin: 'Mar 12 2024',
    checkout: 'Mar 19 2024',
    status: 'pending',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100003',
    image: downtown,
    name: 'Downtown Villa',
    checkin: 'Jan 12 2024',
    checkout: 'Jan 19 2024',
    status: 'confirmed',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100004',
    image: beachside,
    name: 'Beachside Villa',
    checkin: 'Dec 12 2024',
    checkout: 'Dec 19 2024',
    status: 'confirmed',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },

  {
    id: '100005',
    image: beachside,
    name: 'Beachside Villa',
    checkin: 'Dec 12 2024',
    checkout: 'Dec 19 2024',
    status: 'cancelled',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100006',
    image: cityview,
    name: 'City View Cabin',
    checkin: 'Mar 12 2024',
    checkout: 'Mar 19 2024',
    status: 'cancelled',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100007',
    image: downtown,
    name: 'Downtown Villa',
    checkin: 'Jan 12 2024',
    checkout: 'Jan 19 2024',
    status: 'cancelled',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100008',
    image: beachside,
    name: 'Beachside Villa',
    checkin: 'Dec 12 2024',
    checkout: 'Dec 19 2024',
    status: 'completed',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100009',
    image: cityview,
    name: 'City View Cabin',
    checkin: 'Mar 12 2024',
    checkout: 'Mar 19 2024',
    status: 'completed',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100010',
    image: downtown,
    name: 'Downtown Villa',
    checkin: 'Jan 12 2024',
    checkout: 'Jan 19 2024',
    status: 'completed',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
];

const upcomingBookingsData: Array<BookingsType> = [
  {
    id: '100001',
    image: beachside,
    name: 'Beachside Villa',
    checkin: 'Dec 12 2024',
    checkout: 'Dec 19 2024',
    status: 'confirmed',
    description: ' Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100002',
    image: cityview,
    name: 'City View Cabin',
    checkin: 'Mar 12 2024',
    checkout: 'Mar 19 2024',
    status: 'pending',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100003',
    image: downtown,
    name: 'Downtown Villa',
    checkin: 'Jan 12 2024',
    checkout: 'Jan 19 2024',
    status: 'confirmed',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
];
const cancelledBookingsData: Array<BookingsType> = [
  {
    id: '100005',
    image: beachside,
    name: 'Beachside Villa',
    checkin: 'Dec 12 2024',
    checkout: 'Dec 19 2024',
    status: 'cancelled',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100006',
    image: cityview,
    name: 'City View Cabin',
    checkin: 'Mar 12 2024',
    checkout: 'Mar 19 2024',
    status: 'cancelled',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100007',
    image: downtown,
    name: 'Downtown Villa',
    checkin: 'Jan 12 2024',
    checkout: 'Jan 19 2024',
    status: 'cancelled',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
];
const completedBookingsData: Array<BookingsType> = [
  {
    id: '100008',
    image: beachside,
    name: 'Beachside Villa',
    checkin: 'Dec 12 2024',
    checkout: 'Dec 19 2024',
    status: 'completed',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100009',
    image: cityview,
    name: 'City View Cabin',
    checkin: 'Mar 12 2024',
    checkout: 'Mar 19 2024',
    status: 'completed',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
  {
    id: '100010',
    image: downtown,
    name: 'Downtown Villa',
    checkin: 'Jan 12 2024',
    checkout: 'Jan 19 2024',
    status: 'completed',
    description: 'Newly Remodeled Federal Capital Territory Gombe',
  },
];

// Payment History Data
const paymentHistoryData: PaymentHistoryItem[] = [
  {
    id: '1',
    bookingId: '#100001',
    propertyName: 'Beachside Villa',
    propertyImage: beachside,
    checkInDate: 'Dec 12, 2024',
    checkOutDate: 'Dec 15, 2024',
    paymentStatus: 'CONFIRMED',
    amount: 150000,
    paymentMethod: 'Bank Transfer',
    transactionDate: 'Dec 10, 2024',
  },
  {
    id: '2',
    bookingId: '#100002',
    propertyName: 'City View Cabin',
    propertyImage: cityview,
    checkInDate: 'Mar 10, 2025',
    checkOutDate: 'Mar 12, 2025',
    paymentStatus: 'PENDING',
    amount: 85000,
    paymentMethod: 'Card Payment',
    transactionDate: 'Mar 8, 2025',
  },
  {
    id: '3',
    bookingId: '#100003',
    propertyName: 'Downtown Villa',
    propertyImage: downtown,
    checkInDate: 'Mar 10, 2025',
    checkOutDate: 'Mar 12, 2025',
    paymentStatus: 'FAILED',
    amount: 120000,
    paymentMethod: 'Card Payment',
    transactionDate: 'Mar 8, 2025',
  },
  {
    id: '4',
    bookingId: '#100004',
    propertyName: 'Downtown Villa',
    propertyImage: downtown,
    checkInDate: 'Mar 10, 2025',
    checkOutDate: 'Mar 12, 2025',
    paymentStatus: 'CONFIRMED',
    amount: 120000,
    paymentMethod: 'USSD',
    transactionDate: 'Mar 8, 2025',
  },
  {
    id: '5',
    bookingId: '#100005',
    propertyName: 'Cozy Cabin',
    propertyImage: beachside,
    checkInDate: 'Mar 10, 2025',
    checkOutDate: 'Mar 12, 2025',
    paymentStatus: 'CONFIRMED',
    amount: 95000,
    paymentMethod: 'Payment Link',
    transactionDate: 'Mar 8, 2025',
  },
  {
    id: '6',
    bookingId: '#100006',
    propertyName: 'Luxury Apartment',
    propertyImage: cityview,
    checkInDate: 'Apr 15, 2025',
    checkOutDate: 'Apr 18, 2025',
    paymentStatus: 'PENDING',
    amount: 180000,
    paymentMethod: 'Bank Transfer',
    transactionDate: 'Apr 12, 2025',
  },
  {
    id: '7',
    bookingId: '#100007',
    propertyName: 'Mountain Retreat',
    propertyImage: downtown,
    checkInDate: 'May 20, 2025',
    checkOutDate: 'May 25, 2025',
    paymentStatus: 'CONFIRMED',
    amount: 220000,
    paymentMethod: 'Card Payment',
    transactionDate: 'May 18, 2025',
  },
  {
    id: '8',
    bookingId: '#100008',
    propertyName: 'Beach House',
    propertyImage: beachside,
    checkInDate: 'Jun 5, 2025',
    checkOutDate: 'Jun 8, 2025',
    paymentStatus: 'FAILED',
    amount: 135000,
    paymentMethod: 'USSD',
    transactionDate: 'Jun 3, 2025',
  },
];

// Payment History Details Data
const paymentHistoryDetailsData: PaymentHistoryDetail[] = [
  {
    id: '1',
    bookingId: '#100001',
    status: 'CONFIRMED',
    propertyImage: beachside,
    listingName:
      'Beachside Villa - Newly Remodeled Federal Capital Territory Gombe',
    checkIn: 'December 12, 2024',
    checkOut: 'December 15, 2024',
    nights: 3,
    guests: {
      adults: 2,
      children: 1,
      total: 3,
    },
    bookingDate: 'December 10, 2024',
    bookingTime: '04:20pm',
    paymentMethod: 'Bank Transfer',
    paymentDate: 'December 10, 2024',
    paymentTime: '04:20pm',
    subtotal: 150000,
    securityDeposit: 60000,
    serviceCharge: 15000,
    totalAmount: 225000,
  },
  {
    id: '2',
    bookingId: '#100002',
    status: 'PENDING',
    propertyImage: cityview,
    listingName: 'City View Cabin - Luxury Waterfront Property',
    checkIn: 'March 10, 2025',
    checkOut: 'March 12, 2025',
    nights: 2,
    guests: {
      adults: 3,
      children: 0,
      total: 3,
    },
    bookingDate: 'March 8, 2025',
    bookingTime: '02:15pm',
    paymentMethod: 'Card Payment',
    paymentDate: 'March 8, 2025',
    paymentTime: '02:15pm',
    subtotal: 85000,
    securityDeposit: 40000,
    serviceCharge: 8500,
    totalAmount: 133500,
  },
  {
    id: '3',
    bookingId: '#100003',
    status: 'FAILED',
    propertyImage: downtown,
    listingName: 'Downtown Villa - Modern City Living',
    checkIn: 'March 10, 2025',
    checkOut: 'March 12, 2025',
    nights: 2,
    guests: {
      adults: 2,
      children: 2,
      total: 4,
    },
    bookingDate: 'March 8, 2025',
    bookingTime: '11:30am',
    paymentMethod: 'Card Payment',
    paymentDate: 'March 8, 2025',
    paymentTime: '11:30am',
    subtotal: 120000,
    securityDeposit: 50000,
    serviceCharge: 12000,
    totalAmount: 182000,
  },
  {
    id: '4',
    bookingId: '#100004',
    status: 'CONFIRMED',
    propertyImage: downtown,
    listingName: 'Downtown Villa - Modern City Living',
    checkIn: 'March 10, 2025',
    checkOut: 'March 12, 2025',
    nights: 2,
    guests: {
      adults: 2,
      children: 1,
      total: 3,
    },
    bookingDate: 'March 8, 2025',
    bookingTime: '03:45pm',
    paymentMethod: 'USSD',
    paymentDate: 'March 8, 2025',
    paymentTime: '03:45pm',
    subtotal: 120000,
    securityDeposit: 50000,
    serviceCharge: 12000,
    totalAmount: 182000,
  },
  {
    id: '5',
    bookingId: '#100005',
    status: 'CONFIRMED',
    propertyImage: beachside,
    listingName: 'Cozy Cabin - Scenic Mountain Retreat',
    checkIn: 'March 10, 2025',
    checkOut: 'March 12, 2025',
    nights: 2,
    guests: {
      adults: 2,
      children: 0,
      total: 2,
    },
    bookingDate: 'March 8, 2025',
    bookingTime: '01:20pm',
    paymentMethod: 'Payment Link',
    paymentDate: 'March 8, 2025',
    paymentTime: '01:20pm',
    subtotal: 95000,
    securityDeposit: 45000,
    serviceCharge: 9500,
    totalAmount: 149500,
  },
  {
    id: '6',
    bookingId: '#100006',
    status: 'PENDING',
    propertyImage: cityview,
    listingName: 'Luxury Apartment - Skyline Views',
    checkIn: 'April 15, 2025',
    checkOut: 'April 18, 2025',
    nights: 3,
    guests: {
      adults: 4,
      children: 1,
      total: 5,
    },
    bookingDate: 'April 12, 2025',
    bookingTime: '10:30am',
    paymentMethod: 'Bank Transfer',
    paymentDate: 'April 12, 2025',
    paymentTime: '10:30am',
    subtotal: 180000,
    securityDeposit: 80000,
    serviceCharge: 18000,
    totalAmount: 278000,
  },
  {
    id: '7',
    bookingId: '#100007',
    status: 'CONFIRMED',
    propertyImage: downtown,
    listingName: 'Mountain Retreat - Scenic Mountain Views',
    checkIn: 'May 20, 2025',
    checkOut: 'May 25, 2025',
    nights: 5,
    guests: {
      adults: 3,
      children: 2,
      total: 5,
    },
    bookingDate: 'May 18, 2025',
    bookingTime: '09:15am',
    paymentMethod: 'Card Payment',
    paymentDate: 'May 18, 2025',
    paymentTime: '09:15am',
    subtotal: 220000,
    securityDeposit: 100000,
    serviceCharge: 22000,
    totalAmount: 342000,
  },
  {
    id: '8',
    bookingId: '#100008',
    status: 'FAILED',
    propertyImage: beachside,
    listingName: 'Beach House - Direct Beach Access',
    checkIn: 'June 5, 2025',
    checkOut: 'June 8, 2025',
    nights: 3,
    guests: {
      adults: 2,
      children: 1,
      total: 3,
    },
    bookingDate: 'June 3, 2025',
    bookingTime: '02:45pm',
    paymentMethod: 'USSD',
    paymentDate: 'June 3, 2025',
    paymentTime: '02:45pm',
    subtotal: 135000,
    securityDeposit: 60000,
    serviceCharge: 13500,
    totalAmount: 208500,
  },
];

export {
  SAMPLE_DATA,
  Filter,
  bookingsData,
  cancelledBookingsData,
  completedBookingsData,
  upcomingBookingsData,
  paymentHistoryData,
  paymentHistoryDetailsData,
};
