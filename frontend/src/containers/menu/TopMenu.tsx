import React, { useState, useEffect } from 'react';

import { ENDPOINTS }from '../../config';


function TopMenu() {
    const [message, setMessage] = useState('');

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(ENDPOINTS.HOME);
          const data = await response.text();
          setMessage(data);
        } catch (error) {
          console.error('There was an error fetching data', error);
        }
      }
  
      fetchData();
    }, []);
  
  
    const sendData = async () => {
      try {
        const response = await fetch(ENDPOINTS.GET_DATA, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            key: 'value' // Your data goes here
          })
        });
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error sending data', error);
      }
    };

    return(
        <div>
            <p>
            get
            {message}
        </p>

        <p>
            post
            <button onClick={sendData}>Send Data</button>
        </p>
        </div>
    )
  
}

export default TopMenu;