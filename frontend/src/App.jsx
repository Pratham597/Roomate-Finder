import Home from "./Components/Home.jsx";
import { SignUp } from "./Components/Sign_up.jsx";
import { Login } from "./Components/Log_in.jsx";
import Matches from "./Components/Top_matches.jsx";
// import Chat from "./Components/Chat.jsx";
// import Profile from "./Components/Profile.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/topmatches" element={<Matches />} />
        {/* <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
