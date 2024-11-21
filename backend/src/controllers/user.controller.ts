import { Request, Response } from 'express'
import User from '../models/user'
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import Stats from '../models/stats';


export const getUser = async (req: Request, res: Response) => {
    const listUsers = await User.findAll();

    res.status(200).json(listUsers);
}
export const getUserData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });

    if (user) {
        res.status(200).json(user);
    }
}
export const nuevoUsuario = async (req: Request, res: Response) => {
    const { name, lastName, email, username, password } = req.body;

    //Validar si existe el usuario
    const user = await User.findOne({ where: { email: email } });
    const user2 = await User.findOne({ where: { username: username } });
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
    const hashPassword = await bycrypt.hash(password, 10);
    try {
        User.create({
            name: name,
            lastName: lastName,
            username: username,
            password: hashPassword,
            email: email,
            active: true
        })
        res.status(201).json({
            msg: `Usuario: ${email} creado exitosamente!`,
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Ups ocurrio un error',
            error
        })
    }

}
export const updateUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id, name, lastName, password } = body;   
    const user = await User.findOne({ where: { id: id } });
    if(user){
        if( password == '' && name == '' && lastName == ''){
            res.status(304).json({msg: 'El usuario no fue modificado'});
        }
        else if (password == '' && name != '' && lastName != ''){
            User.update({ name: name, lastName: lastName}, { where: { id: id } });
            res.status(200).json({ msg: 'Nombre y Apellido del usuario modificados correctamente'});
        }
        else if( password == '' && name != '' && lastName == ''){
            User.update({ name: name}, { where: { id: id } });
            res.status(200).json({ msg: 'Nombre del usuario modificado correctamente'});
        }else if( password == '' && name == '' && lastName != ''){
            User.update({ lastName: lastName}, { where: { id: id } });
            res.status(200).json({ msg: 'Apellido del usuario modificado correctamente'});
        }else if(password != '' && name == '' && lastName == ''){
            const newPass = await bycrypt.hash(password, 10);
            User.update({ password: newPass}, { where: { id: id } });
            res.status(200).json({ msg: 'Constraseña del usuario modificada correctamente'});
        }else if (password != '' && name != '' && lastName != ''){
            const newPass = await bycrypt.hash(password, 10);
            User.update({ name: name, lastName: lastName, password: newPass }, { where: { id: id } });
            res.status(200).json({ msg: 'Usuario actualizado correctamente'});
        }
    }
}
export const login = async (req: Request, res: Response) => {
    const { body } = req;
    const { password, email } = body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(404).json({
            msg: `No se encontro un usuario`
        })
    }else {
        const { dataValues } = user;
        const passHash = dataValues['password'];
        const id = dataValues['id'];
        const stat = await Stats.findOne({ where: { id_user: id } })
        let error : number;
        let score : number;
        let total : number;
        if(stat){
            score = stat?.dataValues['score'];
            error = stat?.dataValues['error'];
            total = stat?.dataValues['total'];
        }else{
            score = 0;
            error = 0;
            total = 0;
        }

        await bycrypt.compare(password, passHash).then((result) => {
            if (result) {
                //Login exitoso -- Generar 
                const token = jwt.sign({
                    id: id,
                    score: score,
                    error: error,
                    total: total,
                },
                    process.env.SECRET_KEY!)
                res.status(200).json(token);
            } else {
                // Password incorrecto
                res.status(400).json({
                    msg: 'Password Incorrecto',
                })
            }
        })
    }
}