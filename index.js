import express from 'express';
import mongoose from 'mongoose';
import Persona from './models/persona.model.js';

const app = express();
app.use(express.json());


app.listen(3000, () => {
    console.log('Server running on port 3000');
}); 

mongoose.connect("mongodb+srv://julioyangali:nqpukG3HRocSHki9@cluster0.nxutp.mongodb.net/personas?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {console.log("Conexion a la base de datos exitosa")

    }).catch((error) => {console.log(error)})



// CREAR UN REGISTRO

app.post('/personas', async(req, res) => {
    try {
        const persona = await Persona.create(req.body);
        res.status(200).json(persona);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


// Listar todos los registros

app.get('/personas', async(req, res) => {
    try {

        const { edad, region } = req.query;
        let filtro = {};

        if (edad) filtro.edad = Number(edad); 
        if (region) filtro.region = region;

        const personas = await Persona.find(filtro);
        res.status(200).json(personas);
    } catch (error) {
        res.status(500).json({error: error.message}); 
    }
});

//LISTAR UN REGISTRO POR ID

app.get('/personas/:id', async(req, res) => {
    try {
        const {id}=req.params;
        const persona = await Persona.findById(id);
        res.status(200).json(persona);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Actualizar una persona

app.put('/personas/:id', async(req, res) => {

    try {
        const {id}=req.params;
        const persona = await Persona.findByIdAndUpdate(id, req.body, {new: true});
        if (!persona) {
            return res.status(404).json({error: 'Persona no encontrada'});
        }
        const personaActualizada=await Persona.findById(id);
        res.status(200).json(personaActualizada);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//ELIMINAR UN REGISTRO

app.delete('/personas/:id', async(req, res) => {
    try {
        const {id}=req.params;
        const persona = await Persona.findByIdAndDelete(id);
        if (!persona) {
            return res.status(404).json({error: 'Persona no encontrada'});
        }
        res.status(200).json({message: 'Registro eliminado'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

