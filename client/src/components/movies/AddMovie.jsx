import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../../redux/actions/movieActions";
import { fetchActors } from "../../redux/actions/actorActions";
import { fetchProducers } from "../../redux/actions/producerActions";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieLoading = useSelector((state) => state.movies.loading);
  const actorLoading = useSelector((state) => state.actors.loading);
  const producerLoading = useSelector((state) => state.producers.loading);
  const actors = useSelector((state) => state.actors.actors);
  const producers = useSelector((state) => state.producers.producers);

  const [formData, setFormData] = useState({
    name: "",
    plot: "",
    yearOfRelease: "",
    poster: null,
    description: "",
    actors: [],
    producer: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchActors(navigate));
    dispatch(fetchProducers(navigate));
  }, [dispatch, navigate]);

  const handleFileChange = (e) => {
    setFormData({ ...formData, poster: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleActorChange = (selectedOptions) => {
    setFormData({
      ...formData,
      actors: selectedOptions.map((option) => option.value),
    });
  };

  const handleProducerChange = (selectedOption) => {
    setFormData({
      ...formData,
      producer: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.plot.trim()) {
      newErrors.plot = "Plot is required";
      isValid = false;
    }

    if (!formData.yearOfRelease.trim()) {
      newErrors.yearOfRelease = "Release Year is required";
      isValid = false;
    }

    if (formData.actors.length === 0) {
      newErrors.actors = "At least one actor is required";
      isValid = false;
    }

    if (!formData.producer) {
      newErrors.producer = "Producer is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
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
      movieData.append("plot", formData.plot);
      movieData.append("yearOfRelease", formData.yearOfRelease);
      movieData.append("description", formData.description);
      movieData.append("producer", formData.producer);
      movieData.append("poster", formData.poster);

      formData.actors.forEach((actorId) => {
        movieData.append("actors[]", actorId);
      });

      try {
        await dispatch(addMovie(movieData, navigate));
        setFormData({
          name: "",
          plot: "",
          yearOfRelease: "",
          poster: null,
          description: "",
          actors: [],
          producer: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error adding movie:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-screen-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
      {(movieLoading || actorLoading || producerLoading) && (
        <span className="loading loading-spinner"></span>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Plot:</span>
          </label>
          <input
            type="text"
            name="plot"
            className="input input-bordered w-full"
            value={formData.plot}
            onChange={handleChange}
          />
          {errors.plot && <span className="text-red-500">{errors.plot}</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Release Year:</span>
          </label>
          <input
            type="number"
            name="yearOfRelease"
            className="input input-bordered w-full"
            value={formData.yearOfRelease}
            onChange={handleChange}
            min="1800"
            max={new Date().getFullYear()}
          />
          {errors.yearOfRelease && (
            <span className="text-red-500">{errors.yearOfRelease}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Actors:</span>
          </label>
          <Select
            isMulti
            name="actors"
            options={actors.map((actor) => ({
              value: actor._id,
              label: actor.name,
            }))}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleActorChange}
          />
          {errors.actors && (
            <span className="text-red-500">{errors.actors}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Producer:</span>
          </label>
          <Select
            name="producer"
            options={producers.map((producer) => ({
              value: producer._id,
              label: producer.name,
            }))}
            className="basic-single-select h-[20px]"
            classNamePrefix="select"
            onChange={handleProducerChange}
          />
          {errors.producer && (
            <span className="text-red-500 mt-5">{errors.producer}</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description:</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && (
            <span className="text-red-500">{errors.description}</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Poster:</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
          />
          {errors.poster && (
            <span className="text-red-500">{errors.poster}</span>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-warning mt-4 col-span-full md:col-span-2 lg:col-span-3"
        >
          {movieLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Add Movie"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
