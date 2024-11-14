import  dotenv from 'dotenv';
import Server from "./models/server";

//Configuramos dotenv
dotenv.config();

const serve = new Server();

serve.listen();