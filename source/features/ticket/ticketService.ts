// frontend/src/features/ticket/ticketService.ts
import { BASE_URL } from '../api/baseApi';

export interface CreateTicketData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source?: 'website' | 'email' | 'phone' | 'admin';
}

export interface Ticket {
  _id: string;
  ticketId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string | null;
  notes: Array<{
    message: string;
    addedBy: string;
    createdAt: string;
  }>;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketResponse {
  success: boolean;
  message: string;
  data: {
    ticket: Ticket;
    ticketId: string;
  };
}

// Create new ticket using fetch API directly (public endpoint)
export const createTicket = async (ticketData: CreateTicketData): Promise<CreateTicketResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create ticket');
    }
    
    return data;
  } catch (error: any) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};