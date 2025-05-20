import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MagazynPanel() {
  const [skladniki, setSkladniki] = useState({});
  const [nazwa, setNazwa] = useState("");
  const [ilosc, setIlosc] = useState("");

  // Załaduj z localStorage przy starcie
  useEffect(() => {
    const zapisane = localStorage.getItem("magazyn");
    if (zapisane) {
      setSkladniki(JSON.parse(zapisane));
    }
  }, []);

  const dodajSkladnik = () => {
    if (!nazwa || !ilosc || isNaN(parseInt(ilosc))) return;

    const nowy = { ...skladniki };
    const klucz = nazwa.toLowerCase();
    nowy[klucz] = (nowy[klucz] || 0) + parseInt(ilosc);

    setSkladniki(nowy);
    localStorage.setItem("magazyn", JSON.stringify(nowy));

    setNazwa("");
    setIlosc("");
  };

  const ustawIlosc = (nazwa, nowaIlosc) => {
    const nowe = { ...skladniki };
    nowe[nazwa] = parseInt(nowaIlosc) || 0;
    setSkladniki(nowe);
    localStorage.setItem("magazyn", JSON.stringify(nowe));
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Magazyn składników</h1>
      <Link to="/admin-panel" className="text-blue-400 hover:underline mb-6 inline-block">
        ← Wróć do panelu administratora
      </Link>

      <div className="mb-6 bg-neutral-800 p-4 rounded max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Dodaj składnik</h2>
        <input
          value={nazwa}
          onChange={(e) => setNazwa(e.target.value)}
          placeholder="Nazwa składnika (np. ser)"
          className="mb-3 w-full p-2 rounded bg-neutral-700"
        />
        <input
          type="number"
          min="1"
          value={ilosc}
          onChange={(e) => setIlosc(e.target.value)}
          placeholder="Ilość (np. 10)"
          className="mb-3 w-full p-2 rounded bg-neutral-700"
        />
        <button
          onClick={dodajSkladnik}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Dodaj do magazynu
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">📋 Składniki:</h2>
      {Object.keys(skladniki).length === 0 && (
        <p className="text-neutral-400">Brak składników w magazynie.</p>
      )}

      <div className="grid gap-4 max-w-xl">
        {Object.entries(skladniki).map(([nazwa, ilosc]) => (
          <div key={nazwa} className="bg-neutral-800 p-3 rounded flex justify-between items-center">
            <div className="capitalize font-medium">{nazwa}</div>
            <input
              type="number"
              min="0"
              value={ilosc}
              onChange={(e) => ustawIlosc(nazwa, e.target.value)}
              className="w-20 p-1 rounded bg-neutral-700 text-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
