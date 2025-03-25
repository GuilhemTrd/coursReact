import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Leaderboard } from './components/leaderboard/Leaderboard.tsx';
import { UploadForm } from './components/uploadform/UploadForm.tsx';
import { Navbar } from './components/Navbar.tsx';
import { Duel } from './components/duel/Duel.tsx';


const AppRouter = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Duel />} />
                    <Route path="/duel" element={<Duel />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/upload" element={<UploadForm />} />
                </Routes>
            </Router>
        </div>
    );
};


export default AppRouter;