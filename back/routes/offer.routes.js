import express from 'express';
import { publishOffer, getActiveOffers, getOfferById, buyOffer } from '../controllers/offer.controller.js';
import { authenticate } from '../middleware/auth.midleware.js';

const router = express.Router();
// Public route to get active offers 
router.get('/active', getActiveOffers);
// Public route to get offer by ID
router.get('/:id', getOfferById);
// Protected route to publish a new offer
router.post('/', authenticate, publishOffer);
// Protected route to buy an offer
router.post('/:id/buy', authenticate, buyOffer);

export default router;
