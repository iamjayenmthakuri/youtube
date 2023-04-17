import React, { useState } from "react";
import useFetch from "./useFetch";
import Items from "./Items";
import ReactPaginate from "react-paginate";
import "./style.css";

const Mapping = () => {
  const [playlistId, setPlaylistId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0); // add a new state for page number

  const handleClick = (id) => {
    setPlaylistId(id);
  };

  const { data, isPending, error } = useFetch(
    `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${process.env.REACT_APP_CHANNELID}&maxResults=20&key=${process.env.REACT_APP_API_KEY}`
  );

  const itemsPerPage = 4; // number of items to display per page
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const displayData = data.slice(pagesVisited, pagesVisited + itemsPerPage); // slice the data to display only items for the current page

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected); // update the current page number when the user clicks on a new page
  };

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
          <div className="main">
            <div className="playlist-grid">
              {displayData.map((item) => (
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
                    {/* <p className="description">{item.snippet.description}</p> */}
                  </div>
                </div>
              ))}
            </div>
            <div className="pagee">
              <ReactPaginate
                pageCount={pageCount} // total number of pages
                marginPagesDisplayed={2}
                pageRangeDisplayed={10}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mapping;
