import express from 'express';
import { authenticateToken } from '../middlewares/auth';
import { attendShift, endShift } from '../controllers/AttendanceContoller';

const router = express.Router();

router.post('/attend', authenticateToken, attendShift);
router.post('/end', authenticateToken, endShift);

export default router;
