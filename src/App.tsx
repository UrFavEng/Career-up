import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, GetMe, Login, Navbar, Signup } from "./components";

function App() {
  return (
    <div className="App flex flex-col justify-between min-h-[100vh]">
      <Navbar />
      <Routes>
        <Route path="/myprofile/:id" element={<GetMe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
