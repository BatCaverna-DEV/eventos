import express from 'express'
const router = express.Router()
import atividade from '../controllers/AtividadeController.js'
import auth from "../helpers/auth.js";

router.get('/', auth, atividade.index)
router.get('/abrir/:id', auth, atividade.abrir)
router.get('/fechar/:id', auth, atividade.fechar)
router.get('/encerrar/:id', auth, atividade.encerrar)
router.get('/get/:id', auth, atividade.encerrar)

export default router