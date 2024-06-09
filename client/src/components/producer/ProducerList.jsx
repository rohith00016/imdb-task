import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducers,
  deleteProducer,
} from "../../redux/actions/producerActions";
import { Link, useNavigate } from "react-router-dom";
import { formatDateDisplay } from "../../utils/formateDate";
import SkeletonRow from "../skeletons/SkeletonRow";

const ProducerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const producers = useSelector((state) => state.producers.producers);
  const loading = useSelector((state) => state.producers.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchProducers(navigate));
  }, [dispatch, navigate]);

  const handleDelete = (producerId) => {
    if (window.confirm("Are you sure you want to delete this producer?")) {
      dispatch(deleteProducer(producerId, navigate));
    }
  };

  return (
    <>
      <div className="flex justify-end w-5/6 my-6">
        <div>
          <Link to="/add-producer" className="btn btn-warning">
            Add new
          </Link>
        </div>
      </div>
      <div className="flex justify-center my-8">
        <div className="overflow-y-auto w-3/4">
          {loading ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Bio</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
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
          ) : error ? (
            <div className="text-center mt-6 text-red-500">Error: {error}</div>
          ) : producers.length === 0 ? (
            <div className="text-center mt-6">
              <p className="text-lg font-semibold">No producers found</p>
              <p>Add producers to see them listed here.</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Bio</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {producers.map((producer) => (
                  <tr key={producer._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={producer.profilePic} alt="Producer" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{producer.name}</div>
                          <span className="badge badge-ghost badge-sm">
                            {producer.gender === "Male" ? "Actor" : "Actress"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{producer.bio}</td>
                    <td>{producer.gender}</td>
                    <td>{formatDateDisplay(producer.dob)}</td>
                    <td>
                      <Link
                        to={`/update-producer/${producer._id}`}
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
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(producer._id)}
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

export default ProducerList;
