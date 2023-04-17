import "./App.css";
import useFetch from "./components/useFetch";

// Api : AIzaSyCHYbbXjaW_bC36BBrFEiqK2I1O9b64158

// const channelId = UCMiJRAwDNSNzuYeN2uWa0pA
const url =
  "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&id=PLflqtq8EOGALA&maxResults=10&key=AIzaSyCHYbbXjaW_bC36BBrFEiqK2I1O9b64158";
function Video() {
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

  return (
    <div>
      <div className="playlist-heading-container">
        <h1 className="my-playlist-heading">
          Youtube <span>Playlist</span>
        </h1>
        <div className="playlist-grid">
          {data.map((item) => (
            <div key={item.id} className="playlist-card">
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
      </div>
    </div>
  );
}
export default Video;
