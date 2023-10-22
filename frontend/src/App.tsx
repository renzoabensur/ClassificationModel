import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TopBar from './containers/bar/TopBar';
import UploadVideo from './containers/video/UploadVideo';
import RealTime from './containers/video/RealTime';
import Homepage from './containers/homepage/Homepage';


const App: React.FC = () => {
    return (
        <Router>
            <TopBar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/uploadvideo" element={<UploadVideo />} />
              <Route path="/realtime" element={<RealTime />} />
            </Routes>
        </Router>
    );
}

export default App;
