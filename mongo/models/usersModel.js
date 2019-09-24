import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: [150, 'No ingresar más de 150 caracteres'],
    minlength: [2, 'No ingresar más de 2 caracteres'],
    index: true,
    uppercase: true,
    required: [true, 'Nombre es requerido']
  },
  password: {
    type: String,
    maxlength: [150, 'No ingresar más de 150 caracteres'],
    minlength: [2, 'No ingresar más de 2 caracteres'],
    required: [true, 'Password es requerido']
  },
  region: {
    type: String,
    maxlength: [2, 'No ingresar más de 2 caracteres'],
    minlength: [2, 'No ingresar más de 2 caracteres'],
    index: true,
    required: [true, 'Region es requerida']
  },
  delegation: {
    type: String,
    maxlength: [3, 'No ingresar más de 3 caracteres'],
    minlength: [3, 'No ingresar más de 3 caracteres'],
    index: true,
    required: [true, 'Delegación es requerida']
  },
  folder: {
    type: String
  },
  time: {
    type: Date,
    default: Date.now,
    required: [true, 'Time es requerido'],
    index: true
  }
});

export default mongoose.model('User', userSchema);
