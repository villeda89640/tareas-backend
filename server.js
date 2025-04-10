const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb+srv://SYSDBA:1234@villeda.zofqxga.mongodb.net/tareasdb?retryWrites=true&w=majority&appName=VILLEDA', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

// Modelo de tarea
const tareaSchema = new mongoose.Schema({
  texto: String
 
});

const Tarea = mongoose.model('Tarea', tareaSchema);

// Rutas CRUD
app.get('/api/tareas', async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
});

app.post('/api/tareas', async (req, res) => {
  const nuevaTarea = new Tarea({ texto: req.body.texto });
  await nuevaTarea.save();
  res.json(nuevaTarea);
});

app.delete('/api/tareas/:id', async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
