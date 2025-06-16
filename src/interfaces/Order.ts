import { coordinatesType } from '../types/coordinates';
import { DroneType } from './Drone';
import { ProductType } from './Product';
import { UserType } from './User';

interface OrderType {
  _id?: string;
  userId: UserType | string;
  droneId: DroneType | string;
  dateOrder: Date;
  status: string; //pending, created, cancelled, completed, there is other status ?
  products: Array<ProductType>;
  deliveryCoordinates: coordinatesType;
  price: number;
}

export { OrderType };
