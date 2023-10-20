import express from 'express';
import agencyController from './controllers/agencyController.js';
import mainController from './controllers/mainController.js';

const router = express.Router();

router.get('/', agencyController.list);
router.get('/agence/creer', agencyController.add);
router.get('/agence/:id', agencyController.detail);

router.use(mainController.notFound);

export default router;