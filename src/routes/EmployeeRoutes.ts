import express from 'express';
import {
    getEmployees, 
    getEmployeeById, 
    createEmployee, 
    login,
    getListPoint, 
    getShiftByEmployeeId,
    getTodayShiftByEmployeeId, 
    getEmployeeReportShift,
} from '../controllers/EmployeeController';
import { authenticateToken, hashPassword } from '../middlewares/auth';

const router = express.Router();

router.get('/shiftreport', authenticateToken, getEmployeeReportShift);
router.get('/todayshift', authenticateToken, getTodayShiftByEmployeeId);
router.get('/shift', authenticateToken, getShiftByEmployeeId);
router.get('/allpoints', authenticateToken, getListPoint);
router.get('/:id', authenticateToken, getEmployeeById);
router.post('/login', login);

router.route('/').get(authenticateToken, getEmployees).post(hashPassword ,createEmployee);

export default router;
