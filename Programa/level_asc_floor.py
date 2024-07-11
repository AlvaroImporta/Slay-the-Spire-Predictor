import pandas as pd
import joblib
from sklearn.preprocessing import MaxAbsScaler
from sklearn.metrics import r2_score


class DeckBuilder:
    def __init__(self):
        self.initial_cards = []
        self.relics = []

    def add_initial_cards(self):
        cards = input("Introduce las cartas iniciales separadas por comas: ")
        self.initial_cards = [card.strip() for card in cards.split(',')]
        print(f"Cartas iniciales: {self.initial_cards}")

    def add_relics(self):
        relics = input("Introduce las reliquias separadas por comas: ")
        self.relics = [relic.strip() for relic in relics.split(',')]
        print(f"Reliquias: {self.relics}")

    def predict_cards(self):
        if not self.initial_cards:
            print("Primero introduce las cartas iniciales.")
            return

        for i in range(3):
            new_card = input(f"Introduce la carta {i + 1} para predecir: ").strip()
            predicted_deck = self.initial_cards + [new_card]
            print(f"Predicción {i + 1}: {predicted_deck}")

def load_model():
    model = joblib.load('Proyecto Final\Data_Science_Proyect\Programa\extra_trees_regresor_model.pkl')
    return model

def main():
    deck_builder = DeckBuilder()
    model = load_model()

    while True:
        print("\nMenú:")
        print("1. Introducir cartas iniciales")
        print("2. Introducir reliquias")
        print("3. Predecir cartas")
        print("4. Salir")

        choice = input("Selecciona una opción (1/2/3/4): ").strip()

        if choice == '1':
            deck_builder.add_initial_cards()
        elif choice == '2':
            deck_builder.add_relics()
        elif choice == '3':
            deck_builder.predict_cards()
        elif choice == '4':
            print("Saliendo del programa.")
            break
        else:
            print("Opción no válida. Inténtalo de nuevo.")


if __name__ == "__main__":
    main()