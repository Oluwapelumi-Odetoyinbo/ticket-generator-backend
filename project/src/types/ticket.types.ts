import { Document } from 'mongoose';

export type TicketStatus = 'active' | 'used';

export interface ITicket {
  _id?: string;  // Changed from id to _id and made optional
  status: TicketStatus;
  createdAt: Date;
  deactivatedAt?: Date;
}

// Extend Document with ITicket as generic parameter
export interface ITicketDocument extends Document<unknown, any, ITicket> {
  status: TicketStatus;
  createdAt: Date;
  deactivatedAt?: Date;
}

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