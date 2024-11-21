import { Router } from 'express';
import { getUserData, login, nuevoUsuario, updateUser } from '../controllers/user.controller';
import validateToken from '../routes/validate-token';

const router = Router();

router.get('/:id',validateToken, getUserData);
router.post('/', nuevoUsuario);
router.post('/login', login);
router.put('/:id',validateToken, updateUser);

export default router;