"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
const stats_1 = __importDefault(require("../routes/stats"));
const user_2 = __importDefault(require("./user"));
const stats_2 = __importDefault(require("./stats"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => console.log('Aplicacion corriendo en el puerto ' + this.port));
    }
    routes() {
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/stats', stats_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    async dbConnect() {
        try {
            await stats_2.default.sync();
            await user_2.default.sync();
        }
        catch (error) {
            console.error('No se ha podido conectar a la Base de Datos', error);
        }
    }
}
exports.default = Server;
