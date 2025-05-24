const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 8000;
const router = require('./router/index.js');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

const connectDB = async () => {
    try {
        console.log('mongoURI', mongoURI);
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/hls', express.static('hls'));

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
}
);