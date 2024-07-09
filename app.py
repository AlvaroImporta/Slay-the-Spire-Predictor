from flask import Flask, render_template, request

app = Flask(__name__)

def determinar_mejor_opcion(opciones):
    # Función trivial para determinar la mejor opción (la opción más larga)
    mejor_opcion = max(opciones, key=len)
    return mejor_opcion

@app.route('/', methods=['GET', 'POST'])
def index():
    mejor_opcion = None
    if request.method == 'POST':
        opcion1 = request.form['opcion1']
        opcion2 = request.form['opcion2']
        opcion3 = request.form['opcion3']
        opciones = [opcion1, opcion2, opcion3]
        mejor_opcion = determinar_mejor_opcion(opciones)
    return render_template('index.html', mejor_opcion=mejor_opcion)

if __name__ == '__main__':
    app.run(debug=True)
