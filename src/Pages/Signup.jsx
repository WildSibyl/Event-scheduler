import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Signup = () => {
  const [formData, setFormData] = useState({
    // username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-purple-400 to-purple-200 shadow:md ">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          className="w-full p-2 border rounded my-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded my-2 mb-6"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-gradient-to-b from-purple-400 to-purple-200 font-medium text-xl rounded cursor-pointer hover:bg-blue-200"
        >
          Sign Up
        </button>

        <h1 className=" p-2 font-medium text-blue-600 underline cursor-pointer mt-4 text-center">
          <Link to="/login">Already have an account?</Link>
        </h1>
      </form>
    </div>
  );
};

export default Signup;
