from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app) # Para permitir peticiones desde cualquier origen

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    base_dir = os.path.dirname(os.path.abspath(__file__))

    if data['character'] == 'Ironclad':
        model_path = os.path.join(base_dir,'extra_trees_ironclad.pkl')
    elif data['character'] == 'Silent':
        model_path = os.path.join(base_dir,'extra_trees_silent.pkl')
    elif data['character'] == 'Defect':
        model_path = os.path.join(base_dir,'extra_trees_defect.pkl')
    elif data['character'] == 'Watcher':
        model_path = os.path.join(base_dir,'extra_trees_watcher.pkl')
    else:
        return jsonify({'error': 'Invalid character'})
    
    # Cargar el modelo
    model = joblib.load(model_path)

    
    # Obtener los datos enviados desde el frontend
    max_hp = data['max_hp']
    entering_hp = data['entering_hp']
    card_options = data['card_options']
    relics = data['relics']
    
    predictions = []
    
    for cards in card_options:
        # Crear una fila para predecir
        row = [max_hp, entering_hp] + cards + relics
        df_row = pd.DataFrame([row], columns=['max_hp', 'entering_hp'] + [f'card_{i}' for i in range(len(cards))] + [f'relic_{i}' for i in range(len(relics))])
        
        # Hacer la predicción
        prediction = model.predict(df_row)[0]
        predictions.append(prediction)
    
    # Responder al frontend con las predicciones
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)