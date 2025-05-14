import { MongoNetworkError, MongoServerSelectionError } from "mongodb";
import mongoose from "mongoose"; // add mongoose here to access MongooseError

function handleServerError(res, error, actionMessage) {
    console.log('network', error);

    const isNetworkError =
        error instanceof MongoNetworkError ||
        error.code === 'ECONNRESET' ||
        (error instanceof MongoServerSelectionError &&
            error.reason &&
            error.reason.name === 'MongoNetworkTimeoutError') ||
        (error instanceof mongoose.Error && error.message.includes('buffering timed out'));

    console.log('isNetworkError', isNetworkError);

    if (isNetworkError) {
        return res.status(503).send({
            success: false,
            message: "Internet connection error. Please reload the page.",
        });
    }

    return res.status(500).send({
        success: false,
        message: `Error in ${actionMessage}`,
        error,
    });
}

export default handleServerError;
