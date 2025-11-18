import Atividade from '../models/Atividade.js';
import Presenca from '../models/Presenca.js';
import Usuario from '../models/Usuario.js';

await Atividade.sync()
await Presenca.sync()
await Usuario.sync()