const express = require('express');
const healthController = require('../controllers/health');
const notesRouter = require('./notes');

const router = express.Router();

// Health endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

// Notes routes
router.use('/notes', notesRouter);

// Seed route for basic verification
router.post('/seed', (req, res) => {
  /**
   * Provides a basic dataset for quick manual verification.
   * Note: This is for demo purposes and will overwrite existing in-memory notes.
   */
  const store = require('../store/memoryStore');
  store.reset([
    { title: 'Welcome', content: 'Your first note' },
    { title: 'Second', content: 'Another note' },
  ]);
  return res.status(201).json({ message: 'Seeded 2 notes', count: store.getAll().length });
});

module.exports = router;
