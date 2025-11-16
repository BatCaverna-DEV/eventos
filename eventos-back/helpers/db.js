import Atividade from '../models/Atividade.js';
import Presenca from '../models/Presenca.js';

await Atividade.sync()
await Presenca.sync()