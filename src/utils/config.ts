import { configType } from '../types/config';

const config: configType = {
  PORT: 3001,
  mongoPath: 'mongodb://skydrop:ulysseetchatgptnefontq1@127.0.0.1:27018/',
  jwtSecret:
    '4bf9e7f70ab61a756c761443d5c3dc696643134af6151dc5e96bdf550ab91e0c9d5b90220e387e40387fc7dc6b446ab15b2677c6fbee2e8ecffba77c3445760dc140d805314ecdcd5db1fdaec75fc7c52fec0af549b30c4c671f8e70b92f797489b1b944748f4451ce4d10abab620edf7f00fe2c49f7986b3a94246f863d1dbb99da7cef99635131606931541bcf242aab3eaba387e93e7434f92336810adf597cd4ff2dbbcc6467a44a79129a26ea022f7aa9a480c78f4624cf0264f7fbc1af0b1374ffc7de6d1e12d6163223b60e18532d2ff382211466774892feea6175956810d9c38633c8dcfc0143fe464ec7f5befb0f0975d859b0152c3d0e201f565f',
  jwtSession: {
    session: false,
  },
  saltRounds: 10,
  uploadPath: 'public/uploads',
};

export { config };
