"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const beautyLog_1 = __importDefault(require("../util/beautyLog"));
mongoose_1.default.connect(config_1.config.MONGO_DB_URI)
    .then(() => {
    beautyLog_1.default.info('Connected to MongoDB');
})
    .catch((error) => {
    beautyLog_1.default.error('Failed to connect to MongoDB', error);
});
