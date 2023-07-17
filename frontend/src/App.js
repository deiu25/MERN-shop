import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Footer } from "./components/leyout/Footer";
import { Header } from "./components/leyout/Header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
