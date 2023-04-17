import { useState } from "react";
import ReactPaginate from "react-paginate";
import useFetch from "./useFetch";

const Items = (props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const { playlistId } = props;
  const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${process.env.REACT_APP_API_KEY}`;
  const [detail, setDetail] = useState();
  const handleClick = (id) => {
    setDetail(id);
  };
  const { data, isPending, error } = useFetch(url);

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
  const itemsPerPage = 4; // number of items to display per page
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const displayData = data.slice(pagesVisited, pagesVisited + itemsPerPage); // slice the data to display only items for the current page

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected); // update the current page number when the user clicks on a new page
  };

  return (
    <div>
      <div className="playlist-grid">
        {displayData.map((item) => (
          <div
            key={item.id}
            className="playlist-cards"
            style={{ height: detail === item?.etag ? "500px" : "300px" }}
            onClick={() => handleClick(item.etag)}
          >
            {/* <img
              src={item.snippet.thumbnails.high.url}
              alt={item.snippet.title}
              className="thumbnail"
            /> */}
            <div className="info">
              {detail !== item?.etag ? (
                <>
                  <img
                    src={item.snippet.thumbnails.high.url}
                    alt={item.snippet.title}
                    className="thumbnail"
                  />
                </>
              ) : (
                <>
                  <img
                    src={item.snippet.thumbnails.high.url}
                    alt={item.snippet.title}
                    className="thumbnails"
                  />
                  <h2 className="title">{item.snippet.title}</h2>
                  <p className="author">Author:{item.snippet.channelTitle}</p>
                  <p className="publishedDate">
                    Published Date:{item.snippet.publishedAt}
                  </p>
                  <p className="description">
                    <span>Description:</span>
                    <br></br>
                    {item.snippet.description}
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        pageCount={pageCount} // total number of pages
        marginPagesDisplayed={2}
        pageRangeDisplayed={10}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default Items;
