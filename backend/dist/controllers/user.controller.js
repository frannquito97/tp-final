"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.updateUser = exports.nuevoUsuario = exports.getUserData = exports.getUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const stats_1 = __importDefault(require("../models/stats"));
const getUser = async (req, res) => {
    const listUsers = await user_1.default.findAll();
    res.json(listUsers);
};
exports.getUser = getUser;
const getUserData = async (req, res) => {
    const { id } = req.params;
    const user = await user_1.default.findOne({ where: { id: id } });
    if (user) {
        res.json(user);
    }
};
exports.getUserData = getUserData;
const nuevoUsuario = async (req, res) => {
    const { name, lastName, email, username, password } = req.body;
    //Validar si existe el usuario
    const user = await user_1.default.findOne({ where: { email: email } });
    const user2 = await user_1.default.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el email: ${email}`
        });
    }
    if (user2) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre de usuario: ${username}`
        });
    }
    const hashPassword = await bcryptjs_1.default.hash(password, 10);
    try {
        user_1.default.create({
            name: name,
            lastName: lastName,
            username: username,
            password: hashPassword,
            email: email,
            active: true
        });
        res.json({
            msg: `Usuario: ${email} creado exitosamente!`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ups ocurrio un error',
            error
        });
    }
};
exports.nuevoUsuario = nuevoUsuario;
const updateUser = async (req, res) => {
    const { body } = req;
    const { id, name, lastName, password } = body;
    const regexBcrypt = '/^\$2[aby]\$/';
    console.log(body);
    const newPass = await bcryptjs_1.default.hash(password, 10);
    const user = await user_1.default.findOne({ where: { id: id } });
    if (user) {
        const { dataValues } = user;
        const passHash = dataValues['password'];
        await bcryptjs_1.default.compare(password, passHash).then((result) => {
            if (result) {
                user_1.default.update({ name: name, lastName: lastName }, { where: { id: id } });
                res.json({ msg: 'Usuario actualizado correctamente', status: res.status, statusCode: res.statusCode });
            }
            else {
                user_1.default.update({ name: name, lastName: lastName, password: newPass }, { where: { id: id } });
                res.json({ msg: 'Usuario actualizado correctamente, con pass nueva', status: res.status, statusCode: res.statusCode });
            }
        });
    }
};
exports.updateUser = updateUser;
const login = async (req, res) => {
    const { body } = req;
    const { password, email } = body;
    const user = await user_1.default.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el email: ${email}`
        });
    }
    else {
        const { dataValues } = user;
        const passHash = dataValues['password'];
        const id = dataValues['id'];
        const stat = await stats_1.default.findOne({ where: { id_user: id } });
        const score = stat === null || stat === void 0 ? void 0 : stat.dataValues['score'];
        const error = stat === null || stat === void 0 ? void 0 : stat.dataValues['error'];
        await bcryptjs_1.default.compare(password, passHash).then((result) => {
            if (result) {
                //Login exitoso -- Generar 
                const token = jsonwebtoken_1.default.sign({
                    id: id,
                    score: score,
                    error: error
                }, process.env.SECRET_KEY);
                res.json(token);
            }
            else {
                // Password incorrecto
                res.json({
                    msg: 'Password Incorrecto',
                });
            }
        });
    }
};
exports.login = login;
