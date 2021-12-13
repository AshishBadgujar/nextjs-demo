import mongoose from 'mongoose'

function initDB() {
    if (mongoose.connection.readyState) {
        console.log("already connected");
        return
    }
    let mongoUrlLocal = "mongodb://localhost:27017/tododb";

    // use when starting application as docker container
    let mongoUrlDocker = "mongodb://admin:password@mongodb";
    mongoose.connect(mongoUrlDocker, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    mongoose.connection.on('connected', () => {
        console.log("connected to database")
    })
    mongoose.connection.on('error', () => {
        console.log('error connecting')
    })
}

export default initDB
