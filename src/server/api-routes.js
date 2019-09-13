const mongo = require("mongodb").MongoClient;
const router = require("express").Router();

mongo.connect("mongodb://dev:dev@mongo:27017/admin", (err, client) => {
    const db = client.db("trouvkash");
    const terminals = db.collection("terminals");
    const banks = db.collection("banks");

    router.get("/", (req, res) => {
        res.json({
            status: "API is working",
            message: "Welcome to TrouvKach",
        });
    });

    router.get("/banks", (req, res) => {
        res.send(
            banks.find().toArray((err, items) => {
                console.log(items);
            }),
        );
    });
    router.get("/terminals", (req, res) => {
        res.send(
            terminals.find().toArray((err, items) => {
                console.log(items);
            }),
        );
    });
});
module.exports = router;
