import express from 'express';

import EmployeeRoutes from './EmployeeRoutes';
import ShiftRoutes from './ShiftRoutes';
import AttendanceRoutes from './AttendanceRoutes';

const router = express.Router();

// Mount the routes on the new router
router.use('/employees', EmployeeRoutes);
router.use('/shifts', ShiftRoutes);
router.use('/attendance', AttendanceRoutes);

export default router;
