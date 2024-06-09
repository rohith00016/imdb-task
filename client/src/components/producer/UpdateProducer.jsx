import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProducerById,
  updateProducer,
} from "../../redux/actions/producerActions";
import { formatDateInput } from "../../utils/formateDate";
import Select from "react-select";


const UpdateProducer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const producer = useSelector((state) => state.producers.producer);
  const loading = useSelector((state) => state.producers.loading);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
    profilePic: null, // Added state for profile picture
  });
  const [errors, setErrors] = useState({}); // State to manage errors

  useEffect(() => {
    dispatch(fetchProducerById(id, navigate));
  }, [dispatch, id]);

  useEffect(() => {
    if (producer) {
      setFormData({
        name: producer.name || "",
        gender: producer.gender || "",
        dob: producer.dob || "",
        bio: producer.bio || "",
        profilePic: producer.profilePic || null, // Reset profile picture state when producer data changes
      });
    }
  }, [producer]);

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      isValid = false;
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
      isValid = false;
    }

    // Bio validation
    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
      isValid = false;
    }

    // Profile Picture validation (optional, as it's not required in the update form)

    setErrors(newErrors);

    if (isValid) {
      const producerData = new FormData();
      producerData.append("name", formData.name);
      producerData.append("gender", formData.gender);
      producerData.append("dob", formData.dob);
      producerData.append("bio", formData.bio);
      producerData.append("profilePic", formData.profilePic);
      dispatch(updateProducer(id, producerData, navigate));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h3 className="text-2xl font-bold mb-2">Update Producer</h3>
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
            value={formatDateInput(formData.dob)}
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
        </div>
        <button type="submit" className="btn btn-warning w-full">
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProducer;
