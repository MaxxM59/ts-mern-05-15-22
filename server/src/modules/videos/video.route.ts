import express from 'express';
import requireUser from '../../middleware/requireUser';
import {findVIdeosHandler, streamVideoHandler, updateVideoHandler, uploadVideoHandler} from './video.controller';

const router = express.Router();

router.post('/', requireUser, uploadVideoHandler);

router.patch('/:videoId', requireUser, updateVideoHandler);

router.get('/', findVIdeosHandler);
router.get('/:videoId', streamVideoHandler);

export default router;
