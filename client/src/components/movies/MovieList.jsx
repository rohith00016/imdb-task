import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, deleteMovie } from "../../redux/actions/movieActions";
import {
  addToWatchlist,
  removeFromWatchlist,
  fetchWatchlist,
} from "../../redux/actions/watchListActions";
import { Link, useNavigate } from "react-router-dom";
import SkeletonMovieCard from "../skeletons/SkeletonMovieCard";
const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth?.authUser?._id);
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
  const watchlist = useSelector((state) => state.users.watchlist);
  const [watchlistMap, setWatchlistMap] = useState({});

  useEffect(() => {
    console.log(userId);
    dispatch(fetchMovies(navigate));
    dispatch(fetchWatchlist(userId));
  }, [dispatch]);

  useEffect(() => {
    const watchlistMovieIds = {};
    watchlist?.forEach((movie) => {
      watchlistMovieIds[movie?._id] = true;
    });
    setWatchlistMap(watchlistMovieIds);
  }, [watchlist]);

  const handleDelete = (movieId) => {
      dispatch(deleteMovie(movieId, navigate));
    
  };

  const handleAddToWatchlist = (movieId) => {
    dispatch(addToWatchlist(userId, movieId));
  };

  const handleRemoveFromWatchlist = (movieId) => {
    dispatch(removeFromWatchlist(userId, movieId));
  };

  const isMovieInWatchlist = (movieId) => {
    return watchlistMap[movieId] || false; 
  };

  return (
    <div>
      <div className="flex justify-end items-center mx-16 my-4 gap-16">
        <div>
          <Link to="/add-movie" className="btn btn-warning">
            Add Movie
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(3)
              .fill()
              .map((_, index) => <SkeletonMovieCard key={index} />)
          ) : movies.length === 0 ? (
            <div className="text-center mt-6">
              <p className="text-lg font-semibold">No Movies found</p>
              <p>Add Movies to see them listed here.</p>
            </div>
          ) : (
            movies?.map((movie) => (
              <div
                key={movie?._id}
                className="card card-side bg-base-100 shadow-xl"
              >
                <figure className="w-full max-w-[200px]">
                  <img
                    src={movie?.poster}
                    alt="Movie"
                    className="w-full h-auto object-cover"
                  />
                </figure>
                <div className="card-body">
                  <div className="card-title flex items-center justify-between">
                    <div>{movie?.name}</div>
                    <div className="flex">
                      <Link to={`/update-movie/${movie?._id}`} className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(movie?._id)}
                        className=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                    {movie?.yearOfRelease}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                    {movie?.plot}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    {movie?.producer?.name}
                  </p>
                  <p className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>

                    {movie?.actors?.map((actor) => actor.name).join(", ")}
                  </p>
                  <div className="card-actions justify-end mt-2">
                    {isMovieInWatchlist(movie?._id) ? (
                      <button
                        className="btn btn-outline text-warning"
                        onClick={() => handleRemoveFromWatchlist(movie?._id)}
                      >
                        Del
                      </button>
                    ) : (
                      <button
                        className="btn  btn-outline text-warning"
                        onClick={() => handleAddToWatchlist(movie?._id)}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
