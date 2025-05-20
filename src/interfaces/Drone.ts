import { coordinatesType } from '../types/coordinates';

interface DroneType {
  _id?: string;
  name: string;
  status: string;
  coordinates: coordinatesType;
}

export { DroneType };
