import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    password: "",
    profilePic: null,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  isLoading = useSelector((state) => state.auth.isLoading);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData((prevData) => ({
      ...prevData,
      profilePic: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    if (!userData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!userData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!userData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    if (!userData.password.trim().length >= 4) {
      newErrors.password = "Password should be 4 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      const formData = new FormData();
      formData.append("fullName", userData.fullName);
      formData.append("username", userData.username);
      formData.append("password", userData.password);
      formData.append("profilePic", userData.profilePic);
      dispatch(signupUser(formData, navigate));
    }
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "calc(100vh - 70px)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Signup</h2>
        <input
          type="text"
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="input input-bordered mb-2"
        />
        {errors.fullName && (
          <div className="text-red-500 text-sm">{errors.fullName}</div>
        )}
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
          className="input input-bordered mb-2"
        />
        {errors.username && (
          <div className="text-red-500 text-sm">{errors.username}</div>
        )}
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
          className="input input-bordered mb-2"
        />
        {errors.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <div className="flex items-center mb-2">
          <input
            type="file"
            name="profilePic"
            onChange={handleFileChange}
            className="input input-bordered flex-1 mr-2"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-warning"
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Signup"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
