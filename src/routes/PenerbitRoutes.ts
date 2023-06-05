import express from 'express';
import {
    createPenerbit,
    deletePenerbit,
    getAllPenerbit,
    getPenerbitById,
    updatePenerbitById
} from '../controllers/PenerbitController';

const router = express.Router();

router.route('/').post(createPenerbit).get(getAllPenerbit)
router.route('/:id').delete(deletePenerbit).get(getPenerbitById).patch(updatePenerbitById)

export default router;
