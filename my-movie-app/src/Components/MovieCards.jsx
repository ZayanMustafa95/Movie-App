import { FaStar } from "react-icons/fa";
import Poster from "../../public/No-Poster.png";
import { updateSearchCount } from "../app-write";

const MovieCards = ({ movie }) => {
  if (!movie) return null;

  const { title, vote_average, poster_path, release_date, original_language } = movie;

  const handleClick = () => {
    updateSearchCount(title, movie);
  };

  return (
    <div className="movie-card cursor-pointer" onClick={handleClick}>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : Poster
        }
        alt={`Poster of ${title}`}
        className="rounded-lg"
      />

      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content items-center">
          <div className="rating flex items-center gap-1">
            <FaStar className="text-yellow-300" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>.</span>
          <p className="lang">{original_language}</p>
          <span>.</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCards;
