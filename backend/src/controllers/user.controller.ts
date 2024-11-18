import { Request, Response } from 'express'
import User from '../models/user'
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import Stats from '../models/stats';
export const getUser = async (req: Request, res: Response) => {
    const listUsers = await User.findAll();

    res.json(listUsers);
}

export const getUserData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });

    if (user) {
        res.json(user);
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
export const updateUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id, name, lastName, password } = body;
    const regexBcrypt = '/^\$2[aby]\$/'
    console.log(body);
    const newPass = await bycrypt.hash(password, 10);


    const user = await User.findOne({ where: { id: id } });

    if(user){
        const {dataValues} = user;
        const passHash = dataValues['password']
        await bycrypt.compare(password, passHash).then((result) => {
            if(result){
                User.update({ name: name, lastName: lastName}, { where: { id: id } });
                res.json({ msg: 'Usuario actualizado correctamente', status: res.status, statusCode: res.statusCode });
            } else {
                User.update({ name: name, lastName: lastName, password: newPass }, { where: { id: id } });
                res.json({ msg: 'Usuario actualizado correctamente, con pass nueva', status: res.status, statusCode: res.statusCode });
            }
        });
    }
}
export const login = async (req: Request, res: Response) => {
    const { body } = req;
    const { password, email } = body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el email: ${email}`
        })
    } else {

        const { dataValues } = user;
        const passHash = dataValues['password'];
        const id = dataValues['id'];
        const stat = await Stats.findOne({ where: { id_user: id } })
        const score = stat?.dataValues['score'];
        const error = stat?.dataValues['error'];
        await bycrypt.compare(password, passHash).then((result) => {
            if (result) {
                //Login exitoso -- Generar 
                const token = jwt.sign({
                    id: id,
                    score: score,
                    error: error

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