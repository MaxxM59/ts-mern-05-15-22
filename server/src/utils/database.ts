import mongoose from 'mongoose';
import logger from './logger';
import 'dotenv/config';
//const DATABASE_STRING =
// 'mongodb+srv://MaxMGZ:Akpaertoe2022@cluster0.murhl.mongodb.net/youtube-clone?retryWrites=true&w=majority';

// Using local mongoDb -> Check to make remote mongoDb work
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

export async function connectToDataBase ()
{
    try
    {
        await mongoose.connect(CONNECTION_STRING);
        logger.info('Connected to database');
    } catch (e)
    {
        logger.error(e, 'Failed to connect to database');
        process.exit(1);
    }
}
export async function disconnectFromDataBase ()
{
    await mongoose.connection.close();
    logger.info('Disconnected from database');
}
