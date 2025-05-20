import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [login, setLogin] = useState("");
  const [haslo, setHaslo] = useState("");
  const [blad, setBlad] = useState("");
  const navigate = useNavigate();

  const zaloguj = () => {
    if (login === "admin" && haslo === "1234") {
      navigate("/admin-panel");
    } else {
      setBlad("Nieprawidłowy login lub hasło.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold mb-6">🛠 Logowanie administratora</h1>

      <input
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Login"
        className="mb-4 w-full max-w-sm p-2 rounded bg-neutral-800 border border-neutral-600"
      />
      <input
        type="password"
        value={haslo}
        onChange={(e) => setHaslo(e.target.value)}
        placeholder="Hasło"
        className="mb-4 w-full max-w-sm p-2 rounded bg-neutral-800 border border-neutral-600"
      />

      <button
        onClick={zaloguj}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
      >
        Zaloguj się
      </button>

      {blad && <p className="text-red-400 mt-4">{blad}</p>}
    </div>
  );
}
