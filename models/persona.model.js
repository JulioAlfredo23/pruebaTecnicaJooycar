import mongoose from "mongoose";

const personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxlength: [30, "El nombre no puede tener más de 30 caracteres"]

    },
    apellido: {
        type: String,
        required: true,
        maxlength: [30, "El nombre no puede tener más de 30 caracteres"]

    },
    genero: {
        type: String,
        required: true,
        enum: ["masculino", "femenino", "prefiero no especificar"]

    },
    telefono: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{9}$/.test(v); // Expresión regular para exactamente 9 dígitos
            },
            message: props => `${props.value} no es un número de teléfono válido. Debe tener 9 dígitos.`
        }
    },
    edad: {
        type: Number,
        required: true,
        min: [0, "La edad no puede ser menos de 0"],
        max: [99, "La edad debe ser menor a 100"]

    },
    region: {
        type: String,
        required: true,
        maxlength: [30, "El nombre no puede tener más de 30 caracteres"]

    }
},{timestamps: true});

const Persona = mongoose.model("Persona", personaSchema);

export default Persona;


