import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "buyer" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/register`, form);
      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert("Error registrando usuario: " + err.response?.data?.message);
      } else {
        alert("Error registrando usuario");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="buyer">Comprador</option>
          <option value="seller">Vendedor</option>
        </select>
        <button
          type="submit"
          className="w-full p-3 mb-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
        >
          Registrarse
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Register;
