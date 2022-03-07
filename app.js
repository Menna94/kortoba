require('dotenv').config({path: './configs/config.env'});
//
const express = require('express');
const app = express();
//Routes
const ProductRoutes = require('./routes/product.routes');
const AuthRoutes = require('./routes/auth.routes');
const UserRoutes = require('./routes/user.routes');

//
app.use(express.json());

const port = process.env.PORT || 3000;

//mount routers
app.use('/api/v1/products', ProductRoutes);
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', UserRoutes);


console.log(process.env.PORT);
app.listen(port, ()=>{
    console.log(`App is listening on ${port}`);
})