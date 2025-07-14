import app from './app';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log('=================================');
      console.log('🎫 Digital Ticket System API');
      console.log('=================================');
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log('=================================');
      console.log('Available endpoints:');
      console.log(`POST   http://localhost:${PORT}/api/tickets`);
      console.log(`GET    http://localhost:${PORT}/api/tickets`);
      console.log(`GET    http://localhost:${PORT}/api/tickets/stats`);
      console.log(`GET    http://localhost:${PORT}/api/tickets/:id`);
      console.log(`PATCH  http://localhost:${PORT}/api/tickets/:id/deactivate`);
      console.log('=================================');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();