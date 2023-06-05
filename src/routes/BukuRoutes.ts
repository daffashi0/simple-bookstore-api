import express from 'express';
import {
    createBuku,
    deleteBuku,
    getAllBuku,
    getBukuById,
    updateBukuById
} from '../controllers/BukuContoller';

const router = express.Router();

router.route('/').post(createBuku).get(getAllBuku)
router.route('/:id').delete(deleteBuku).get(getBukuById).patch(updateBukuById)

export default router;
