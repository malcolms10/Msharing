import React, { useState, useEffect } from "react";
import { RadioBrowserApi } from 'radio-browser-api';
import imgem from './istockphoto-1285091155-612x612.jpeg'

export default function RadioC() {
  const api = new RadioBrowserApi('My Radio App');
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stationsData = await api.searchStations({
          country: 'Angola',
          limit: 100,
        });
        setStations(stationsData);
      } catch (error) {
        console.error("Error fetching stations:", error);
        // Handle error or display an error message
      }
    };

    fetchStations();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className="border-2 rounded-lg border-gray-100">
      <div className="grid grid-cols-2 gap-6 content-around ml-2 mt-2">
        {stations.map((station, index) => (
          <div className="station" key={index}>
            <div className="stationName">
              <figure className="w-400 h-400 overflow-hidden">
                {/* Replace the "Image" component with an <img> tag */}
                <img
                  src={imgem}
                  alt="Radio Stations"
                  width={400}
                  height={30}
                  className="bg-cover rounded-md object-contain"
                />
                <div className="name">{station.name}</div>
              </figure>
            </div>

            {/* Use an <audio> tag to play the radio station */}
            <audio
              className="h-10 my-6"
              controls
              src={station.urlResolved}
            ></audio>
          </div>
        ))}
      </div>
    </div>
  );
}
