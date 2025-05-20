export default function Orders({ zamowienia }) {
  const kolory = {
    "przyjęte": "bg-yellow-100 text-yellow-800",
    "w przygotowaniu": "bg-orange-100 text-orange-800",
    "gotowe": "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-neutral-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Zamówienia</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left text-neutral-400">
            <th className="p-2">ID</th>
            <th className="p-2">Klient</th>
            <th className="p-2">Status</th>
            <th className="p-2">Suma</th>
          </tr>
        </thead>
        <tbody>
          {zamowienia.map(z => (
            <tr key={z.id} className="border-t border-neutral-700 hover:bg-neutral-700 transition">
              <td className="p-2">{z.id}</td>
              <td className="p-2">{z.klient}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-sm ${kolory[z.status]}`}>
                  {z.status}
                </span>
              </td>
              <td className="p-2">{z.suma} zł</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
