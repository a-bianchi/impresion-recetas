import mongoose from 'mongoose';

const Delegacion = mongoose.model('Delegacion');

const allDelegaciones = () => {
  return Delegacion.find({})
    .sort({ time: -1 })
    .exec();
};

const createDelegacion = data => {
  const newDelegacion = new Delegacion(data);
  return newDelegacion.save();
};

const getByIdDelegacion = id => {
  return Delegacion.findById(id).exec();
};

const updateDelegacion = (id, data) => {
  return Delegacion.findOneAndUpdate({ _id: id }, data, {
    new: true,
    useFindAndModify: false
  }).exec();
};

const deletaDelegacion = id => {
  return Delegacion.findByIdAndRemove(id, { useFindAndModify: false }).exec();
};

export {
  allDelegaciones,
  createDelegacion,
  getByIdDelegacion,
  updateDelegacion,
  deletaDelegacion
};
