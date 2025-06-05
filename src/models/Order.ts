import mongoose from 'mongoose';
import { OrderType } from '../interfaces/Order';
import { coordinatesSchema } from './Coordinates';

const orderSchema = new mongoose.Schema<OrderType>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  droneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drone',
  },
  dateOrder: Date,
  status: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  deliveryCoordinates: coordinatesSchema,
  price: Number,
});

const Order = mongoose.model('Order', orderSchema);

export { Order };
