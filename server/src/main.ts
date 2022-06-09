import express from 'express';
import { connectToDataBase, disconnectFromDataBase } from './utils/database';
import cookieParser from 'cookie-parser';
import logger from './utils/logger';
import cors from 'cors';
import { CORS_ORIGIN } from './constants';
import helmet from 'helmet';
import userRoute from './modules/user/user.route';
import authRoute from './modules/auth/auth.route';
import videoRoute from './modules/videos/video.route';
import deserializeUser from './middleware/deserializeUser';
import 'dotenv/config';

// Initiate express & PORT

const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
    })
);
// Security
app.use(helmet());
app.use(deserializeUser);

// Supply  routes to express
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/videos', videoRoute);

// Server connection
const server = app.listen(PORT, async () => {
    await connectToDataBase();
    logger.info(`Server listening at http://localhost:${PORT}`);
});

const signals = ['SIGTERM', 'SIGINT'];

// Kill server when using Ctrl+C
function gracefulShutdown(signal: string) {
    process.on(signal, async () => {
        logger.info('Goodbye, got signal', signal);
        server.close();

        // disconnect from the db
        await disconnectFromDataBase();
        logger.info('My work here is done');

        process.exit(0);
    });
}
for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i]);
}
