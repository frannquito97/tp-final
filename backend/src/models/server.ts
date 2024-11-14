import express, {Application} from 'express';
import cors from 'cors';
import routeUser from '../routes/user';
import routeStat from '../routes/stats';
import User from './user';
import Stats from './stats';
class Server {

    private app : Application;
    private port : string;
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen(){
        this.app.listen(this.port, () => console.log('Aplicacion corriendo en el puerto ' + this.port ));
    }

    routes(){
        this.app.use('/api/users', routeUser);
        this.app.use('/api/users/stats', routeStat);
    }

    midlewares(){
        this.app.use(express.json());

        this.app.use(cors());
    }
    async dbConnect(){
        try{
            await Stats.sync();
            await User.sync();
        }
        catch (error){
            console.error('No se ha podido conectar a la Base de Datos', error);
        }
    }
}

export default Server;