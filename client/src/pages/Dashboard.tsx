import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Offer {
  _id: string;
  seller: { _id: string; email: string };
  quantityKwh: number;
  pricePerKwh: number;
  windowStart: string;
  windowEnd: string;
  status: string;
}
const Dashboard: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/offers/active"
        );
        console.log("Respuesta del backend:", response.data); // <-- Añade esto

        setOffers(response.data);
      } catch (err) {
        console.error("Error fetching offers:", err);
        setError("No se pudieron obtener las ofertas");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleBuy = async (offerId: string) => {
    try {
      await axios.post(
        `http://localhost:4000/api/offers/${offerId}/buy`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("¡Compra realizada con éxito!");
      // Opcionalmente, refresca la lista de ofertas
      setOffers((prev) => prev.filter((o) => o._id !== offerId));
    } catch (err) {
      console.error("Error buying offer:", err);
      alert("Error al comprar la oferta.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-center w-full">
          Ofertas activas
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded ml-auto"
        >
          Salir
        </button>
      </div>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="bg-white p-4 rounded shadow flex flex-col justify-between"
            >
              <div>
                <p className="font-semibold">Vendedor: {offer.seller.email}</p>
                <p>Cantidad: {offer.quantityKwh} kWh</p>
                <p>Precio por kWh: ${offer.pricePerKwh}</p>
                <p>
                  Inicio: {new Date(offer.windowStart).toLocaleString()}
                  <br />
                  Fin: {new Date(offer.windowEnd).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleBuy(offer._id)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
