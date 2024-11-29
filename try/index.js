const express = require('express');
const schoolRouter = require('./routes/schoolRouter');

const app = express();

const PORT = 3000; 

app.use(express.json()); 
app.use('/', schoolRouter);

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
