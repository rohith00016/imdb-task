import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const Logout= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };

  return (
    <button
      className="btn btn-warning"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
