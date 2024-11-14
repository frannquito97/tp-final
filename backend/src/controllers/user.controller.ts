import { Request, Response } from 'express'
import User from '../models/user'
import byccrpt from 'bcryptjs';
import jwt from 'jsonwebtoken'
export const getUser = async (req: Request, res: Response) => {
    const listUsers = await User.findAll();

    res.json(listUsers);
}

export const getUserData =  async ( req: Request, res: Response) =>{
    const {id} = req.params;
    const user = await User.findOne( { where : { id: id}});

    if(user){
        res.json(user);
    }
}

export const nuevoUsuario = async (req: Request, res: Response) => {
    const { name, lastName, email, username, password } = req.body;

    //Validar si existe el usuario
    const user = await User.findOne({ where: { email: email} });
    const user2 = await User.findOne( { where: { username: username }});
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el email: ${email}`
        })
    }
    if (user2) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre de usuario: ${username}`
        })
    }

    console.log('sigo')

    const hashPassword = await byccrpt.hash(password, 10);

    //
    try {
        User.create({
            name: name,
            lastName: lastName,
            username: username,
            password: hashPassword,
            email: email,
            active: true
        })
        res.json({
            msg: `Usuario: ${email} creado exitosamente!`,
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Ups ocurrio un error',
            error
        })
    }

}

export const login = async (req: Request, res: Response) => {
    console.log(req.body);

    const { body } = req;
    const { password, email } = body;
    const user = await User.findOne({ where: { email: email} });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el email: ${email}`
        })
    } else {

        const { dataValues } = user;
        const passHash = dataValues['password'];
        const id = dataValues['id'];
        await byccrpt.compare(password, passHash).then((result) => {
            if (result) {
                //Login exitoso -- Generar 
                const token = jwt.sign({
                    id:id,
                    email: email
                },
                    process.env.SECRET_KEY!)
                res.json(token);
            } else {
                // Password incorrecto
                res.json({
                    msg: 'Password Incorrecto',

                })
            }

        })
    }
}