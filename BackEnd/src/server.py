from .Compiler import Compiler
from flask import Blueprint, request, jsonify, Response

server = Blueprint('sever', __name__)


@server.route('/compile', methods=['POST'])
def compile_code() -> Response:
    response = request.json
    if not response:
        error = [{'error': 'Source code not found'}]
        return jsonify(error), 500
    compiler = Compiler(response.get('code', ''), response.get('la', 'python'))
    comp_out = compiler.compile()
    return jsonify(comp_out[0]), comp_out[1]
