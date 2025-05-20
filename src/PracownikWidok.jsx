import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PracownikWidok({ koszyk, dodajDoKoszyka, usunZKoszyka, setKoszyk }) {
  const [kategoria, setKategoria] = useState(null);
  const [pozycje, setPozycje] = useState([]);
  const [historiaZamowien, setHistoriaZamowien] = useState([]);

  const wszystkieKategorie = [
    { nazwa: "Pizza", slug: "pizza" },
    { nazwa: "Makarony", slug: "makaron" },
    { nazwa: "Napoje", slug: "napoje" },
    { nazwa: "Dodatki", slug: "dodatki" },
  ];

  const odswiezHistorie = () => {
    const historia = JSON.parse(localStorage.getItem("historia_zamowien") || "[]");
    setHistoriaZamowien(historia.filter((z) => z.status === "w_toku" || z.status === "gotowe"));
  };

  useEffect(() => {
    if (kategoria) {
      const zapisane = localStorage.getItem("menu");
      if (zapisane) {
        const dane = JSON.parse(zapisane);
        setPozycje(dane.filter((p) => p.kategoria === kategoria));
      }
    }

    odswiezHistorie();

    const interval = setInterval(odswiezHistorie, 3000);
    return () => clearInterval(interval);
  }, [kategoria]);

  const suma = koszyk.reduce((acc, p) => acc + parseFloat(p.cena) * p.ilosc, 0).toFixed(2);

  const odejmijZeStanuMagazynu = () => {
    const zapisane = localStorage.getItem("magazyn");
    if (!zapisane) return;

    const magazyn = JSON.parse(zapisane);

    koszyk.forEach((pozycja) => {
      const iloscDania = pozycja.ilosc;
      if (pozycja.skladniki && Array.isArray(pozycja.skladniki)) {
        pozycja.skladniki.forEach((skladnik) => {
          const klucz = skladnik.toLowerCase();
          if (magazyn[klucz] !== undefined) {
            magazyn[klucz] = Math.max(0, magazyn[klucz] - iloscDania);
          }
        });
      }
    });

    localStorage.setItem("magazyn", JSON.stringify(magazyn));
  };

  const zapiszZamowienieDoHistorii = () => {
    const historia = JSON.parse(localStorage.getItem("historia_zamowien") || "[]");

    const noweZamowienie = {
      data: new Date().toISOString(),
      suma: suma,
      pozycje: koszyk.map((item) => ({
        nazwa: item.nazwa,
        ilosc: item.ilosc,
      })),
      status: "nowe",
    };

    historia.push(noweZamowienie);
    localStorage.setItem("historia_zamowien", JSON.stringify(historia));
    const archiwum = JSON.parse(localStorage.getItem("historia_archiwum") || "[]");
    archiwum.push(noweZamowienie);
    localStorage.setItem("historia_archiwum", JSON.stringify(archiwum));
  };

  const oznaczJakoWydane = (dataZamowienia) => {
    const historia = JSON.parse(localStorage.getItem("historia_zamowien") || "[]");
    const nowaHistoria = historia.filter((z) => z.data !== dataZamowienia);
    localStorage.setItem("historia_zamowien", JSON.stringify(nowaHistoria));
    setHistoriaZamowien(nowaHistoria.filter((z) => z.status === "w_toku" || z.status === "gotowe"));
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex">
      {/* LEWA STRONA */}
      <div className="w-2/3 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">👨‍💼 Panel pracownika</h1>
          {!kategoria && (
            <Link to="/" className="text-blue-400 hover:underline text-sm">
              ← Wróć do wyboru ról
            </Link>
          )}
        </div>

        {!kategoria ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              {wszystkieKategorie.map((kat) => (
                <button
                  key={kat.slug}
                  onClick={() => setKategoria(kat.slug)}
                  className="bg-neutral-800 hover:bg-neutral-700 rounded-lg p-10 text-2xl font-bold shadow-lg"
                >
                  {kat.nazwa}
                </button>
              ))}
            </div>

            {/* Zamówienia */}
            <div>
              <h2 className="text-xl font-semibold mb-4">📦 Twoje zamówienia</h2>
              {historiaZamowien.length === 0 ? (
                <p className="text-neutral-400">Brak aktywnych zamówień.</p>
              ) : (
                <div className="space-y-4 max-w-2xl">
                  {historiaZamowien
                    .slice()
                    .reverse()
                    .map((z, i) => (
                      <div key={i} className="bg-neutral-800 p-4 rounded">
                        <div className="text-sm text-neutral-400">{new Date(z.data).toLocaleString()}</div>
                        <div className={`flex items-center justify-between font-semibold ${
                          z.status === "gotowe" ? "text-green-400" : "text-blue-400"
                        }`}>
                          <span>
                            {z.status === "gotowe" ? "✅ Gotowe do odbioru" : "🔄 W przygotowaniu"}
                          </span>
                          {z.status === "gotowe" && (
                            <button
                              onClick={() => oznaczJakoWydane(z.data)}
                              className="ml-4 text-sm text-white bg-green-700 hover:bg-green-800 px-3 py-1 rounded"
                            >
                              📦 Wydane
                            </button>
                          )}
                        </div>
                        <ul className="text-sm mt-2 text-neutral-300">
                          {(z.pozycje || []).map((p, j) => (
                            <li key={j}>x{p.ilosc} {p.nazwa}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold capitalize">{kategoria}</h2>
              <button
                onClick={() => setKategoria(null)}
                className="text-blue-400 hover:underline text-sm"
              >
                ← Wróć do kategorii
              </button>
            </div>

            {pozycje.length === 0 ? (
              <p className="text-neutral-400">Brak pozycji w tej kategorii.</p>
            ) : (
              <div className="grid gap-4 max-w-2xl">
                {pozycje.map((p, i) => (
                  <div key={i} className="bg-neutral-800 p-4 rounded-lg">
                    <div className="text-xl font-semibold">{p.nazwa}</div>
                    {p.opis && <div className="text-neutral-400">{p.opis}</div>}
                    <div className="text-sm text-neutral-500 mt-1">Cena: {p.cena} zł</div>
                    <button
                      onClick={() =>
                        dodajDoKoszyka({
                          ...p,
                          ilosc: 1,
                          cena: parseFloat(p.cena),
                        })
                      }
                      className="mt-2 text-sm text-green-400 hover:text-green-500"
                    >
                      ➕ Dodaj do koszyka
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* PRAWA STRONA — KOSZYK */}
      <div className="w-1/3 bg-neutral-800 p-6 border-l border-neutral-700">
        <h2 className="text-xl font-bold mb-4">🛒 Koszyk</h2>

        {koszyk.length === 0 ? (
          <p className="text-neutral-400">Koszyk jest pusty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {koszyk.map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-neutral-900 p-4 rounded">
                <div>
                  <div className="text-lg font-semibold">
                    x{item.ilosc} {item.nazwa}
                  </div>
                  <div className="text-base text-neutral-300">
                    {(item.ilosc * item.cena).toFixed(2)} zł
                  </div>
                </div>
                <button
                  onClick={() => usunZKoszyka(i)}
                  className="text-red-400 hover:text-red-500 text-xl"
                >
                  ✖
                </button>
              </div>
            ))}

            <div className="text-right mt-4 font-semibold text-xl">
              Razem: {suma} zł
            </div>
            <button
              onClick={() => {
                zapiszZamowienieDoHistorii();
                odejmijZeStanuMagazynu();
                alert("Zamówienie zostało złożone!");
                setKoszyk([]);
                odswiezHistorie();
              }}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white mt-4 text-lg"
            >
              Złóż zamówienie
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
