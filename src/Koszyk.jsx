import { Link } from "react-router-dom";

export default function Koszyk({ koszyk, usunZKoszyka, wyczyscKoszyk }) {
  const suma = koszyk.reduce((acc, p) => acc + parseFloat(p.cena), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">🛒 Koszyk</h1>
        <Link to="/pracownik" className="text-blue-400 hover:underline text-sm">
          ← Wróć do kategorii
        </Link>
      </div>

      {koszyk.length === 0 ? (
        <p className="text-neutral-400">Koszyk jest pusty.</p>
      ) : (
        <>
          <div className="grid gap-4 mb-6">
            {koszyk.map((p, i) => (
              <div key={i} className="bg-neutral-800 p-4 rounded flex justify-between items-start">
                <div>
                  <div className="text-lg font-semibold">{p.nazwa}</div>
                  {p.opis && <div className="text-neutral-400 text-sm">{p.opis}</div>}
                  <div className="text-sm text-neutral-500 mt-1">Cena: {p.cena} zł</div>
                </div>
                <button
                  onClick={() => usunZKoszyka(i)}
                  className="text-red-400 hover:text-red-500 text-sm"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <div className="text-lg font-semibold mb-4">Suma: {suma} zł</div>

          <div className="flex gap-4">
            <button
              onClick={wyczyscKoszyk}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Wyczyść koszyk
            </button>
            <button
              onClick={() => {
                alert("Zamówienie zostało złożone!");
                wyczyscKoszyk();
              }}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Złóż zamówienie
            </button>
          </div>
        </>
      )}
    </div>
  );
}
