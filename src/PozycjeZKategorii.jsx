import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PozycjeZKategorii({ dodajDoKoszyka }) {
  const { kategoria } = useParams();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const zapisane = localStorage.getItem("menu");
    if (zapisane) {
      const dane = JSON.parse(zapisane);
      setMenu(dane.filter(p => p.kategoria === kategoria));
    }
  }, [kategoria]);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold capitalize">📋 {kategoria}</h1>
        <div className="flex gap-4 text-sm">
          <Link to="/pracownik/koszyk" className="text-green-400 hover:underline">
            🛒 Koszyk
          </Link>
          <Link to="/pracownik" className="text-blue-400 hover:underline">
            ← Wróć do kategorii
          </Link>
        </div>
      </div>

      {menu.length === 0 && (
        <p className="text-neutral-400 mt-6">Brak pozycji w tej kategorii.</p>
      )}

      <div className="mt-6 grid gap-4 max-w-2xl">
        {menu.map((pozycja, i) => (
          <div key={i} className="bg-neutral-800 p-4 rounded-lg">
            <div className="text-xl font-semibold">{pozycja.nazwa}</div>
            {pozycja.opis && <div className="text-neutral-400">{pozycja.opis}</div>}
            <div className="text-sm text-neutral-500 mt-1">Cena: {pozycja.cena} zł</div>
            <button
              onClick={() => dodajDoKoszyka(pozycja)}
              className="mt-3 text-sm text-green-400 hover:text-green-500"
            >
              ➕ Dodaj do koszyka
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
