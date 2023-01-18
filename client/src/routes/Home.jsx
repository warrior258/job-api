import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [alljobs, setAlljobs] = useState([]);

  const AllJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/alljobs");
      // console.log(response.data);

      setTimeout(() => {
        setLoading(false);
      }, 2000);

      setAlljobs(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    AllJobs();
  }, []);

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <div className="pl-8 mt-10">
        <h1 className="text-xl text-white font-bold mb-5 tracking-wide">All Jobs</h1>
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
        </div>

        <div className="relative grid lg:grid-cols-3 md:grid-cols-2 mt-10 place-items-center gap-10">
          {/* Skeleton loading */}
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <div className="hidden"></div>
          )}

          {alljobs.length > 0 && !loading ? (
            alljobs
              .filter((item) =>
                item.position.toLowerCase().includes(search.toLowerCase())
              )
              .map((job) => (
                <div
                  key={job._id}
                  className="w-[300px] h-[100px] bg-gray-800 rounded-lg px-5 py-2 text-white relative"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="">{job.position}</p>
                    {/* <p
                      className={`text-[10px] ${
                        job.status === "pending"
                          ? "text-yellow-400 bg-yellow-500/30"
                          : job.status === "declined"
                          ? "text-red-500 bg-red-600/30"
                          : "text-blue-300 bg-blue-500/30"
                      } px-2 py-[2px] rounded-full font-semibold tracking-wider`}
                    >
                      {job.status}
                    </p> */}
                  </div>
                  <p className="mb-2">{job.company}</p>

                  <div className="absolute right-4 bottom-3 flex items-center">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 ml-5 focus:outline-none"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p
              className={`${
                loading ? "hidden" : "block"
              } text-gray-400 absolute top-1 left-10 -z-[1]`}
            >
              No Jobs!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
