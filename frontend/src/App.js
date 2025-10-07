import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import ChatRoom from "./pages/ChatRoom";
import MusicStudio from "./pages/MusicStudio";
import VideoHub from "./pages/VideoHub";
import BandLab from "./pages/BandLab";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/chat/:id" element={<ChatRoom />} />
          <Route path="/music" element={<MusicStudio />} />
          <Route path="/videos" element={<VideoHub />} />
          <Route path="/studio" element={<BandLab />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;