import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORTA

app.use(cors())
app.use(express.json())

// Se estiver atrás de proxy (Apache, Nginx, etc.), isso ajuda a pegar o IP correto
app.set('trust proxy', true)

// 🔹 Função pra verificar se o IP é da rede interna (ajuste pro seu caso)
function ipPermitido(ip) {
    // Quando vem IPv6 mapeado, costuma vir tipo ::ffff:192.168.0.10
    if (ip.startsWith('::ffff:')) {
        ip = ip.replace('::ffff:', '')
    }

    console.log('IP do cliente:', ip)

    // 👇 AJUSTE ESSAS FAIXAS PARA A SUA REDE
    const redesPermitidas = [
        // '192.168.0.',   // exemplo
        // '192.168.15.',   // exemplo
        // '10.0.',        // exemplo
        // '10.10.',        // outro exemplo
        '179.179.'
    ]

    return redesPermitidas.some(prefixo => ip.startsWith(prefixo))
}

// 🔹 Rota para verificar IP
app.get('/verificar', (req, res) => {
    let ip = req.ip
    console.log('IP: '+ip)
    if (ipPermitido(ip)) {
        return res.json({ permitido: true })
    } else {
        return res.json({ permitido: false })
    }
})

app.get('/', (req, res) => {
    console.log('Chegou aqui...')
    res.send('API online!')
})

import presenca from './routes/presenca.js'
app.use('/presenca', presenca)

app.listen(port, () => {console.log(`Servidor em http://localhost:${port}`)})