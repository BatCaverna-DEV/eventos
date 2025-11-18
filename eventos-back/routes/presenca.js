import express from 'express';
import presenca from '../controllers/PresencaController.js'
import auth from "../helpers/auth.js";

const router = express.Router();

router.post('/registrar', presenca.salvar)
router.get('/atividades', presenca.atividades)
router.get('/atividade/:id', presenca.atividade)
router.get('/', auth, presenca.index)

export default router;