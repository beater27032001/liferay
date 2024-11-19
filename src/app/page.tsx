"use client"
import { useState } from "react";
import Image from "next/image";
import logoBlue from "../../assets/logoBlue.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/users");
      const users = await response.json();

      const user = users.find((user: { email: string; password: string; }) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userId", user.id);
        window.location.href = "/home";
      } else {
        setError("Email ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do JSON", error);
      setError("Erro ao fazer login. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-liferayGrey h-screen w-screen">
      <div className="flex flex-col justify-center items-center py-10 px-16 border rounded-md bg-white gap-7">
        <Image src={logoBlue} alt="Liferay" width={300} />
        <div className="flex flex-col w-full gap-4">
          <input
            type="text"
            placeholder="Email"
            className="border text-black border-black py-1 rounded pl-2 placeholder:text-black w-full focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="border text-black border-black py-1 rounded pl-2 placeholder:text-black w-full focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleLogin}
            className="text-center mt-3 border bg-liferayGreen rounded px-12 py-2 focus:outline-none"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}