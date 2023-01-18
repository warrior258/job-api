const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

//authentication - Verifying Token
const verify = require('./middleware/authentication');

//route files
const auth = require('./routes/auth');
const jobs = require('./routes/jobs');
const alljobs = require('./routes/Alljobs');

//db
const connectDB = require('./db/connect');
require('dotenv').config();

app.use(express.json());

//routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/jobs', verify, jobs);
app.use('/api/v1/alljobs', alljobs);




const start = async () => {
    try {    
        await connectDB(process.env.MONGO_URL);
        console.log("Connected to DB!")
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start();
