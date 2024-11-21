import { Router } from 'express';
import validateToken from '../routes/validate-token';
import { getRanking, getStatUser, updateStats } from '../controllers/stat.controller';

const router = Router();

router.get('/:id', validateToken, getStatUser);
router.get('/', getRanking);
router.post('/', validateToken, updateStats);

export default router;