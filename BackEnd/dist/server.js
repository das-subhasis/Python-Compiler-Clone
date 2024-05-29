"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Compiler_1 = require("./Compiler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
app.get('/compile', (req, res) => {
    // const response = req.body;
    const python = new Compiler_1.Compiler("print('hi')");
    python.compile();
    if (python.error) {
        return res.json({ error: python.error });
    }
    // console.log('success')
    return res.json({ output: python.output });
});
app.listen(PORT, () => {
    console.log(`Server is connected to port ${PORT}`);
});
