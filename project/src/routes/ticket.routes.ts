import { Router } from 'express';
import { TicketController } from '../controllers/ticket.controller';

const router = Router();
const ticketController = new TicketController();

/**
 * @route   POST /api/tickets
 * @desc    Create a new ticket
 * @access  Public
 */
router.post('/', ticketController.createTicket);

/**
 * @route   GET /api/tickets
 * @desc    Get all tickets (with optional status filter)
 * @access  Public
 * @query   status - Filter by ticket status ('active' or 'used')
 */
router.get('/', ticketController.getAllTickets);

/**
 * @route   GET /api/tickets/stats
 * @desc    Get ticket statistics
 * @access  Public
 */
router.get('/stats', ticketController.getTicketStats);

/**
 * @route   GET /api/tickets/:id
 * @desc    Get a specific ticket by ID
 * @access  Public
 */
router.get('/:id', ticketController.getTicketById);

/**
 * @route   PATCH /api/tickets/:id/deactivate
 * @desc    Deactivate a ticket (mark as used)
 * @access  Public
 */
router.patch('/:id/deactivate', ticketController.deactivateTicket);

export default router;