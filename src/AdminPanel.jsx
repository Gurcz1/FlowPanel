import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminPanel() {
  const [nazwa, setNazwa] = useState("");
  const [opis, setOpis] = useState("");
  const [cena, setCena] = useState("");
  const [kategoria, setKategoria] = useState("pizza");
  const [skladniki, setSkladniki] = useState("");

  const [menu, setMenu] = useState(() => {
    const zapisane = localStorage.getItem("menu");
    return zapisane ? JSON.parse(zapisane) : [];
  });

  const dodajPozycje = () => {
    if (!nazwa || !cena || isNaN(parseFloat(cena))) return;

    const nowaPozycja = {
      nazwa,
      opis: opis.trim(),
      cena: parseFloat(cena).toFixed(2),
      kategoria,
      skladniki: skladniki
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
    };

    const noweMenu = [...menu, nowaPozycja];
    setMenu(noweMenu);
    localStorage.setItem("menu", JSON.stringify(noweMenu));

    setNazwa("");
    setOpis("");
    setCena("");
    setKategoria("pizza");
    setSkladniki("");
  };

  const usunPozycje = (index) => {
    const noweMenu = menu.filter((_, i) => i !== index);
    setMenu(noweMenu);
    localStorage.setItem("menu", JSON.stringify(noweMenu));
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🛠 Panel administratora</h1>

      <Link to="/" className="text-blue-400 hover:underline mb-2 inline-block">
        ← Wróć do wyboru ról
      </Link>
      <Link to="/admin-magazyn" className="text-green-400 hover:underline mb-2 block">
        📦 Przejdź do magazynu składników →
      </Link>
      <Link to="/admin-raport" className="text-yellow-400 hover:underline mb-4 block">
        📊 Przejdź do raportu sprzedaży →
      </Link>

      <div className="mt-6 bg-neutral-800 p-4 rounded-lg max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Dodaj pozycję do menu</h2>

        <input
          value={nazwa}
          onChange={(e) => setNazwa(e.target.value)}
          placeholder="Nazwa (np. Pizza Margherita)"
          className="mb-4 w-full p-2 rounded bg-neutral-700"
        />
        <textarea
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          placeholder="Opis (opcjonalny)"
          className="mb-4 w-full p-2 rounded bg-neutral-700"
        />
        <input
          type="number"
          step="0.01"
          min="0"
          value={cena}
          onChange={(e) => setCena(e.target.value)}
          placeholder="Cena w zł (np. 29.99)"
          className="mb-4 w-full p-2 rounded bg-neutral-700"
        />
        <select
          value={kategoria}
          onChange={(e) => setKategoria(e.target.value)}
          className="mb-4 w-full p-2 rounded bg-neutral-700"
        >
          <option value="pizza">Pizza</option>
          <option value="makaron">Makarony</option>
          <option value="napoje">Napoje</option>
          <option value="dodatki">Dodatki</option>
        </select>
        <input
          value={skladniki}
          onChange={(e) => setSkladniki(e.target.value)}
          placeholder="Składniki oddzielone przecinkami (np. ciasto, ser, sos)"
          className="mb-4 w-full p-2 rounded bg-neutral-700"
        />

        <button
          onClick={dodajPozycje}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Dodaj do menu
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">📋 Aktualne menu:</h2>
        {menu.length === 0 && <p className="text-neutral-400">Brak pozycji.</p>}
        {menu.map((pozycja, i) => (
          <div key={i} className="mb-4 bg-neutral-800 p-4 rounded relative">
            <div className="font-semibold text-lg">{pozycja.nazwa}</div>
            {pozycja.opis && <div className="text-neutral-400">{pozycja.opis}</div>}
            <div className="text-sm text-neutral-400 mt-1">Cena: {pozycja.cena} zł</div>
            <div className="text-sm text-neutral-500">Kategoria: {pozycja.kategoria}</div>
            {pozycja.skladniki?.length > 0 && (
              <div className="text-xs text-neutral-400 mt-1">
                Składniki: {pozycja.skladniki.join(", ")}
              </div>
            )}
            <button
              onClick={() => usunPozycje(i)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-500 text-sm"
            >
              ✖ Usuń
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
