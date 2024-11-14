import { Router } from 'express';
import { getUser, getUserData, login, nuevoUsuario } from '../controllers/user.controller';
import validateToken from '../routes/validate-token';
import { getStatUser, updateStats } from '../controllers/stat.controller';

const router = Router();

router.get('/:id', validateToken, getStatUser);
router.post('/', validateToken, updateStats);

export default router;