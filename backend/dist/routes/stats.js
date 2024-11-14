"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("../routes/validate-token"));
const stat_controller_1 = require("../controllers/stat.controller");
const router = (0, express_1.Router)();
router.get('/:id', validate_token_1.default, stat_controller_1.getStatUser);
router.post('/', validate_token_1.default, stat_controller_1.updateStats);
exports.default = router;
