import { Ticket } from '../models/ticket.model';
import { ITicket, TicketStatus } from '../types/ticket.types';

export class TicketService {
  /**
   * Create a new ticket with active status
   */
  async createTicket(): Promise<ITicket> {
    try {
      const newTicket = new Ticket({
        status: 'active',
        createdAt: new Date(),
      });

      const savedTicket = await newTicket.save();
      return this.transformTicketDocument(savedTicket);
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new Error('Failed to create ticket');
    }
  }

  /**
   * Get all tickets with optional status filter
   */
  async getAllTickets(status?: TicketStatus): Promise<ITicket[]> {
    try {
      const filter = status ? { status } : {};
      const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
      
      return tickets.map(this.transformTicketDocument);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw new Error('Failed to fetch tickets');
    }
  }

  /**
   * Get a specific ticket by ID
   */
  async getTicketById(ticketId: string): Promise<ITicket | null> {
    try {
      const ticket = await Ticket.findOne({ id: ticketId });
      
      return ticket ? this.transformTicketDocument(ticket) : null;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw new Error('Failed to fetch ticket');
    }
  }

  /**
   * Deactivate a ticket (mark as used)
   */
  async deactivateTicket(ticketId: string): Promise<ITicket | null> {
    try {
      const ticket = await Ticket.findOne({ id: ticketId });

      if (!ticket) {
        return null;
      }

      if (ticket.status === 'used') {
        throw new Error('Ticket is already used');
      }

      ticket.status = 'used';
      ticket.deactivatedAt = new Date();

      const updatedTicket = await ticket.save();
      return this.transformTicketDocument(updatedTicket);
    } catch (error) {
      console.error('Error deactivating ticket:', error);
      throw error;
    }
  }

  /**
   * Get ticket statistics
   */
  async getTicketStats(): Promise<{
    total: number;
    active: number;
    used: number;
  }> {
    try {
      const [total, active, used] = await Promise.all([
        Ticket.countDocuments(),
        Ticket.countDocuments({ status: 'active' }),
        Ticket.countDocuments({ status: 'used' }),
      ]);

      return { total, active, used };
    } catch (error) {
      console.error('Error fetching ticket statistics:', error);
      throw new Error('Failed to fetch ticket statistics');
    }
  }

  /**
   * Transform Mongoose document to plain object
   */
  private transformTicketDocument(doc: any): ITicket {
    return {
      id: doc.id,
      status: doc.status,
      createdAt: doc.createdAt,
      deactivatedAt: doc.deactivatedAt,
    };
  }
}