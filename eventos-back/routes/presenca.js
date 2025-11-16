import express from 'express';
import presenca from '../controllers/PresencaController.js'

const router = express.Router();

router.post('/registrar', presenca.salvar)
router.get('/atividades', presenca.atividades)
router.get('/atividade/:id', presenca.atividade)

export default router;