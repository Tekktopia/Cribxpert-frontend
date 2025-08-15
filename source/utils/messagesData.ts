interface message {
  id: string;
  avatarUrl: string;
  name: string;
  subject: string;
  date: string;
  messages: Array<{
    sender: string;
    text: string;
    time: string;
    isMe?: boolean;
  }>;
}

const messages: message[] = [
  {
    id: '1',
    avatarUrl: '/images/Makinwaa.png',
    name: 'Makinwaa',
    subject: 'Makinwaa’s Cottage Inquiry',
    date: '2 hrs ago',
    messages: [
      {
        sender: 'Makinwaa',
        text: 'Hi, I would like to know more about the cottage amenities and availability for next month.',
        time: '2 hrs ago',
      },
      {
        sender: 'Recipient',
        text: 'Hello Makinwaa, the cottage has a pool, a garden, and is available next month.',
        time: '1 hr ago',
        isMe: true,
      },
      {
        sender: 'Makinwaa',
        text: 'That sounds great. Can I book a viewing?',
        time: '45 mins ago',
      },
      {
        sender: 'Recipient',
        text: 'Sure, let me know your preferred date and time.',
        time: '30 mins ago',
        isMe: true,
      },
    ],
  },
  {
    id: '2',
    avatarUrl: '/authsidepane1.png',
    name: 'Olamide',
    subject: 'Olamide’s Flat Inquiry',
    date: '3 hrs ago',
    messages: [
      {
        sender: 'Olamide',
        text: 'Is the flat pet-friendly and what is the cancellation policy?',
        time: '3 hrs ago',
      },
      {
        sender: 'Recipient',
        text: 'Yes, the flat is pet-friendly. You can cancel up to 24 hours before check-in for a full refund.',
        time: '2 hrs ago',
        isMe: true,
      },
      {
        sender: 'Olamide',
        text: 'Thank you, that’s perfect. Can I bring two dogs?',
        time: '1 hr ago',
      },
      {
        sender: 'Recipient',
        text: 'Yes, that won’t be a problem.',
        time: '45 mins ago',
        isMe: true,
      },
    ],
  },
  {
    id: '3',
    avatarUrl: '/authsidepane2.png',
    name: 'Ade',
    subject: 'Ade’s House Inquiry',
    date: '4 hrs ago',
    messages: [
      {
        sender: 'Ade',
        text: 'Can I schedule a viewing for the house this weekend?',
        time: '4 hrs ago',
      },
      {
        sender: 'Recipient',
        text: 'Yes, we are available for viewings on Saturday and Sunday.',
        time: '3 hrs ago',
        isMe: true,
      },
      {
        sender: 'Ade',
        text: 'Great, Saturday works for me. What time?',
        time: '2 hrs ago',
      },
      {
        sender: 'Recipient',
        text: 'How about 10 AM?',
        time: '1 hr ago',
        isMe: true,
      },
    ],
  },
  {
    id: '4',
    avatarUrl: '/authsidepane3.png',
    name: 'Dami',
    subject: 'Dami’s Villa Inquiry',
    date: '5 hrs ago',
    messages: [
      {
        sender: 'Ade',
        text: 'Can I schedule a viewing for the house this weekend?',
        time: '4 hrs ago',
      },
      {
        sender: 'Recipient',
        text: 'Yes, we are available for viewings on Saturday and Sunday.',
        time: '3 hrs ago',
        isMe: true,
      },
      {
        sender: 'Ade',
        text: 'Great, Saturday works for me. What time?',
        time: '2 hrs ago',
      },
      {
        sender: 'Recipient',
        text: 'How about 10 AM?',
        time: '1 hr ago',
        isMe: true,
      },
    ],
  },
  {
    id: '5',
    avatarUrl: '/images/Makinwaa.png',
    name: 'Makinwaa',
    subject: 'Makinwaa’s Flat Inquiry',
    date: '2 hrs ago',
    messages: [
      {
        sender: 'Makinwaa',
        text: 'Hi, I would like to know more about the flat amenities and availability for next month.',
        time: '2 hrs ago',
      },
      {
        sender: 'Recipient',
        text: 'Hello Makinwaa, the flat has a pool, a garden, and is available next month.',
        time: '1 hr ago',
        isMe: true,
      },
      {
        sender: 'Makinwaa',
        text: 'That sounds great. Can I book a viewing?',
        time: '45 mins ago',
      },
      {
        sender: 'Recipient',
        text: 'Sure, let me know your preferred date and time.',
        time: '30 mins ago',
        isMe: true,
      },
    ],
  },
  {
    id: '6',
    avatarUrl: '/authsidepane1.png',
    name: 'Olamide',
    subject: 'Olamide’s House Inquiry',
    date: '3 hrs ago',
    messages: [
      {
        sender: 'Olamide',
        text: 'Is the house pet-friendly and what is the cancellation policy?',
        time: '3 hrs ago',
      },
      {
        sender: 'Recipient',
        text: 'Yes, the house is pet-friendly. You can cancel up to 24 hours before check-in for a full refund.',
        time: '2 hrs ago',
        isMe: true,
      },
      {
        sender: 'Olamide',
        text: 'Thank you, that’s perfect. Can I bring two dogs?',
        time: '1 hr ago',
      },
      {
        sender: 'Recipient',
        text: 'Yes, that won’t be a problem.',
        time: '45 mins ago',
        isMe: true,
      },
    ],
  },
  {
    id: '7',
    avatarUrl: '/authsidepane2.png',
    name: 'Ade',
    subject: 'Ade’s Cottage Inquiry',
    date: '4 hrs ago',
    messages: [
      {
        sender: 'Ade',
        text: 'Can I schedule a viewing for the cottage this weekend?',
        time: '4 hrs ago',
      },
      {
        sender: 'Recipient',
        text: 'Yes, we are available for viewings on Saturday and Sunday.',
        time: '3 hrs ago',
        isMe: true,
      },
      {
        sender: 'Ade',
        text: 'Great, Saturday works for me. What time?',
        time: '2 hrs ago',
      },
      {
        sender: 'Recipient',
        text: 'How about 10 AM?',
        time: '1 hr ago',
        isMe: true,
      },
    ],
  },
];

export default messages;
