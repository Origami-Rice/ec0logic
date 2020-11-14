// This file is borrowed from the existing code our partner provided us with
// and has been very slightly modified for our current use.
const MongoClient = require('mongodb').MongoClient;
// const fs = require('fs');
// const path = require('path');
// const config_param = fs.readFileSync(path.resolve(__dirname, "../config.json"), 'utf-8');
// const configJson = JSON.parse(config_param);
// const mongodbUrl = `mongodb+srv://${configJson.mongo.user}:${configJson.mongo.password}@cluster0-oslmy.mongodb.net/test?retryWrites=true&w=majority`;
const mongodbUrl = 'mongodb+srv://ec0logic:ecologic@inventory.v2ubb.mongodb.net/inventory?retryWrites=true&w=majority';

const connectMongo = () => new Promise(async (resolve, reject) => {
    try {
        resolve(await MongoClient.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true}));
    } catch (err) {
        reject(err);
    }
});
exports.executeQuery = async (dbName, callbackPromise) => {
    try {
        const client = await connectMongo();
        let result;
        try {
            const db = client.db(dbName);
            result = await callbackPromise(db);
        } catch (err) {
            console.error(err);
        }
        client.close();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
};