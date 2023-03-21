import mongoose from "mongoose";
import { config } from "@root/config";
import Logger from "bunyan";
import { redisConnection } from "@service/redis/base.connection";

const log: Logger = config.createLogger('database');

export default() => {
    const connect = () => {
        mongoose.connect(`${config.DATABASE_URL}`)
        .then(() => {
            log.info('Successfully connected to database.')
            redisConnection.connect();
        })
        .catch((error) => {
            log.error('Error connecting to database', error);
            return process.exit(0);
        })
    }
    connect();

    mongoose.connection.on("disconnect", connect);
}
