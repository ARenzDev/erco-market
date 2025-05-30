import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DashboardSeller: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [quantityKwh, setQuantityKwh] = useState("");
  const [pricePerKwh, setPricePerKwh] = useState("");
  const [windowStart, setWindowStart] = useState("");
  const [windowEnd, setWindowEnd] = useState("");

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const startUTC = new Date(windowStart).toISOString();
      const endUTC = new Date(windowEnd).toISOString();
      const response = await axios.post(
        "http://localhost:4000/api/offers",
        {
          quantityKwh,
          pricePerKwh,
          windowStart: startUTC,
          windowEnd: endUTC,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(localStorage.getItem("token"));
      console.log("Oferta creada:", response.data);
      setShowModal(false);

      // Limpiar inputs
      setQuantityKwh("");
      setPricePerKwh("");
      setWindowStart("");
      setWindowEnd("");
    } catch (error) {
      console.error("Error al crear la oferta:", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Encabezado con botón Salir a la derecha */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Salir
        </button>
      </div>

      {/* Subtítulo y botón crear oferta centrado */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Bienvenido, vendedor</h1>

        <p className="mb-4">
          Desde aquí puedes gestionar tus ofertas de energía.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Crear nueva oferta
        </button>
      </div>

      {/* Modal para nueva oferta */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Nueva oferta</h2>
            <form onSubmit={handleCreateOffer}>
              <label className="block mb-2">
                Cantidad (kWh)
                <input
                  type="number"
                  value={quantityKwh}
                  onChange={(e) => setQuantityKwh(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <label className="block mb-2">
                Precio por kWh
                <input
                  type="number"
                  value={pricePerKwh}
                  onChange={(e) => setPricePerKwh(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <label className="block mb-2">
                Fecha/Hora inicio
                <input
                  type="datetime-local"
                  value={windowStart}
                  onChange={(e) => setWindowStart(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <label className="block mb-4">
                Fecha/Hora fin
                <input
                  type="datetime-local"
                  value={windowEnd}
                  onChange={(e) => setWindowEnd(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSeller;
