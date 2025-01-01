import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !department) {
      alert("Please fill all fields");
      return;
    }
    axios
      .post("/api/user/signUp", { name, email, password, department })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
    style={{
      background: "radial-gradient(circle, #CBE3ED, white)",
    }}>
       
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg relative">
        <h2 className="text-3xl font-bold text-left text-[#265669] mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-md font-medium text-[#367896] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              required
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-md font-medium text-[#367896] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              required
            />
          </div>
          {/* Department */}
          <div className="mb-4">
            <label htmlFor="department" className="block text-md font-medium text-[#367896] mb-2">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter your department"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-md font-medium text-[#367896] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              required
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 rounded-full bg-[#F4DCA7] border-2 border-[#F4C172] text-[#265669] font-semibold hover:shadow-md transition-all"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-[#8AB6B9] border-2 border-[#387E9A] text-white font-semibold hover:shadow-md transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { SignUp };
