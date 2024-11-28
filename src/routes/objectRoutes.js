import express from 'express';
import { searchObjects } from '../controllers/objectController.js';

const router = express.Router();

router.post('/search', searchObjects);

export default router;
