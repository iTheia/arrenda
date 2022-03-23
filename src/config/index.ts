import auth from './auth';
import cors from './cors';
import general from './general';
import database from './main.database';
import staticServe from './static.serve';
import upload from './uploads';
export * from './swagger';
export { validationSchema } from './validation.schema';

export default [auth, cors, general, database, staticServe, upload];
