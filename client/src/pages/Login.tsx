import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  email: string;
  role: "buyer" | "seller";
}

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      const decoded: DecodedToken = jwtDecode(res.data.token);

      // Redirigir según el rol
      if (decoded.role === "seller") {
        navigate("/dashboard-seller");
      } else {
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert("Error al iniciar sesión: " + err.response?.data?.message);
      } else {
        alert("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
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
          className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full p-3 mb-6  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;
