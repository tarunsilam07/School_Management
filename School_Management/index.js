const express = require('express');
const dotenv = require('dotenv');
const schoolRouter = require('./routes/schoolRouter');

const app = express();
dotenv.config();

const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT', 'PORT'];
requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`Missing required environment variable: ${key}`);
        process.exit(1);
    }
});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', schoolRouter);

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});
