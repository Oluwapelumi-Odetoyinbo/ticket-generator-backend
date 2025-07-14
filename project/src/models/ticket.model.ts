import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ITicketDocument, TicketStatus } from '../types/ticket.types';

const ticketSchema = new Schema<ITicketDocument>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4(),
    },
    status: {
      type: String,
      enum: ['active', 'used'] as TicketStatus[],
      default: 'active',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    deactivatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: false, // We're handling timestamps manually
    versionKey: false,
  }
);

// Index for better query performance
ticketSchema.index({ id: 1 });
ticketSchema.index({ status: 1 });
ticketSchema.index({ createdAt: -1 });

// Transform output to match our interface
ticketSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  },
});

export const Ticket = model<ITicketDocument>('Ticket', ticketSchema);