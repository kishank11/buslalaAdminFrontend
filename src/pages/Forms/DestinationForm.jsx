import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { getToken } from "../../utils/Common";

const InputStyle =
  "outline-none h-12 p-4 border-[1px] border-zinc-400 rounded-md hover:shadow-bs1 transition-all duration-200 my-4 w-[350px]";

const DestinationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destinationName, setDestinationName] = useState("");
  const [arrivalTime, setArrivalTime] = useState(null);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/destination",
        {
          name: destinationName,
          drop_of_time: arrivalTime,
        },
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response);
        if (response) {
          navigate("/manage-destination");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setDestinationName("");
    setArrivalTime("");
  };

  useEffect(async () => {
    await axios
      .get(
        `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/onedestination/${id}`,
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((res) => {
        // console.log(res);
        setDestinationName(res.data.data.name);
        setArrivalTime(res.data.data.drop_of_time[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(sourceName);
    await axios
      .patch(
        `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/${id}/editDest`,
        {
          name: destinationName,
          drop_of_time: arrivalTime,
        },
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response);
        if (response) {
          navigate("/manage-destination");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setDestinationName("");
    setArrivalTime("");
  };

  return (
    <div className="p-10">
      <div className="px-10 h-16 flex items-center justify-between mb-12">
        <p className="text-3xl">Add New Destination</p>
        <Link to="/manage-destination">
          <BsArrowReturnLeft size={35} className="cursor-pointer" />
        </Link>
      </div>
      <form
        onSubmit={id ? editSubmitHandler : formSubmitHandler}
        className="flex items-center justify-around flex-col"
      >
        <div className="flex flex-col">
          <span className="text-xl">Enter the New Destination</span>
          <input
            type="text"
            placeholder="Enter the destination name"
            className={`${InputStyle} mb-16`}
            value={destinationName}
            onChange={(e) => setDestinationName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xl">Enter the Arrival Time</span>
          <input
            type="time"
            placeholder="Enter the arrival time"
            className={`${InputStyle}`}
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          />
          <button
            className="bg-orange-500 text-white h-12 w-32 rounded-md mt-10"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinationForm;
