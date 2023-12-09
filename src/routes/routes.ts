import express from 'express';

const router = express.Router();
const app = express();

import usersRoute from './users.route';
import statusRoute from './status.route';
import weatherRoute from './weather.route';
import filesRoute from './files.route';
import documentsRoute from './documents.route';
import devicesRoute from './devices.route';


router.use(usersRoute);
router.use(statusRoute);
router.use(weatherRoute);
router.use(filesRoute);
router.use(documentsRoute);
router.use(devicesRoute);


export default router;