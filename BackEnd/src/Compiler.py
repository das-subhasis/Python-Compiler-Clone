import os
from flask import jsonify, Response
import sys
import io
import subprocess
from pydantic import BaseModel

# Add other compilers here, for future multiple languages support

# define the python compiler executable
def execute_python(code) -> tuple:
    original_sdout = sys.stdout
    sys.stdout = output_capture = io.StringIO()
    try:
        exec(code)
        output = {'data': output_capture.getvalue()}
        return output, 201
    except Exception as e:
        error = {'error': str(e)}
        return error, 500
    finally:
        sys.stdout = original_sdout


class Compiler:
    source_code: str
    language: str

    def __init__(self, code: str, la: str = 'python'):
        super().__init__()
        self.source_code = code
        self.language = la

    # add the compiler logic
    def compile(self) -> list:
        if not self.source_code:
            return {'error': 'No source code provided'}, 403
        if self.language == "python":
            return execute_python(self.source_code)
