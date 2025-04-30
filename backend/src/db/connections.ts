import {connect,disconnect} from "mongoose";
async function connectToDb() {

    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error);
        throw new Error("Smomething went wrong. Can not connect to MongoDb")
    }

}

async function disconnectFromDb() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Smomething went wrong. Can not connect to MongoDb")
    }
}

export {connectToDb, disconnectFromDb}