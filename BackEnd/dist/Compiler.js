"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const child_process_1 = require("child_process");
dotenv_1.default.config();
// define file path
const root_dir = process.env.ROOT_DIR || './';
const filepath = path_1.default.join(__dirname, 'tempCode.py');
class Compiler {
    constructor(code) {
        this.code = code;
        this.error = "";
        this.output = "";
    }
    compile() {
        // Receive the user code and pass it to compiler
        if (!this.code) {
            this.error = "No Code Found";
            return;
        }
        try {
            fs_1.default.writeFileSync(filepath, this.code);
            (0, child_process_1.exec)(`python ${filepath}`, { timeout: 10000 }, (error, stdout, stderr) => {
                if (error) {
                    if (error.killed) {
                        this.error = "Code execution timed out.";
                        return;
                    }
                    this.error = error.message || stderr;
                }
                console.log(stdout);
                this.output = stdout;
                // fs.unlinkSync(filepath)
            });
        }
        catch (error) {
            this.error = `Error: ${error}`;
        }
    }
}
exports.Compiler = Compiler;
