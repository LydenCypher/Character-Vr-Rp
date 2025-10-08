import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import ChatRoom from "./pages/ChatRoom";
import MusicStudio from "./pages/MusicStudio";
import VideoHub from "./pages/VideoHub";
import BandLab from "./pages/BandLab";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { Toaster } from "./components/ui/toaster";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;