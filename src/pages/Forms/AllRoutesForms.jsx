import axios from "axios";
import React, { useState, useEffect } from "react";
import { getToken } from "../../utils/Common";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";
import moment from "moment";

const trip = [
  {
    id: 1,
    name: "one_way",
  },
  {
    id: 2,
    name: "round_trip",
  },
];

const AllRoutesForms = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sources, setSources] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [busID, setBusID] = useState([]);
  const [tripType, setTripType] = useState("");
  const [duration, setDuration] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedBusID, setSelectedBusID] = useState("");

  useEffect(() => {
    axios
      .get("https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/source", {
        headers: { Authorization: getToken() },
      })
      .then((response) => {
        // console.log(response.data.data);
        setSources(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/destination",
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response.data.data);
        setDestinations(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/busDetails",
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response.data.data);
        setBusID(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (id) {
      axios
        .get(
          "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/onetrip/" +
            id,
          {
            headers: { Authorization: getToken() },
          }
        )
        .then((response) => {
          console.log(response.data.data);
          setSelectedSource(response.data.data.sourceId.name);
          setSelectedDestination(response.data.data.destinationId.name);
          setSelectedBusID(response.data.data.busId._id);
          setDepartureTime(
            moment(response.data.data.time.dept, ["h:mm A"]).format("HH:mm")
          );
          setArrivalTime(
            moment(response.data.data.time.arr, ["h:mm A"]).format("HH:mm")
          );
          setDepartureDate(
            moment(response.data.data.deptDate).format("yyyy-MM-DD")
          );
          setArrivalDate(
            moment(response.data.data.arrDate).format("yyyy-MM-DD")
          );
          setTripType(response.data.data.type);
          setDuration(response.data.data.duration);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleSourceChangeInput = (e) => {
    setSelectedSource(e.target.value);
  };

  const handleDestinationChangeInput = (e) => {
    setSelectedDestination(e.target.value);
  };

  const handleBusIDChangeInput = (e) => {
    setSelectedBusID(e.target.value);
  };

  const handleTripTypeChangeInput = (e) => {
    setTripType(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/trip",
        {
          source: selectedSource,
          destination: selectedDestination,
          busId: selectedBusID,
          deptTime: departureTime.toString(),
          arrTime: arrivalTime.toString(),
          deptDate: departureDate.toString(),
          // returnDate: arrivalDate,
          duration: duration.toString(),
          type: tripType,
        },
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        console.log(response);
        if (response) {
          navigate("/manage-routes/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/editTrip/" +
          id,
        {
          source: selectedSource,
          destination: selectedDestination,
          busId: selectedBusID,
          deptTime: departureTime.toString(),
          arrTime: arrivalTime.toString(),
          deptDate: departureDate.toString(),
          returnDate: arrivalDate.toString(),
          duration: duration.toString(),
          type: tripType,
        },
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        console.log(response);
        if (response) {
          navigate("/manage-routes/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex h-full flex-col py-4 px-12 overflow-y-scroll">
      <div className="px-10 h-16 flex items-center justify-between mb-12">
        <p className="text-3xl">Add New Trip</p>
        <Link to="/manage-routes">
          <BsArrowReturnLeft size={35} className="cursor-pointer" />
        </Link>
      </div>
      <form onSubmit={id ? editSubmitHandler : handleFormSubmit}>
        <div className="flex px-12 mb-12">
          <div className="mx-10">
            <label htmlFor="sources" className="text-xl pr-4">
              Sources:{" "}
            </label>
            <select
              name="sources"
              className="h-10 rounded-md border-[2px] cursor-pointer bg-[whitesmoke] outline-none"
              onChange={handleSourceChangeInput}
              value={selectedSource}
            >
              <option value="">Please select a Source</option>
              {sources.map((source) => (
                <option value={source.name} key={source._id}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sources" className="text-xl pr-4">
              Destinations:{" "}
            </label>
            <select
              name="destinations"
              className="h-10 rounded-md border-[2px] cursor-pointer bg-[whitesmoke] outline-none"
              onChange={handleDestinationChangeInput}
              value={selectedDestination}
            >
              <option value="">Please select a Destination</option>
              {destinations.map((source) => (
                <option value={source.name} key={source._id}>
                  {source.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-12 px-20">
          <label htmlFor="sources" className="text-xl pr-4">
            Bus IDs:{" "}
          </label>
          <select
            name="bus ids"
            className="h-10 rounded-md border-[2px] cursor-pointer bg-[whitesmoke] outline-none"
            onChange={handleBusIDChangeInput}
            value={selectedBusID}
          >
            <option value="">Please select Bus ID</option>
            {busID.map((id) => (
              <option value={id._id} key={id._id}>
                {id.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex px-8 mb-12">
          <div className="mx-10">
            <span className="text-xl pr-4">Departure Time:</span>
            <input
              name="deptTime"
              type="time"
              min="00:00"
              max="23:59"
              className="w-60 h-10 p-4 rounded-md outline-none border-[1.5px] border-black"
              onChange={(e) => setDepartureTime(e.target.value)}
              value={departureTime}
            />
          </div>

          <div>
            <span className="text-xl pr-4">Arrival Time:</span>
            <input
              name="arrTime"
              type="time"
              min="00:00"
              max="23:59"
              className="w-60 h-10 p-4 rounded-md outline-none border-[1.5px] border-black"
              onChange={(e) => setArrivalTime(e.target.value)}
              value={arrivalTime}
            />
          </div>
        </div>

        <div className="flex px-8 mb-12">
          <div className="mx-10">
            <span className="text-xl pr-4">Departure Date:</span>
            <input
              name="deptDate"
              type="date"
              className="w-60 h-10 p-4 rounded-md outline-none border-[1.5px] border-black"
              onChange={(e) => setDepartureDate(e.target.value)}
              value={departureDate}
            />
          </div>

          <div>
            <span className="text-xl pr-4">Return Date:</span>
            <input
              name="returnDate"
              type="date"
              className="w-60 h-10 p-4 rounded-md outline-none border-[1.5px] border-black"
              onChange={(e) => setArrivalDate(e.target.value)}
              value={arrivalDate}
            />
          </div>
        </div>

        <div className="px-20 mb-12">
          <label htmlFor="sources" className="text-xl pr-4">
            Trip Type
          </label>
          <select
            name="trip type"
            className="h-10 rounded-md border-[2px] cursor-pointer bg-[whitesmoke] outline-none w-44"
            onChange={handleTripTypeChangeInput}
            value={tripType}
          >
            <option value="">Please select the Trip Type</option>
            {trip.map((data) => (
              <option value={data.name} key={data.id}>
                {data.name}
              </option>
            ))}
          </select>
        </div>

        <div className="px-20 flex flex-col">
          <span className="text-2xl">Enter the Duration:</span>
          <input
            type="text"
            placeholder="Enter the duration"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            className="rounded-md w-64 h-10 p-6 mt-4 border-black border-[1.5px] outline-none"
          />
        </div>

        <button
          className="mb-10 bg-amber-600 text-white w-32 h-11 rounded-md hover:shadow-bs1 transition-all duration-200 mx-20 mt-10"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AllRoutesForms;
