const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
function connectAsync() {
    return new Promise((resolve, reject) => {
        // const connStr = config.mongodb.connectionString;
        const connStr =
            "mongodb://lpa-app-demo-db:Hw7tw06fcf4C6P3e6oz4YYy442atzvdyFjVioocDd1nDOVlyHcOjVAwR4Cz16BIni14N2V7oOH38FQ0CflO7Lg==@lpa-app-demo-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@lpa-app-demo-db@";
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }; // useNewUrlParser: use the new url parser (old one is deprecated), useUnifiedTopology: use the new topology engine for handling the different parts of MongoDB (topology = the way in which the inner parts are interrelated or arranged).
        mongoose.connect(connStr, options, (err, db) => {
            if (err) {
                global.config.err = err;
                reject(err);
                return;
            }
            resolve(db);
        });
    });
}
// Connect to the database:
(async () => {
    try {
        const db = await connectAsync();
        console.log(
            `We're connected to ${db.connections[0].name} database on MongoDB`
        );
    } catch (err) {
        console.error(err);
    }
})();
