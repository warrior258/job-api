import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Unauthorized from "../components/Unauthorized";
import Skeleton from '../components/Skeleton'

const Dashboard = () => {

  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState(false);
  const [deleteid, setDeleteid] = useState('');

  const [search, setSearch] = useState("");

  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  const getAllJobs = async () => {
    try {
      if (token) {
        const response = await axios.get("http://localhost:3000/api/v1/jobs", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.data !== "No job was created!") {
          setJobs(response.data);
        }
        
        setTimeout(() => {
          setLoading(false);
        }, 2000);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    setPopup(false);
    try {
      if (token) {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/jobs/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response);
        getAllJobs();
        // if(response.data !== 'No job was created!'){
        //   setJobs(response.data);
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteId = (id) => {
    setDeleteid(id);
    setPopup(true);
  }

  useEffect(() => {
    
    setLoading(true);  
    getAllJobs();
  }, []);

  return (
    <div>
      <div className={`bg-gray-900/70 ${popup ? "block" : "hidden"} w-full h-[100vh] z-50 fixed top-0`}>
        <div className=" absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="rounded-lg shadow bg-gray-700 h-[250px] md:w-[500px] w-[300px] pt-5">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
              onClick={() => setPopup(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this job?
              </h3>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={() => deleteJob(deleteid)}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={() => setPopup(false)}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex md:flex-row flex-col justify-between px-8 items-center mt-10">
          <div className="relative w-[300px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              required
            />
          </div>

          <Link
            to={"/dashboard/createjob"}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 md:mt-0 mt-5 md:w-[110px] w-[300px] text-center focus:outline-none"
          >
            Create Job
          </Link>
        </div>

        {token ? (
          <div className="relative grid lg:grid-cols-3 md:grid-cols-2 mt-10 place-items-center gap-10">
            {/* Skeleton loading */}
            {loading ? (
              <>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              <Skeleton/>
              </>
            ) : (<div className="hidden"></div>)}            
            
            {jobs.length > 0 && !loading? (
              jobs.filter((item) => item.position.toLowerCase().includes(search.toLowerCase())             )
                .map((job) => (
                  <div
                    key={job._id}
                    className="w-[300px] h-[100px] bg-gray-800 rounded-lg px-5 py-2 text-white relative"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="">{job.position}</p>
                      <p
                        className={`text-[10px] ${
                          job.status === "pending"
                            ? "text-yellow-400 bg-yellow-500/30"
                            : job.status === "declined"
                            ? "text-red-500 bg-red-600/30"
                            : "text-blue-300 bg-blue-500/30"
                        } px-2 py-[2px] rounded-full font-semibold tracking-wider`}
                      >
                        {job.status}
                      </p>
                    </div>
                    <p className="mb-2">{job.company}</p>                    

                    <div className="absolute right-4 bottom-3 flex items-center">
                      <Link
                        to={`/dashboard/${job._id}`}
                        className="text-xl text-gray-500 hover:text-white"
                      >
                        <MdEdit />
                      </Link>
                      <button
                        className="ml-2 text-xl text-gray-500 hover:text-white"
                        onClick={() => handleDeleteId(job._id)}
                        
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <p className={`${loading ? "hidden" : "block"} text-gray-400 absolute top-1 left-10 -z-[1]`}>No Jobs!</p>
            )}
          </div>
        ) : (
          <Unauthorized />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
