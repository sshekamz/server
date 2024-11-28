import express from 'express';
import { createUrl, deleteUrl, getAllUrl, getUrl } from '../controller/shortUrl';

const router = express.Router();

router.post('/shorturl', createUrl);
router.get('/shorturl', getAllUrl);
router.get('/shorturl/:id', getUrl);
router.delete('/shorturl/:id', deleteUrl);

export default router;