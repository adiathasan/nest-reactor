import { Algorithm } from 'jsonwebtoken';

export default () => ({
  bcrypt: {
    rounds: 10,
  },
  database: {
    uri: process.env.MONGO_CONNECTION_STRING,
  },
  jwt: {
    secret: 'CODE_WITH_ME',
    expiresIn: '1d', // setting a bit higher value for testing; should be very low (120s) for prod and high (7d) for refresh token instead
    algorithm: 'HS512' as Algorithm,
  },
});
