import React from 'react';
import Video from '../video/Video';
import RealTime from '../video/RealTime';
import TopMenu from '../menu/TopMenu'

function Homepage() {
  return (
    <div className="Homepage">
      <header className="Homepage-header">
        <div>
          <TopMenu/>
          {/* <Video /> */}
          <RealTime />
        </div>
      </header>
    </div>
  );
}

export default Homepage;
