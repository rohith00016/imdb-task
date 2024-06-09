import axios from "axios";
import toast from "react-hot-toast";
export const fetchActorsRequest = () => ({
  type: "FETCH_ACTORS_REQUEST",
});

export const fetchActorsSuccess = (actors) => ({
  type: "FETCH_ACTORS_SUCCESS",
  payload: actors,
});

export const fetchActorsFailure = (error) => ({
  type: "FETCH_ACTORS_FAILURE",
  payload: error,
});

export const fetchActorByIdSuccess = (actor) => ({
  type: "FETCH_ACTOR_BY_ID_SUCCESS",
  payload: actor,
});

export const fetchActorByIdFailure = (error) => ({
  type: "FETCH_ACTOR_BY_ID_FAILURE",
  payload: error,
});

export const addActorRequest = () => ({
  type: "ADD_ACTOR_REQUEST",
});

export const addActorSuccess = (actor) => ({
  type: "ADD_ACTOR_SUCCESS",
  payload: actor,
});

export const addActorFailure = (error) => ({
  type: "ADD_ACTOR_FAILURE",
  payload: error,
});

export const deleteActorRequest = () => ({
  type: "DELETE_ACTOR_REQUEST",
});

export const deleteActorSuccess = (actorId) => ({
  type: "DELETE_ACTOR_SUCCESS",
  payload: actorId,
});

export const deleteActorFailure = (error) => ({
  type: "DELETE_ACTOR_FAILURE",
  payload: error,
});

export const updateActorRequest = () => ({
  type: "UPDATE_ACTOR_REQUEST",
});

export const updateActorSuccess = (actor) => ({
  type: "UPDATE_ACTOR_SUCCESS",
  payload: actor,
});

export const updateActorFailure = (error) => ({
  type: "UPDATE_ACTOR_FAILURE",
  payload: error,
});

export const fetchActors = (navigate) => {
  return async (dispatch) => {
    dispatch(fetchActorsRequest());
    try {
      const response = await axios.get("/api/actors", {
        withCredentials: true,
      });
      dispatch(fetchActorsSuccess(response.data));
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);

      setTimeout(() => {
        dispatch(fetchActorsFailure(errorMessage));
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

export const fetchActorByIdRequest = () => ({
  type: "FETCH_ACTOR_BY_ID_REQUEST",
});

export const fetchActorById = (actorId, navigate) => {
  return async (dispatch) => {
    dispatch(fetchActorByIdRequest());
    try {
      const response = await axios.get(
        `/api/actors/${actorId}`,
        { withCredentials: true }
      );
      dispatch(fetchActorByIdSuccess(response.data));
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);

      setTimeout(() => {
        dispatch(fetchActorByIdFailure(errorMessage));
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

export const addActor = (actorData, navigate) => {
  return async (dispatch) => {
    dispatch(addActorRequest());
    try {
      const response = await axios.post(
        "/api/actors",
        actorData,
        { withCredentials: true }
      );
      dispatch(addActorSuccess(response.data));
      toast.success("Successfully added");
      setTimeout(() => {
        navigate("/actors");
      }, 1000);
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);

      setTimeout(() => {
        dispatch(addActorFailure(errorMessage));
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

export const updateActor = (actorId, actorData, navigate) => {
  return async (dispatch) => {
    dispatch(updateActorRequest());
    try {
      const response = await axios.put(
        `/api/actors/${actorId}`,
        actorData,
        { withCredentials: true }
      );
      dispatch(updateActorSuccess(response.data));
      toast.success("Successfully updated");
      setTimeout(() => {
        navigate("/actors");
      }, 1000);
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);

      setTimeout(() => {
        dispatch(updateActorFailure(errorMessage));
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

export const deleteActor = (actorId, navigate) => {
  return async (dispatch) => {
    dispatch(deleteActorRequest());
    try {
      await axios.delete(`/api/actors/${actorId}`, {
        withCredentials: true,
      });
      dispatch(deleteActorSuccess(actorId));
      toast.success("Successfully deleted");
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      toast.error(errorMessage);

      setTimeout(() => {
        dispatch(deleteActorFailure(errorMessage));
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};
