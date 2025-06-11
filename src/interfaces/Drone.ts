import { coordinatesType } from '../types/coordinates';

interface DroneType {
  _id?: string;
  name: string;
  status: string; //available, waiting, ready, delivering, pending, returning
  coordinates: coordinatesType;
}

export { DroneType };
