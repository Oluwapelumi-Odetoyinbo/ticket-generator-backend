import { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service';
import { TicketResponse, TicketStatus } from '../types/ticket.types';

export class TicketController {
  private ticketService: TicketService;

  constructor() {
    this.ticketService = new TicketService();
  }

  /**
   * Create a new ticket
   * POST /api/tickets
   */
  createTicket = async (req: Request, res: Response): Promise<void> => {
    try {
      const ticket = await this.ticketService.createTicket();

      const response: TicketResponse = {
        success: true,
        message: 'Ticket created successfully',
        data: ticket,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Create ticket error:', error);
      
      const response: TicketResponse = {
        success: false,
        message: 'Failed to create ticket',
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      res.status(500).json(response);
    }
  };

  /**
   * Get all tickets
   * GET /api/tickets
   * Query params: status (optional)
   */
  getAllTickets = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.query;
      const validStatus = status && ['active', 'used'].includes(status as string) 
        ? (status as TicketStatus) 
        : undefined;

      const tickets = await this.ticketService.getAllTickets(validStatus);

      const response: TicketResponse = {
        success: true,
        message: 'Tickets retrieved successfully',
        data: tickets,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get tickets error:', error);
      
      const response: TicketResponse = {
        success: false,
        message: 'Failed to retrieve tickets',
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      res.status(500).json(response);
    }
  };

  /**
   * Get a specific ticket by ID
   * GET /api/tickets/:id
   */
  getTicketById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const ticket = await this.ticketService.getTicketById(id);

      if (!ticket) {
        const response: TicketResponse = {
          success: false,
          message: 'Ticket not found',
        };

        res.status(404).json(response);
        return;
      }

      const response: TicketResponse = {
        success: true,
        message: 'Ticket retrieved successfully',
        data: ticket,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get ticket error:', error);
      
      const response: TicketResponse = {
        success: false,
        message: 'Failed to retrieve ticket',
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      res.status(500).json(response);
    }
  };

  /**
   * Deactivate a ticket
   * PATCH /api/tickets/:id/deactivate
   */
  deactivateTicket = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const ticket = await this.ticketService.deactivateTicket(id);

      if (!ticket) {
        const response: TicketResponse = {
          success: false,
          message: 'Ticket not found',
        };

        res.status(404).json(response);
        return;
      }

      const response: TicketResponse = {
        success: true,
        message: 'Ticket deactivated successfully',
        data: ticket,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Deactivate ticket error:', error);
      
      const statusCode = error instanceof Error && error.message === 'Ticket is already used' ? 400 : 500;
      const response: TicketResponse = {
        success: false,
        message: 'Failed to deactivate ticket',
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      res.status(statusCode).json(response);
    }
  };

  /**
   * Get ticket statistics
   * GET /api/tickets/stats
   */
  getTicketStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await this.ticketService.getTicketStats();

      const response = {
        success: true,
        message: 'Ticket statistics retrieved successfully',
        data: stats,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Get stats error:', error);
      
      const response = {
        success: false,
        message: 'Failed to retrieve ticket statistics',
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      res.status(500).json(response);
    }
  };
}