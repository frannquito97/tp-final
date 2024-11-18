"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStats = exports.getStatUser = void 0;
const stats_1 = __importDefault(require("../models/stats"));
const getStatUser = async (req, res) => {
    const { id } = req.params;
    const stat = await stats_1.default.findOne({ where: { id_user: id } });
    if (stat) {
        res.json(stat);
    }
};
exports.getStatUser = getStatUser;
const updateStats = async (req, res) => {
    const { score, text, id } = req.body;
    const statExist = await stats_1.default.findOne({ where: { id_user: id } });
    if (statExist) {
        try {
            if (text == 'score') {
                stats_1.default.update({
                    score: score,
                }, { where: { id_user: id } });
            }
            else {
                stats_1.default.update({
                    error: score,
                }, { where: { id_user: id } });
            }
            res.json({ msg: 'Estadisticas actualizadas correctamente' });
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
                    score: score,
                    error: 0
                });
            }
            else {
                stats_1.default.create({
                    id_user: id,
                    score: 0,
                    error: score
                });
            }
            res.json({
                msg: `Estadisticas agregadas correctamente!`,
            });
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
