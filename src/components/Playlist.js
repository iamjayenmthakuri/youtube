import React, { useState } from "react";
import useFetch from "./useFetch";
import Items from "./Items";

const Mapping = () => {
  const [playlistId, setPlaylistId] = useState(null); // initial state is null

  const handleClick = (id) => {
    setPlaylistId(id);
  };

  const { data, isPending, error } = useFetch(
    `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${process.env.REACT_APP_CHANNELID}&maxResults=5&key=${process.env.REACT_APP_API_KEY}`
  );

  if (isPending) {
    return <div className="loading"></div>;
  }

  if (error) {
    return (
      <div className="error">
        {error}:<br></br>
        <span> Something Went Wrong. TRY AGAIN!!!</span>
        <a href="http://localhost:3000/">Click Here :http://localhost:3000/ </a>
      </div>
    );
  }

  return (
    <div>
      <div className="playlist-heading-container">
        <h1 className="my-playlist-heading">
          Youtube <span>Playlist</span>
        </h1>
        {playlistId ? (
          playlistId && <Items playlistId={playlistId} />
        ) : (
          <div className="playlist-grid">
            {data.map((item) => (
              <div
                key={item.id}
                className="playlist-card"
                onClick={() => handleClick(item.id)}
              >
                <img
                  src={item.snippet.thumbnails.high.url}
                  alt={item.snippet.title}
                  className="thumbnail"
                />
                <div className="info">
                  <h2 className="title">{item.snippet.title}</h2>
                  <p className="description">{item.snippet.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mapping;
