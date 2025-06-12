// scripts/insertAdminUser.ts
import mongoose from 'mongoose';
import { User } from '../src/models/User';

const mongoUri = 'mongodb://skydrop:ulysseetchatgptnefontq1@127.0.0.1:27018/';

async function insertAdminUser() {
  await mongoose.connect(mongoUri);

  const adminUser = new User({
    email: 'admin@example.com',
    password: 'admin',
    firstName: 'admin',
    lastName: 'admin',
    isAdmin: true,
    registrationDate: new Date(),
  });

  await adminUser.save();
  console.log('Utilisateur admin créé');
  await mongoose.disconnect();
}

insertAdminUser().catch(console.error);
