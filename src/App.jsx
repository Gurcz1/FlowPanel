import { useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import RoleSelect from "./RoleSelect";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";
import PracownikWidok from "./PracownikWidok";
import MagazynPanel from "./MagazynPanel";
import RaportSprzedazy from "./RaportSprzedazy";
import KucharzPanel from "./KucharzPanel";


export default function App() {
  const [koszyk, setKoszyk] = useState([]);

  const dodajDoKoszyka = (pozycja) => {
    const istnieje = koszyk.find((p) => p.nazwa === pozycja.nazwa);
    if (istnieje) {
      setKoszyk((prev) =>
        prev.map((p) =>
          p.nazwa === pozycja.nazwa
            ? { ...p, ilosc: p.ilosc + 1 }
            : p
        )
      );
    } else {
      setKoszyk((prev) => [
        ...prev,
        {
          ...pozycja,
          ilosc: 1,
          cena: parseFloat(pozycja.cena), // kluczowe!
        },
      ]);
    }
  };

  const usunZKoszyka = (index) => {
    setKoszyk((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/admin-magazyn" element={<MagazynPanel />} />
        <Route path="/admin-raport" element={<RaportSprzedazy />} />
        <Route path="/kucharz-panel" element={<KucharzPanel />} />
        <Route
          path="/pracownik"
          element={
            <PracownikWidok
              koszyk={koszyk}
              dodajDoKoszyka={dodajDoKoszyka}
              usunZKoszyka={usunZKoszyka}
              setKoszyk={setKoszyk}
            />
          }
        />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
