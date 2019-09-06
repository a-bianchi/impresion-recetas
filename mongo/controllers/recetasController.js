import mongoose from 'mongoose';
import { addZerosRigth } from '../../app/utils/functions';

const Receta = mongoose.model('Receta');

type receta = {
  tramite: number,
  region: string,
  delegation: string,
  number: string,
  year: string,
  dni: string,
  name: string,
  lastname: string,
  type: string,
  state: string,
  entity: string,
  printed: boolean,
  delivered: boolean,
  time: Date
};

const allRecetas = () => {
  return Receta.find({})
    .sort({ time: 1 })
    .exec();
};

/* eslint-disable no-param-reassign */
const createRecetas = (data: receta) => {
  data.region = addZerosRigth(2, data.region);
  data.delegation = addZerosRigth(3, data.delegation);
  data.number = addZerosRigth(7, data.number);
  data.year = addZerosRigth(2, data.year);
  data.dni = addZerosRigth(8, data.dni);
  data.tramite = Number(
    `${data.region}${data.delegation}${data.number}${data.year}`
  );
  const newReceta = new Receta(data);
  return newReceta.save();
};
/* eslint-disable no-param-reassign */

const getByIdRecetas = id => {
  return Receta.findById(id).exec();
};

const updateRecetas = (id, data: receta) => {
  data.region = addZerosRigth(2, data.region);
  data.delegation = addZerosRigth(3, data.delegation);
  data.number = addZerosRigth(7, data.number);
  data.year = addZerosRigth(2, data.year);
  data.dni = addZerosRigth(8, data.dni);
  data.tramite = Number(
    `${data.region}${data.delegation}${data.number}${data.year}`
  );
  return Receta.findOneAndUpdate({ _id: id }, data, {
    new: true,
    useFindAndModify: false
  }).exec();
};

const deletaRecetas = id => {
  return Receta.findByIdAndRemove(id, { useFindAndModify: false }).exec();
};

export {
  allRecetas,
  createRecetas,
  getByIdRecetas,
  updateRecetas,
  deletaRecetas
};
