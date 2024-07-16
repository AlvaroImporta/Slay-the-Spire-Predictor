from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

@app.route('/run-script', methods=['POST'])
def run_script():
    # Aquí puedes ejecutar tu script de Python
    # y devolver el resultado como una respuesta JSON
    data = request.get_json()
    # Lógica del script
    result = {"message": "Script ejecutado correctamente", "data": data}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
