import express,{Application} from 'express'; 
//for using an import here we need to configure the tsconfig.json
//setting the option module to commonjs

var app: Application = express()
const port: string = process.env.PORT || '3000';

app.use(express.static('build'))

app.listen(port, ():void => {
    console.log('Webapp started on port '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});