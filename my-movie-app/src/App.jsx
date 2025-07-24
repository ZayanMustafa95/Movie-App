import React, { useState, useEffect } from "react";
import Heroimg from "../public/hero-img.png";
import Logo from "../public/logo.svg";
import BG from "../public/BG.png";
import Search from "./Components/Search";
import Spinner from "./Components/Spinner";
import MovieCards from "./Components/MovieCards";
import { useDebounce } from "react-use";
import { getTrendingMovies, initAppwrite, updateSearchCount } from "./app-write";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMBD_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    initAppwrite();
  }, []);

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setisLoading(true);
    setErrorMessage("");
    try {
      const endpoints = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoints, API_OPTIONS);

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      if (data.Response === "False") {
        setErrorMessage(data.error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch {
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setisLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch {}
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect( () => {
    loadTrendingMovies ();
  }, []

  );

  return (
    <main
      style={{ backgroundImage: `url(${BG})` }}
      className="bg-[length:auto] bg-no-repeat bg-top"
    >
      <div className="pattren" />
      <div className="wrapper">
        <header>
          <img src={Logo} alt="logo img" className="w-[96px] h-auto" />
          <img src={Heroimg} alt="Hero img" />
          <h1>
            Find <span className="text-gradient">Movies</span> That You'll Will
            Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>



{trendingMovies.length > 0 && (
  <section className="trending">
    <h2>Trending Movies</h2>

    <ul>
      {trendingMovies.map((movie, index) => (
        <li key={movie.$id}>
          <p>{index + 1}</p>
          <img src={movie.poster_url} alt={movie.searchTerm} />
          
        </li>
      ))}
    </ul>
  </section>
)}


        
        <section className="all-movies">
          <h2 className="">Popular</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCards key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
