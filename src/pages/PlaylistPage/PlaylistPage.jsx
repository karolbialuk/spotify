import { React, useEffect, useState } from "react";
import "./PlaylistPage.scss";
import { LeftSidebar, Navbar, Player, PlaylistSongs } from "../../components";
import { useFetchDevicesQuery } from "../../store";
import { Location, useLocation } from "react-router-dom";
import { useActivateDeviceMutation } from "../../store";
import axios from "axios";

const PlaylistPage = ({ token }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(
          "https://api.spotify.com/v1/me/player/devices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.devices.length > 0) {
          setDevices(data.devices);

          return;
        }

        setTimeout(fetchDevices, 1000);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, []);

  if (localStorage.getItem("accessToken")) {
    return (
      <>
        <div className="root">
          <LeftSidebar token={token} />
          <div className="root__main-container">
            <Navbar />
            <PlaylistSongs token={token} devices={devices} />
          </div>
        </div>
        <Player token={token} />
      </>
    );
  } else {
    window.location.replace("/");
  }
};

export { PlaylistPage };
