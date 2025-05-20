import mongoose from 'mongoose';
import { DroneType } from '../interfaces/Drone';
import { coordinatesSchema } from './Coordinates';

const droneSchema = new mongoose.Schema<DroneType>({
  name: String,
  status: String,
  coordinates: coordinatesSchema,
});

let Drone = mongoose.model('Drone', droneSchema);

export { Drone };
