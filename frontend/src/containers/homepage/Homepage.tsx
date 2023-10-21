import React, { useState, useEffect } from 'react';
import Video from '../video/Video';
import TopMenu from '../menu/TopMenu'

function Homepage() {
  return (
    <div className="Homepage">
      <header className="Homepage-header">
        <div>
          <TopMenu/>
          <Video />
        </div>
      </header>
    </div>
  );
}

export default Homepage;
