import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducer } from "../../redux/actions/producerActions";
import { useNavigate } from "react-router-dom";
import Select from "react-select";


const AddProducer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.producers.loading);
  const [producerData, setProducerData] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
    profilePic: null,
  });
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    setProducerData({ ...producerData, profilePic: e.target.files[0] });
  };

  const handleChange = (e) => {
    setProducerData({ ...producerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    // Name validation
    if (!producerData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Gender validation
    if (!producerData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    // Date of Birth validation
    if (!producerData.dob) {
      newErrors.dob = "Date of Birth is required";
      isValid = false;
    }

    // Bio validation
    if (!producerData.bio.trim()) {
      newErrors.bio = "Bio is required";
      isValid = false;
    }

    // Profile Picture validation
    if (!producerData.profilePic) {
      newErrors.profilePic = "Profile Picture is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const formData = new FormData();
      formData.append("name", producerData.name);
      formData.append("gender", producerData.gender);
      formData.append("dob", producerData.dob);
      formData.append("bio", producerData.bio);
      formData.append("profilePic", producerData.profilePic);

      dispatch(addProducer(formData, navigate));
      setProducerData({
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
      <h3 className="text-2xl font-bold mb-2">Add New Producer</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            value={producerData.name}
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
              producerData.gender
                ? { value: producerData.gender, label: producerData.gender }
                : null
            }
            onChange={(selectedOption) =>
              setProducerData({
                ...producerData,
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
            value={producerData.dob}
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
            value={producerData.bio}
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
            "Add Producer"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProducer;
