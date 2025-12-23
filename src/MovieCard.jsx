import NoImage from "./assets/no-image.png";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie">
      <div>
        <p>{movie.overview}</p>
      </div>

      <div>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : NoImage
          }
          alt={movie.title}
        />
      </div>

      <div>
        <span>{movie.release_date?.slice(0, 4)}</span>
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
