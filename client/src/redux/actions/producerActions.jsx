import axios from "axios";
import toast from "react-hot-toast";

const fetchProducersRequest = () => ({
  type: "FETCH_PRODUCERS_REQUEST",
});

const fetchProducersSuccess = (producers) => ({
  type: "FETCH_PRODUCERS_SUCCESS",
  payload: producers,
});

const fetchProducersFailure = (error) => ({
  type: "FETCH_PRODUCERS_FAILURE",
  payload: error,
});

const fetchProducerByIdRequest = () => ({
  type: "FETCH_PRODUCER_BY_ID_REQUEST",
});

const fetchProducerByIdSuccess = (producer) => ({
  type: "FETCH_PRODUCER_BY_ID_SUCCESS",
  payload: producer,
});

const fetchProducerByIdFailure = (error) => ({
  type: "FETCH_PRODUCER_BY_ID_FAILURE",
  payload: error,
});

const addProducerRequest = () => ({
  type: "ADD_PRODUCER_REQUEST",
});

const addProducerSuccess = (producer) => ({
  type: "ADD_PRODUCER_SUCCESS",
  payload: producer,
});

const addProducerFailure = (error) => ({
  type: "ADD_PRODUCER_FAILURE",
  payload: error,
});

const updateProducerRequest = () => ({
  type: "UPDATE_PRODUCER_REQUEST",
});

const updateProducerSuccess = (producer) => ({
  type: "UPDATE_PRODUCER_SUCCESS",
  payload: producer,
});

const updateProducerFailure = (error) => ({
  type: "UPDATE_PRODUCER_FAILURE",
  payload: error,
});

const deleteProducerRequest = () => ({
  type: "DELETE_PRODUCER_REQUEST",
});

const deleteProducerSuccess = (producerId) => ({
  type: "DELETE_PRODUCER_SUCCESS",
  payload: producerId,
});

const deleteProducerFailure = (error) => ({
  type: "DELETE_PRODUCER_FAILURE",
  payload: error,
});

const fetchProducers = (navigate) => {
  return async (dispatch) => {
    dispatch(fetchProducersRequest());
    try {
      const response = await axios.get("/api/producers");
      dispatch(fetchProducersSuccess(response.data));
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      setTimeout(() => {
        dispatch(fetchProducersFailure(errorMessage));
        toast.error(errorMessage);
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

const fetchProducerById = (producerId, navigate) => {
  return async (dispatch) => {
    dispatch(fetchProducerByIdRequest());
    try {
      const response = await axios.get(`/api/producers/${producerId}`);
      dispatch(fetchProducerByIdSuccess(response.data));
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      setTimeout(() => {
        dispatch(fetchProducerByIdFailure(errorMessage));
        toast.error(errorMessage);
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

const addProducer = (producerData, navigate) => {
  return async (dispatch) => {
    dispatch(addProducerRequest());
    try {
      const response = await axios.post("/api/producers", producerData);
      dispatch(addProducerSuccess(response.data));
      toast.success("Successfully added")
      setTimeout(() => {
        navigate("/producers");
      }, 1000);
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      setTimeout(() => {
        dispatch(addProducerFailure(errorMessage));
        toast.error(errorMessage);
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

const updateProducer = (producerId, producerData, navigate) => {
  return async (dispatch) => {
    dispatch(updateProducerRequest());
    try {
      const response = await axios.put(
        `/api/producers/${producerId}`,
        producerData
      );
      dispatch(updateProducerSuccess(response.data));
      toast.success("Successfully updated")
      setTimeout(() => {
        navigate("/producers");
      }, 1000);

    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      setTimeout(() => {
        dispatch(updateProducerFailure(errorMessage));
        toast.error(errorMessage);
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

const deleteProducer = (producerId, navigate) => {
  return async (dispatch) => {
    dispatch(deleteProducerRequest());
    try {
      await axios.delete(`/api/producers/${producerId}`);
      dispatch(deleteProducerSuccess(producerId));
      toast.success("Successfully deleted")
    } catch (error) {
      const errorMessage = error?.response?.data?.error || error.message;
      setTimeout(() => {
        dispatch(deleteProducerFailure(errorMessage));
        toast.error(errorMessage);
        if (errorMessage === "Unauthorized - Token Expired" || errorMessage === "Unauthorized - No Token Provided" || errorMessage === "User not found") {
      navigate("/");
    }
  }, 1000);
    }
  };
};

export {
  fetchProducers,
  fetchProducerById,
  addProducer,
  updateProducer,
  deleteProducer,
};
