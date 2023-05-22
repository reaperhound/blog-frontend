import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registration successful");
    } else {
      alert("registration failed");
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1 className="text-3xl font-bold p-7">Register</h1>
      <input
        type="text"
        className="input w-full my-5 bg-slate-100 border border-gray-500"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        className="input w-full my-5 bg-slate-100 border border-gray-500"
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button className="btn">Register</button>
    </form>
  );
}
