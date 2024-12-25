import React from 'react';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="max-w-md w-full p-6 border-2 border-black rounded shadow-sm bg-white">
        <h6 className="text-sm font-semibold mb-4">Login</h6>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-1 border rounded text-l"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-1 border rounded text-sm"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Log In</button>
        </form>
      </div>
    </div>
  );
}

export { Login };
