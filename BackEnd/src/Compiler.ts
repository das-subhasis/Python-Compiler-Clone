import path from 'path'
import fs from 'fs';
import dotenv from 'dotenv'
import { exec } from 'child_process'
dotenv.config()

// define file path
const root_dir = process.env.ROOT_DIR || './'
const filepath = path.join(__dirname, 'tempCode.py')

export class Compiler {
    private code: string; // Change type to 'string'
    output: string; // Change type to 'string'
    error: string; // Change type to 'string'

    constructor(code: string) { // Define type of 'code' parameter as 'string'
        this.code = code;
        this.error = "";
        this.output = "";
    }

    compile(): void { 
        // Receive the user code and pass it to compiler
        if (!this.code) {
            this.error = "No Code Found";
            return;
        }
        try {
            fs.writeFileSync(filepath, this.code)
            exec(`python ${filepath}`, { timeout: 10000 }, (error, stdout, stderr) => {
                if (error) {
                    if (error.killed) {
                        this.error = "Code execution timed out.";
                        return;
                    }
                    this.error = error.message || stderr;
                }
                this.output = stdout
                // fs.unlinkSync(filepath)
            })
        } catch (error) {
            this.error = `Error: ${error}`;
        }
    }
}
