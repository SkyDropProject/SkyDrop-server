import mongoose from 'mongoose';
import { coordinatesType } from '../types/coordinates';

const coordinatesSchema = new mongoose.Schema<coordinatesType>({
  x: Number,
  y: Number,
});

export { coordinatesSchema };
