import { Router } from 'express';
import { getUserData, login, nuevoUsuario } from '../controllers/user.controller';
import validateToken from '../routes/validate-token';

const router = Router();

router.get('/:id',validateToken, getUserData);
router.post('/', nuevoUsuario);
router.post('/login', login);

export default router;