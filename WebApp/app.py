from flask import Flask, render_template, request, jsonify
import joblib
import os
from characters_dict import characters_dict
from relics_dict import relics_dict

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/character/<name>')
def character(name):
    character_data = characters_dict.get(name)
    if character_data:
        model_filename = character_data["model"]
        model_path = os.path.join('models', model_filename)
        
        if os.path.exists(model_path):
            model = joblib.load(model_path)
        else:
            return f"Model file {model_path} not found", 404
        
        return render_template('main.html', character=character_data, relics=relics_dict, model=model)
    return redirect(url_for('index'))

@app.route('/search_card')
def search_card():
    query = request.args.get('query')
    character_name = request.args.get('character')
    character_data = characters_dict.get(character_name)

    if not character_data:
        return jsonify([])

    card_list = character_data['cards'].items()
    model = joblib.load(os.path.join('models', character_data['model']))

    results = []
    for card_name, card_url in card_list:
        if query.lower() in card_name.lower():
            score = model.predict([[card_name]])[0]
            results.append({'name': card_name, 'image': card_url, 'score': score})

    return jsonify(results)

@app.route('/search_relic')
def search_relic():
    query = request.args.get('query')

    results = []
    for relic_name, relic_url in relics_dict.items():
        if query.lower() in relic_name.lower():
            score = model.predict([[relic_name]])[0]  # Assuming model is loaded similarly for relics
            results.append({'name': relic_name, 'image': relic_url, 'score': score})

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
