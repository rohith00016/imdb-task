import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActor } from "../../redux/actions/actorActions";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const AddActor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.actors.loading);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
    profilePic: null,
  });
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
      valid = false;
    }

    if (!formData.bio) {
      newErrors.bio = "Bio is required";
      valid = false;
    }

    if (!formData.profilePic) {
      newErrors.profilePic = "Profile Picture is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const actorData = new FormData();
      actorData.append("name", formData.name);
      actorData.append("gender", formData.gender);
      actorData.append("dob", formData.dob);
      actorData.append("bio", formData.bio);
      actorData.append("profilePic", formData.profilePic);
      dispatch(addActor(actorData, navigate));
      setFormData({
        name: "",
        gender: "",
        dob: "",
        bio: "",
        profilePic: null,
      });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-2">Add Actor</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
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
            <span className="label-text">Gender:</span>
          </label>
          <Select
            name="gender"
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
            classNamePrefix="select"
            value={
              formData.gender
                ? { value: formData.gender, label: formData.gender }
                : null
            }
            onChange={(selectedOption) =>
              setFormData({
                ...formData,
                gender: selectedOption ? selectedOption.value : "",
              })
            }
          />
          {errors.gender && (
            <span className="text-red-500">{errors.gender}</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date of Birth:</span>
          </label>
          <input
            type="date"
            name="dob"
            className="input input-bordered w-full"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <span className="text-red-500">{errors.dob}</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Bio:</span>
          </label>
          <textarea
            name="bio"
            className="textarea textarea-bordered w-full"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
          {errors.bio && <span className="text-red-500">{errors.bio}</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile Picture:</span>
          </label>
          <input
            type="file"
            name="profilePic"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
          />
          {errors.profilePic && (
            <span className="text-red-500">{errors.profilePic}</span>
          )}
        </div>
        <button type="submit" className="btn btn-warning w-full">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Add Actor"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddActor;
