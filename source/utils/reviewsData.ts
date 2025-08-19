export interface CustomerReview {
  text: string;
  rating: number;
  author: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    text: 'We offer unparalleled transparency in revenue collection processes. With detailed and real-time reporting, every transaction is documented and accessible.',
    rating: 5,
    author: 'Amori Ademakinwa',
  },
  {
    text: 'The property exceeded all expectations. Clean, spacious, and beautifully decorated. The host was very responsive and made our stay comfortable. Will definitely return next time.',
    rating: 4,
    author: 'John Thompson',
  },
  {
    text: 'Amazing location with great amenities nearby. The check-in process was smooth and the place was immaculate. Perfect for our family vacation.',
    rating: 3,
    author: 'Sarah Parker',
  },
  {
    text: 'The apartment was exactly as described, even better. Very comfortable and the location was perfect for exploring the city. The host provided excellent recommendations for local restaurants.',
    rating: 5,
    author: 'Michael Johnson',
  },
  {
    text: 'We had a wonderful stay at this property. The kitchen was well-equipped, the beds were comfortable, and the living area was spacious. Would highly recommend for families or groups.',
    rating: 4,
    author: 'Lisa Williams',
  },
  {
    text: 'Great value for money! The property was clean, spacious, and had all the amenities we needed. The host was very accommodating and responded quickly to our questions.',
    rating: 5,
    author: 'David Brown',
  },
];
