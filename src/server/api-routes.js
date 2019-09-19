const mongo = require("mongodb").MongoClient;
const router = require("express").Router();

mongo.connect(
    "mongodb+srv://spicegirls:DaY4eiytXV7ggqM@trouvkashdb-o39gw.gcp.mongodb.net/test?retryWrites=true&w=majorityCopy",
    (err, client) => {
        if (err) {
            console.error("An error occurred connecting to MongoDB: ", err);
        } else {
            const db = client.db("trouvkash");
            const terminals = db.collection("terminals");
            const banks = db.collection("banks");

            router.get("/", (req, res) => {
                res.json({
                    status: "All good",
                    message: "Welcome on TrouvKash",
                });
            });

            router.get("/banks", (req, res) => {
                res.send(
                    banks.find().toArray((err1, items) => {
                        // eslint-disable-next-line no-console
                        console.log(err1, items);
                    }),
                );
            });

            router.get("/banks/:name", (req, res) => {
                res.send(
                    banks
                        .find({name: req.params.name})
                        .toArray((err2, item) => {
                            // eslint-disable-next-line no-console
                            console.log(err2, item);
                        }),
                );
            });

            router.get("/terminals", (req, res) => {
                res.send(
                    terminals.find().toArray((err3, items) => {
                        // eslint-disable-next-line no-console
                        console.log(err3, items);
                    }),
                );
            });

            router.get("/terminals/:latitude/:longitude", (req, res) => {
                res.send(
                    terminals
                        .find({
                            latitude: Number(req.params.latitude),
                            longitude: Number(req.params.longitude),
                        })
                        .toArray((err4, item) => {
                            // eslint-disable-next-line no-console
                            console.log(err4, item);
                        }),
                );
            });

            router.get("/:latitude/:longitude", (req, res) => {
                terminals
                    .aggregate([
                        {
                            $match: {
                                latitude: {
                                    $gte: Number(req.params.latitude) - 0.1,
                                    $lte: Number(req.params.latitude) + 0.1,
                                },
                                longitude: {
                                    $gte: Number(req.params.longitude) - 0.1,
                                    $lte: Number(req.params.longitude) + 0.1,
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "banks",
                                localField: "bank",
                                foreignField: "_id",
                                as: "bankDetails",
                            },
                        },
                    ])
                    .toArray((err5, item) => {
                        // LATITUDE //
                        const latitude = Number(req.params.latitude);
                        const ratioLat =
                            Math.cos((req.params.latitude * Math.PI) / 180) *
                            111;
                        const tenKmLat = (1 / ratioLat) * 1;
                        const minLat = latitude - tenKmLat;
                        const maxLat = latitude + tenKmLat;

                        // LONGITUDE //
                        const longitude = Number(req.params.longitude);
                        const ratioLong =
                            Math.cos((req.params.longitude * Math.PI) / 180) *
                            85;
                        const tenKmLong = (1 / ratioLong) * 2;
                        const minLong = longitude - tenKmLong;
                        const maxLong = longitude + tenKmLong;
                        const result = [];

                        // FOR LOOP ON TERMINALS ARRAY //
                        item.forEach((el, index) => {
                            if (
                                el.latitude > minLat &&
                                el.latitude < maxLat &&
                                (el.longitude > minLong &&
                                    el.longitude < maxLong)
                            ) {
                                result.push(el);
                            }
                            index === item.length - 1 && res.json(result);
                        });
                    });
            });
        }
    },
);

module.exports = router;
