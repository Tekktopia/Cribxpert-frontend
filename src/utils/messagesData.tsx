export interface Message {
  id: string;
  avatarUrl: string;
  name: string;
  subject: string;
  date: string;
  unread?: boolean;
  messages: Array<{
    sender: string;
    text: string;
    time: string;
    isMe?: boolean;
  }>;
}

// Sample messages data that matches the UI in the image
const messages: Message[] = [
  {
    id: '1',
    avatarUrl: '/images/Makinwaa.png',
    name: 'James Mordi',
    subject: "Makinwa's Cottage Inquiry",
    date: 'Jan 20, 2025',
    unread: true,
    messages: [
      {
        sender: 'James',
        text: 'Hi Susan, thank you for reaching out! Yes, the villa is available for those dates. The total cost will be NGN 280,000 for 3 nights. Let me know if you would like to proceed.',
        time: '10:30',
        isMe: false,
      },
      {
        sender: 'You',
        text: "Hi, I'm interested in booking your cottage from Feb 10th to Feb 13th. Is it available?",
        time: '10:48',
        isMe: true,
      },
      {
        sender: 'You',
        text: 'Please let me know how to proceed with the reservation.',
        time: '10:48',
        isMe: true,
      },
    ],
  },
  {
    id: '2',
    avatarUrl: '/images/Makinwaa.png',
    name: 'James Mordi',
    subject: "Makinwa's Cottage Inquiry",
    date: 'Jan 20, 2025',
    unread: false,
    messages: [
      {
        sender: 'James',
        text: 'Hello there! How can I help you today?',
        time: '9:30',
        isMe: false,
      },
    ],
  },
  {
    id: '3',
    avatarUrl: '/images/Makinwaa.png',
    name: 'James Mordi',
    subject: "Makinwa's Cottage Inquiry",
    date: 'Jan 20, 2025',
    unread: false,
    messages: [
      {
        sender: 'James',
        text: 'Thank you for your interest!',
        time: '11:15',
        isMe: false,
      },
    ],
  },
  {
    id: '4',
    avatarUrl: '/images/Makinwaa.png',
    name: 'James Mordi',
    subject: "Makinwa's Cottage Inquiry",
    date: 'Jan 20, 2025',
    unread: false,
    messages: [
      {
        sender: 'James',
        text: 'Let me check availability for you.',
        time: '14:22',
        isMe: false,
      },
    ],
  },
  {
    id: '5',
    avatarUrl: '/images/Makinwaa.png',
    name: 'James Mordi',
    subject: "Makinwa's Cottage Inquiry",
    date: 'Jan 20, 2025',
    unread: false,
    messages: [
      {
        sender: 'James',
        text: 'We look forward to hosting you!',
        time: '16:45',
        isMe: false,
      },
    ],
  },
  {
    id: '6',
    avatarUrl: '/images/Makinwaa.png',
    name: 'James Mordi',
    subject: "Makinwa's Cottage Inquiry",
    date: 'Jan 20, 2025',
    unread: false,
    messages: [
      {
        sender: 'James',
        text: "Is there anything else you'd like to know about the property?",
        time: '18:10',
        isMe: false,
      },
    ],
  },
  {
    id: '7',
    avatarUrl: '/images/Makinwaa.png',
    name: 'James Mordi',
    subject: "Makinwa's Cottage Inquiry",
    date: 'Jan 20, 2025',
    unread: false,
    messages: [
      {
        sender: 'James',
        text: 'Please let me know if you have any questions.',
        time: '20:05',
        isMe: false,
      },
    ],
  },
];

export default messages;
