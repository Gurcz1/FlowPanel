import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewOrder({ dodajZamowienie }) {
  const [klient, setKlient] = useState("");
  const [produkt, setProdukt] = useState("");
  const [ilosc, setIlosc] = useState(1);
  const [produkty, setProdukty] = useState([]);
  const [platnosc, setPlatnosc] = useState("gotówka");

  const navigate = useNavigate();

  const dodajProdukt = () => {
    if (produkt.trim() !== "" && ilosc > 0) {
      setProdukty([...produkty, { nazwa: produkt, ilosc }]);
      setProdukt("");
      setIlosc(1);
    }
  };

  const suma = produkty.length * 25;

  const zatwierdz = () => {
    if (klient && produkty.length > 0) {
      dodajZamowienie({
        klient,
        suma,
        produkty,
        platnosc,
      });
      navigate("/");
    }
  };

  return (
    <div className="bg-neutral-800 p-4 rounded-lg shadow-lg max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Nowe zamówienie</h2>

      <label className="block mb-2">Imię i nazwisko klienta:</label>
      <input
        value={klient}
        onChange={(e) => setKlient(e.target.value)}
        className="w-full p-2 rounded bg-neutral-700 text-white mb-4"
        placeholder="np. Jan Kowalski"
      />

      <label className="block mb-2">Dodaj produkt:</label>
      <div className="flex gap-2 mb-4">
        <input
          value={produkt}
          onChange={(e) => setProdukt(e.target.value)}
          className="flex-1 p-2 rounded bg-neutral-700 text-white"
          placeholder="np. Pizza Margherita"
        />
        <input
          type="number"
          value={ilosc}
          onChange={(e) => setIlosc(parseInt(e.target.value))}
          className="w-20 p-2 rounded bg-neutral-700 text-white"
          min="1"
        />
        <button
          onClick={dodajProdukt}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Dodaj
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Produkty:</h3>
        <ul className="list-disc pl-6 text-neutral-300">
          {produkty.map((p, i) => (
            <li key={i}>
              {p.nazwa} × {p.ilosc}
            </li>
          ))}
        </ul>
      </div>

      <label className="block mb-2">Płatność:</label>
      <select
        value={platnosc}
        onChange={(e) => setPlatnosc(e.target.value)}
        className="w-full p-2 rounded bg-neutral-700 text-white mb-4"
      >
        <option value="gotówka">Gotówka</option>
        <option value="karta">Karta</option>
        <option value="blik">BLIK</option>
      </select>

      <div className="font-bold mb-4">Suma: {suma} zł</div>

      <button
        onClick={zatwierdz}
        className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
      >
        Zatwierdź zamówienie
      </button>
    </div>
  );
}
