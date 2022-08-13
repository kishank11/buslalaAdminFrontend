import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { getToken } from "../../utils/Common";

const InputStyle =
  "outline-none h-12 p-4 border-[1px] border-zinc-400 rounded-md hover:shadow-bs1 transition-all duration-200 my-4 w-[350px]";

const MidpointForm = () => {
  const { id } = useParams();
  // console.log(id);
  const [sourceName, setSourceName] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/midpoint",
        {
          name: sourceName,
          pick_up_time: departureTime,
        },
        {
          headers: {
            Authorization: getToken(),
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setSourceName("");
    setDepartureTime("");
  };

  useEffect(async () => {
    await axios
      .get(
        `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/onemidpoint/${id}`,
        {
          headers: {
            Authorization: getToken(),
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setSourceName(res.data.data.name);
        setDepartureTime(res.data.data.pick_up_time);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(sourceName);
    await axios
      .put(
        `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/${id}/editMid`,
        {
          name: sourceName,
          pick_up_time: departureTime,
        },
        {
          headers: {
            Authorization: getToken(),
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setSourceName("");
    setDepartureTime("");
  };

  return (
    <div className="p-10">
      <div className="px-10 h-16 flex items-center justify-between mb-12">
        <p className="text-3xl">Add New Midpoint</p>
        <Link to="/manage-midpoint">
          <BsArrowReturnLeft size={35} className="cursor-pointer" />
        </Link>
      </div>
      <form
        onSubmit={id ? editSubmitHandler : formSubmitHandler}
        className="flex items-center justify-around flex-col"
      >
        <div className="flex flex-col">
          <span className="text-xl">Enter the New Midpoint</span>
          <input
            type="text"
            placeholder="Enter the source name"
            className={`${InputStyle} mb-16`}
            value={sourceName}
            onChange={(e) => setSourceName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xl">Enter the Departure Time</span>
          <input
            type="text"
            placeholder="Enter the departure time"
            className={`${InputStyle}`}
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
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

export default MidpointForm;

{
  /* <div className="row">
<label htmlFor="categories">Categories: </label>
    <select name="category" value={product.category} onChange={handleChangeInput} >
        <option value="">Please select a category</option>
        {
            categories.map(category => (
                <option value={category._id} key={category._id}>
                    {category.name}
                </option>
            ))
        }
    </select>
</div> */
}
