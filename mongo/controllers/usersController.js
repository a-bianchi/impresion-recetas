/* eslint-disable no-param-reassign */
// @flow
import mongoose from 'mongoose';
// import { encrypt } from '../../app/utils/crypter';
import { addZerosRigth } from '../../app/utils/functions';

const User = mongoose.model('User');

type user = {
  name: string,
  password: string,
  region: string,
  delegation: string,
  folder: string,
  puppeteerfolder: string,
  time: Date
};

const allUsers = () => {
  return User.find({})
    .sort({ time: -1 })
    .exec();
};

const oneUsers = () => {
  return User.find({})
    .sort({ time: -1 })
    .limit(1)
    .exec();
};

const lastUsers = () => {
  return User.find({})
    .sort({ time: 1 })
    .limit(1)
    .exec();
};

const createUsers = (data: user) => {
  // data.password = encrypt(data.password);
  data.region = addZerosRigth(2, data.region);
  data.delegation = addZerosRigth(3, data.delegation);
  const newUser = new User(data);
  return newUser.save();
};

const getByIdUsers = id => {
  return User.findById(id).exec();
};

const updateUsers = (id, data: user) => {
  // if (data.password) data.password = encrypt(data.password);
  data.region = addZerosRigth(2, data.region);
  data.delegation = addZerosRigth(3, data.delegation);
  return User.findOneAndUpdate({ _id: id }, data, {
    new: true,
    useFindAndModify: false
  }).exec();
};

const deletUsers = id => {
  return User.findByIdAndRemove(id, { useFindAndModify: false }).exec();
};

const deletAllUsers = () => {
  return User.deleteMany({}).exec();
};

export {
  allUsers,
  oneUsers,
  createUsers,
  getByIdUsers,
  updateUsers,
  deletUsers,
  deletAllUsers,
  lastUsers
};
