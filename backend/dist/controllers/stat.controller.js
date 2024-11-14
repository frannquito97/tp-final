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
    const { body } = req.body;
    const { score, id_user } = body;
    const statExist = await stats_1.default.findOne({ where: { id_user: id_user } });
    if (statExist) {
        await stats_1.default.update({ score: score }, { where: { id_user: id_user } });
    }
};
exports.updateStats = updateStats;
