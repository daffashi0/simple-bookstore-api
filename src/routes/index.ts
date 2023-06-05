import express from 'express';

import PenerbitRoutes from './PenerbitRoutes';
import BukuRoutes from './BukuRoutes';

const router = express.Router();

// Mount the routes on the new router
router.use('/penerbit', PenerbitRoutes);
router.use('/buku', BukuRoutes);

export default router;
