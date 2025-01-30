import express from 'express';
import {handlePaytrCallback, requestPaytrToken} from '../controllers/paytrController.js';

const paytrRouter = express.Router();

paytrRouter.post('/get-token', requestPaytrToken);
paytrRouter.post('/callback', handlePaytrCallback);

export default paytrRouter