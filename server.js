const express = require('express');
require('dotenv').config();

const PORT= process.env.PORT;
const URL= process.env.MONGOOSE_URL;

const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect(URL).then(()=>{
    console.log('db connected');
}).catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));