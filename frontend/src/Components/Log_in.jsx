import React from 'react';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen"
    style={{
      background: "radial-gradient(circle, #CBE3ED, white)",
    }}>
      <div className="max-w-md w-full p-6 rounded-2xl shadow-lg bg-white rounded-[35px] shadow-[10px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <h6 className="text-3xl font-bold text-[#265669] mb-6">Login</h6>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-md font-semibold text-[#367896] mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-md font-semibold text-[#367896] mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border-2 border-[#385F6E] rounded-full bg-[#F5FEFF] focus:outline focus:border-#01090D focus:bg-white transition-all"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-[#8AB6B9] border-2 border-[#387E9A] text-white font-semibold hover:shadow-md transition-all"
            onClick={() => navigate("/topmatches")}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export { Login };
