import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function KucharzPanel() {
  const [zamowienia, setZamowienia] = useState([]);

  useEffect(() => {
    const odswiezZamowienia = () => {
      const dane = JSON.parse(localStorage.getItem("historia_zamowien") || "[]");
      setZamowienia(dane);
    };

    odswiezZamowienia(); // pierwsze wczytanie

    const interval = setInterval(odswiezZamowienia, 3000); // odświeżanie co 3 sekundy
    return () => clearInterval(interval); // czyści interval przy wyjściu z komponentu
  }, []);

  const zmienStatus = (index, nowyStatus) => {
    const kopia = [...zamowienia];
    kopia[index].status = nowyStatus;
    setZamowienia(kopia);
    localStorage.setItem("historia_zamowien", JSON.stringify(kopia));
  };

  const statusKolor = {
    nowe: "text-yellow-400",
    w_toku: "text-blue-400",
    gotowe: "text-green-400",
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">👨‍🍳 Panel kucharza</h1>
      <Link to="/" className="text-blue-400 hover:underline mb-4 block">
        ← Wróć do wyboru ról
      </Link>

      {zamowienia.length === 0 ? (
        <p className="text-neutral-400">Brak zamówień.</p>
      ) : (
        <div className="space-y-6">
          {zamowienia
            .map((z, i) => ({ ...z, index: i }))
            .sort((a, b) => new Date(b.data) - new Date(a.data))
            .map((z) => (
              <div key={z.index} className="bg-neutral-800 p-4 rounded shadow">
                <div className="text-sm text-neutral-400">
                  {new Date(z.data).toLocaleString()}
                </div>
                <div className={`text-lg font-semibold mb-2 ${statusKolor[z.status]}`}>
                  Status: {z.status}
                </div>
                <ul className="text-sm text-neutral-300 mb-3">
                  {(z.pozycje || []).map((p, j) => (
                    <li key={j}>x{p.ilosc} {p.nazwa}</li>
                  ))}
                </ul>

                {z.status === "nowe" && (
                  <button
                    onClick={() => zmienStatus(z.index, "w_toku")}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm"
                  >
                    🔄 Rozpocznij przygotowanie
                  </button>
                )}

                {z.status === "w_toku" && (
                  <button
                    onClick={() => zmienStatus(z.index, "gotowe")}
                    className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-sm"
                  >
                    ✅ Oznacz jako gotowe
                  </button>
                )}

                {z.status === "gotowe" && (
                  <div className="text-green-400 text-sm">✅ Gotowe do wydania</div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
