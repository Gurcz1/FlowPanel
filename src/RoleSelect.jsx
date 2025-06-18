import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  const wybierzRole = (rola) => {
    navigate(`/${rola}`);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-8">FlowPanel</h1>
      <p className="text-lg text-neutral-400 mb-10">Wybierz swoją rolę, aby kontynuować:</p>

      <div className="grid gap-6 w-full max-w-md">
        <button
          onClick={() => wybierzRole("pracownik")}
          className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-6 py-4 text-left transition shadow-md"
        >
          <div className="text-xl font-semibold">👤 Pracownik Obsługi</div>
          <div className="text-sm text-neutral-400">Obsługa zamówień i płatności</div>
        </button>

        <button
          onClick={() => wybierzRole("kucharz-panel")}
          className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-6 py-4 text-left transition shadow-md"
        >
          <div className="text-xl font-semibold">👨‍🍳 Kucharz</div>
          <div className="text-sm text-neutral-400">Realizacja zamówień w kuchni</div>
        </button>

        <button
          onClick={() => wybierzRole("admin")}
          className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg px-6 py-4 text-left transition shadow-md"
        >
          <div className="text-xl font-semibold">🛠 Administrator</div>
          <div className="text-sm text-neutral-400">Zarządzanie systemem i raporty</div>
        </button>
      </div>
    </div>
  );
}
