import express from 'express'
const router = express.Router()

import usuario from '../controllers/UsuarioController.js'
import auth from "../helpers/auth.js";

router.post('/login', usuario.login)
router.get('/gerar/:senha', usuario.gerar)
router.post('/salvar', auth, usuario.salvar)

export default router