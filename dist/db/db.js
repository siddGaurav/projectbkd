"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const dbUrl = process.env.DB_URL;
if (!dbUrl) {
    throw new Error("DB_URL not found in .env ");
}
mongoose_1.default.connect(dbUrl)
    .then(() => {
    console.log("MongoDB connected ✅");
})
    .catch((err) => {
    console.log("DB Error ❌", err);
});
