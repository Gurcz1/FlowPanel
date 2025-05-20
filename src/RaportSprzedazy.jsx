import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RaportSprzedazy() {
  const [raport, setRaport] = useState([]);
  const [topPozycje, setTopPozycje] = useState({});

  useEffect(() => {
    const historia = JSON.parse(localStorage.getItem("historia_archiwum") || "[]");
    setRaport(historia);

    const licznik = {};
    historia.forEach((z) => {
      (z.pozycje || []).forEach((p) => {
        licznik[p.nazwa] = (licznik[p.nazwa] || 0) + p.ilosc;
      });
    });

    setTopPozycje(licznik);
  }, []);

  const wyczyscRaport = () => {
    if (window.confirm("Czy na pewno chcesz usunąć cały raport?")) {
      localStorage.removeItem("historia_archiwum");
      setRaport([]);
      setTopPozycje({});
    }
  };

  const eksportujRaport = () => {
    const blob = new Blob([JSON.stringify(raport, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `raport_sprzedazy_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Raport sprzedaży</h1>

      <Link to="/admin-panel" className="text-blue-400 hover:underline mb-6 block">
        ← Wróć do panelu administratora
      </Link>

      <div className="flex gap-4 mb-6">
        <button
          onClick={eksportujRaport}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
        >
          💾 Eksportuj do pliku
        </button>
        <button
          onClick={wyczyscRaport}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
        >
          🧹 Wyczyść raport
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">📦 Zamówienia</h2>

      {raport.length === 0 ? (
        <p className="text-neutral-400">Brak zapisanych zamówień.</p>
      ) : (
        <div className="space-y-6">
          {raport
            .slice()
            .reverse()
            .map((z, i) => (
              <div key={i} className="bg-neutral-800 p-4 rounded shadow">
                <div className="text-sm text-neutral-400">
                  {new Date(z.data).toLocaleString()}
                </div>
                <div className="text-lg font-semibold mb-2">Suma: {z.suma} zł</div>
                <ul className="text-sm text-neutral-300">
                  {(z.pozycje || []).map((p, j) => (
                    <li key={j}>x{p.ilosc} {p.nazwa}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}

      {Object.keys(topPozycje).length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-10 mb-4">🔥 Najczęściej zamawiane pozycje</h2>
          <ul className="space-y-2">
            {Object.entries(topPozycje)
              .sort((a, b) => b[1] - a[1])
              .map(([nazwa, ilosc]) => (
                <li key={nazwa} className="bg-neutral-800 p-3 rounded flex justify-between">
                  <span>{nazwa}</span>
                  <span className="font-semibold">{ilosc}×</span>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
