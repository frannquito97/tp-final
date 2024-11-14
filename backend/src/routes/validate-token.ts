import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
const validateToken = (req : Request, res: Response, next: NextFunction) =>{
    console.log('Validate Token');
    const headerToken = req.headers['authorization'];
    if(headerToken != undefined && headerToken.startsWith('Bearer ')){

        try {
        const bearerToken = headerToken.slice(7)
        jwt.verify(bearerToken, process.env.SECRET_KEY!);
        next();    
        } catch (error) {
            res.status(401).json({msg: 'Token invalido'})
        }
        
    }
    else{
        res.status(400).json({msg: 'Acceso Denegado'});
    }
}

export default validateToken