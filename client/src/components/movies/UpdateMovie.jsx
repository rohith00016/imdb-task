import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieById, updateMovie } from "../../redux/actions/movieActions";
import { fetchProducers } from "../../redux/actions/producerActions";
import { fetchActors } from "../../redux/actions/actorActions";
import Select from "react-select";

const UpdateMovie = () => {
  const movieId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieLoading = useSelector((state) => state.movies.loading);
  const actors = useSelector((state) => state.actors.actors);
  const producers = useSelector((state) => state.producers.producers);
  const movie = useSelector((state) => state.movies.movie);

  const [formData, setFormData] = useState({
    name: "",
    yearOfRelease: "",
    plot: "",
    producer: "",
    actors: [],
    poster: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchMovieById(movieId, navigate));
    dispatch(fetchProducers(navigate));
    dispatch(fetchActors(navigate));
    console.log(actors);
  }, [dispatch, movieId]);

  useEffect(() => {
    if (movie) {
      setFormData({
        name: movie.name || "",
        yearOfRelease: movie.yearOfRelease || "",
        plot: movie.plot || "",
        producer: movie.producer._id || "",
        actors: movie.actors.map((actor) => actor._id) || [],
        poster: movie.poster || null,
      });
    }
  }, [movie]);

  const handleAddActor = (actorId) => {
    if (!formData.actors.includes(actorId)) {
      setFormData({
        ...formData,
        actors: [...formData.actors, actorId],
      });
    }
  };
  const handleActorChange = (selectedOptions) => {
    setFormData({
      ...formData,
      actors: selectedOptions.map((option) => option.value),
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, poster: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.yearOfRelease) {
      newErrors.yearOfRelease = "Year of Release is required";
      isValid = false;
    }

    if (!formData.plot.trim()) {
      newErrors.plot = "Plot is required";
      isValid = false;
    }

    if (!formData.producer.trim()) {
      newErrors.producer = "Producer is required";
      isValid = false;
    }

    if (formData.actors.length === 0) {
      newErrors.actors = "At least one actor is required";
      isValid = false;
    }

    if (!formData.poster) {
      newErrors.poster = "Poster is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const movieData = new FormData();
      movieData.append("name", formData.name);
      movieData.append("yearOfRelease", formData.yearOfRelease);
      movieData.append("plot", formData.plot);
      movieData.append("producer", formData.producer);
      movieData.append("poster", formData.poster);

      formData.actors.forEach((actorId) => {
        movieData.append("actors[]", actorId);
      });

      dispatch(updateMovie(movieId, movieData, navigate));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <h2 className="text-2xl font-bold mb-4">Update Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="md:flex md:space-x-4">
          <div className="md:flex-1">
            <div className="form-control">
              <label className="label">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>
          </div>
          <div className="md:flex-1">
            <div className="form-control">
              <label className="label">Year of Release:</label>
              <input
                type="number"
                name="yearOfRelease"
                value={formData.yearOfRelease}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.yearOfRelease && (
                <span className="text-red-500">{errors.yearOfRelease}</span>
              )}
            </div>
          </div>
        </div>
        <div className="form-control">
          <label className="label">Plot:</label>
          <textarea
            name="plot"
            value={formData.plot}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.plot && <span className="text-red-500">{errors.plot}</span>}
        </div>
        <div className="form-control">
          <label className="label">Producer:</label>
          <Select
            name="producer"
            options={producers.map((producer) => ({
              value: producer._id,
              label: producer.name,
            }))}
            classNamePrefix="select"
            value={producers
              .filter((producer) => producer._id === formData.producer)
              .map((producer) => ({
                value: producer._id,
                label: producer.name,
              }))}
            onChange={(selectedOption) =>
              setFormData({
                ...formData,
                producer: selectedOption ? selectedOption.value : "",
              })
            }
          />

          {errors.producer && (
            <span className="text-red-500">{errors.producer}</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Actors:</span>
          </label>{" "}
          <Select
            isMulti
            name="actors"
            options={actors.map((actor) => ({
              value: actor._id,
              label: actor.name,
            }))}
            classNamePrefix="select"
            value={actors
              .filter((actor) => formData.actors.includes(actor._id))
              .map((actor) => ({
                value: actor._id,
                label: actor.name,
              }))}
            onChange={handleActorChange}
          />
          {errors.actors && (
            <span className="text-red-500">{errors.actors}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Poster:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
          {errors.poster && (
            <span className="text-red-500">{errors.poster}</span>
          )}
        </div>
        <button type="submit" className="btn btn-warning mt-4 w-full">
          {movieLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Update Movie"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
