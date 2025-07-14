import { Document } from 'mongoose';

export type TicketStatus = 'active' | 'used';

export interface ITicket {
  id: string;
  status: TicketStatus;
  createdAt: Date;
  deactivatedAt?: Date;
}

export interface ITicketDocument extends ITicket, Document {}

export interface CreateTicketDTO {
  // No fields needed as tickets are auto-generated
}

export interface UpdateTicketStatusDTO {
  status: TicketStatus;
}

export interface TicketResponse {
  success: boolean;
  message: string;
  data?: ITicket | ITicket[];
  error?: string;
}