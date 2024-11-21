"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRanking = exports.updateStats = exports.getStatUser = void 0;
const stats_1 = __importDefault(require("../models/stats"));
const conection_1 = __importDefault(require("../db/conection"));
const getStatUser = async (req, res) => {
    const { id } = req.params;
    const stat = await stats_1.default.findOne({ where: { id_user: id } });
    if (stat) {
        res.json(stat);
    }
};
exports.getStatUser = getStatUser;
const updateStats = async (req, res) => {
    const { points, text, id } = req.body;
    const statExist = await stats_1.default.findOne({ where: { id_user: id } });
    if (statExist) {
        const { error, score } = statExist === null || statExist === void 0 ? void 0 : statExist.dataValues;
        try {
            if (text == 'score') {
                stats_1.default.update({
                    score: points,
                    total: points - error
                }, { where: { id_user: id } });
                res.status(200).json({ msg: `Aciertos actualizados correctamente.  aciertos: ${points}` });
            }
            else if (text == 'error') {
                stats_1.default.update({
                    error: points,
                    total: score - points
                }, { where: { id_user: id } });
                res.status(200).json({ msg: `Errores actualizados correctamente.  errores: ${points}` });
            }
        }
        catch (error) {
            res.status(400).json({
                msg: 'Ups ocurrio un error',
                error
            });
        }
    }
    else {
        try {
            if (text == 'score') {
                stats_1.default.create({
                    id_user: id,
                    score: points,
                    error: 0,
                    total: points
                });
                res.status(201).json({ msg: 'Aciertos agregados correctamente' });
            }
            else if (text == 'error') {
                stats_1.default.create({
                    id_user: id,
                    score: 0,
                    error: points,
                    total: points
                });
                res.status(201).json({ msg: 'Errores agregados correctamente', errores: points });
            }
        }
        catch (error) {
            res.status(400).json({
                msg: 'Ups ocurrio un error',
                error
            });
        }
    }
};
exports.updateStats = updateStats;
const getRanking = async (req, res) => {
    const ranking = await conection_1.default.query('SELECT id_user, score, error, total FROM f1Games.stats order by total desc');
    if (ranking) {
        res.status(200).json(ranking[0]);
    }
    else {
        res.status(400).json({ msg: 'Ups ocurrio un error al buscar los datos' });
    }
};
exports.getRanking = getRanking;
