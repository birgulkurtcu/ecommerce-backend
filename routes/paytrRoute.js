import express from 'express';
import {handlePaytrCallback, requestPaytrToken} from '../controllers/paytrController.js';

const router = express.Router();

router.post('/get-token', requestPaytrToken);
router.post('/callback', handlePaytrCallback);

export default router;
