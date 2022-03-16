require("dotenv").config();

import express, { Application, RequestHandler,  } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import mongoose from 'mongoose';
import apiUsuarios from './usuarios/apiUsuarios';
import apiProductos from './productos/apiProductos';
import apiPedidos from './pedidos/apiPedidos';
import apiCarrito from './Carrito/apiCarrito';
import Carrito from './Carrito/Cart';


const app: Application = express();
const port: number = 5000;
const conexiondb: string = process.env.mongoDBURI!;

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
}; 

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors(options));
app.use(bp.json());

app.use(apiUsuarios);
app.use(apiPedidos);
app.use(apiProductos);
app.use(apiCarrito);

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

mongoose.connect(conexiondb) 
.then(() => console.log("BD conectada"))

