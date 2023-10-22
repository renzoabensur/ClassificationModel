import React from 'react';
import { Link } from 'react-router-dom';

const TopBar: React.FC = () => {
    return (
        <div className="top-bar">
             <Link to="/">
                <button>Homepage</button>
            </Link>
            <Link to="/video">
                <button>Go to Video</button>
            </Link>
            <Link to="/realtime">
                <button>Go to RealTime</button>
            </Link>
        </div>
    );
}

export default TopBar;