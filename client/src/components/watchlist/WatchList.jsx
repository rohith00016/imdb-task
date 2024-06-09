import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWatchlist,
  removeFromWatchlist,
} from "../../redux/actions/watchListActions";
import { fetchProducers } from "../../redux/actions/producerActions";
import { fetchActors } from "../../redux/actions/actorActions";
import { useNavigate } from "react-router-dom";
import SkeletonRow from "../skeletons/SkeletonRow"; 

const WatchList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.authUser?._id);
  const watchlist = useSelector((state) => state.users.watchlist);
  const producers = useSelector((state) => state.producers.producers);
  const actors = useSelector((state) => state.actors.actors);
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(fetchWatchlist(userId, navigate));
    dispatch(fetchProducers(navigate));
    dispatch(fetchActors(navigate));
  }, [dispatch, userId, navigate]);

  const handleRemove = (movieId) => {
    dispatch(removeFromWatchlist(userId, movieId, navigate));
  };

  const getProducerName = (producerId) => {
    const producer = producers?.find((producer) => producer._id === producerId);
    return producer ? producer.name : "Unknown";
  };

  const getActorNames = (actorIds) => {
    return actorIds
      .map((actorId) => {
        const actor = actors?.find((actor) => actor._id === actorId);
        return actor && actor.name;
      })
      .filter(Boolean)
      .join(", ");
  };

  return (
    <>
      <div className="flex justify-end w-5/6 my-6"></div>
      <div className="flex justify-center my-8">
        <div className="overflow-y-auto w-3/4">
          {loading ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Producer</th>
                  <th>Cast</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill()
                  .map((_, index) => (
                    <SkeletonRow key={index} />
                  ))}
              </tbody>
            </table>
          ) : watchlist.length === 0 ? (
            <div className="text-center mt-6">
              <p className="text-lg font-semibold">Your watchlist is empty</p>
              <p>Add movies to your watchlist to see them here.</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Producer</th>
                  <th>Cast</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((movie) => (
                  <tr key={movie._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={movie.poster} alt="Producer" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{movie.name}</div>
                          <span className="badge badge-ghost badge-sm">
                            {movie.plot}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{movie.yearOfRelease}</td>
                    <td>{getProducerName(movie.producer)}</td>
                    <td>{getActorNames(movie.actors)}</td>
                    <td>
                      <button
                        onClick={() => handleRemove(movie._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default WatchList;
