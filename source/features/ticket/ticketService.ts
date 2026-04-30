import { supabase } from '@/lib/supabase';

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

export const createTicket = async (ticketData: CreateTicketData): Promise<CreateTicketResponse> => {
  const { data, error } = await supabase
    .from('tickets')
    .insert({
      first_name: ticketData.firstName,
      last_name: ticketData.lastName ?? '',
      email: ticketData.email,
      phone: ticketData.phone ?? '',
      subject: ticketData.subject,
      message: ticketData.message,
      source: ticketData.source ?? 'website',
      status: 'pending',
      priority: 'medium',
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);

  const ticket: Ticket = {
    _id: data.id,
    ticketId: data.ticket_id ?? data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    phone: data.phone ?? '',
    subject: data.subject,
    message: data.message,
    status: data.status,
    priority: data.priority,
    assignedTo: data.assigned_to ?? null,
    notes: data.notes ?? [],
    source: data.source,
    createdAt: data.created_at,
    updatedAt: data.updated_at ?? data.created_at,
  };

  return {
    success: true,
    message: 'Ticket created successfully',
    data: { ticket, ticketId: ticket.ticketId },
  };
};
