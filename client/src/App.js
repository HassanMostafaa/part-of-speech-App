import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { PracticePage } from "./pages/PracticePage";
import { RankPage } from "./pages/RankPage";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<PracticePage />} />
        <Route path="/rank" element={<RankPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
