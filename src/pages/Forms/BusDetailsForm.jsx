import axios from "axios";
import React, { useState, useEffect } from "react";
import { getToken } from "../../utils/Common";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import SleepIcon from "@mui/icons-material/Hotel";
import SeatIcon from "@mui/icons-material/AirlineSeatReclineNormal";

const InputStyle =
  "outline-none h-12 p-4 border-[1px] border-zinc-400 rounded-md hover:shadow-bs1 transition-all duration-200 my-4 w-[350px]";

const BusDetailsForm = () => {
  const { id } = useParams();
  const history = useNavigate();

  const [busName, setBusName] = useState("");
  const [busType, setBusType] = useState("");
  const [busModel, setBusModel] = useState("");
  const [busCapacity, setBusCapacity] = useState("");
  const [seaterSeats, setSeaterSeats] = useState("");
  const [sleeperSeats, setSleeperSeats] = useState("");
  const [lowerberthFare, setLowerberthFare] = useState("");
  const [upperberthFare, setUpperberthFare] = useState("");
  const [busTypeAC, setBusTypeAC] = useState("");

  const [seats, setSeats] = useState([]);
  const [seatNumber, setSeatNumber] = useState("");
  const [seatType, setSeatType] = useState("");
  const [placeType, setPlaceType] = useState("");
  const addNewSeat = () => {
    setSeats([
      ...seats,
      {
        number: seatNumber,
        type: seatType,
        place: placeType,
        status: false,
      },
    ]);
    console.log(seats);
  };

  const setEmpty = () => {
    setBusName("");
    setBusType("");
    setBusModel("");
    setBusCapacity("");
    setSeaterSeats("");
    setSleeperSeats("");
    setLowerberthFare("");
    setUpperberthFare("");
    setBusTypeAC("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      total_seater: seaterSeats,
      total_sleeper: sleeperSeats,
      seats: seats,
      fare: {
        lowerBerth: lowerberthFare,
        upperBerth: upperberthFare,
      },
      bus_model: busModel,
      busCapacity,
      name: busName,
      busType: busTypeAC,
    };
    console.log(data);
    await axios
      .post(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/uploadBusDetails",
        data,
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        console.log(response);
        if (response) {
          history("/bus-details");
        }
        setEmpty();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(async () => {
    if (id) {
      await axios
        .get(
          `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/onebusDetail/${id}`,
          {
            headers: { Authorization: getToken() },
          }
        )
        .then((res) => {
          // console.log(res);
          setBusName(res.data.data.name);
          setBusType(res.data.data.type);
          setBusModel(res.data.data.bus_model);
          setBusCapacity(res.data.data.busCapacity);
          setSeaterSeats(res.data.data.total_seater);
          setSleeperSeats(res.data.data.total_sleeper);
          setLowerberthFare(res.data.data.fare.lowerBerth);
          setUpperberthFare(res.data.data.fare.upperBerth);
          setBusTypeAC(res.data.data.busType);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(sourceName);
    await axios
      .put(
        `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/${id}/updateBusDetails`,
        {
          total_seater: seaterSeats,
          total_sleeper: sleeperSeats,
          seats: seats,
          fare: {
            lowerBerth: lowerberthFare,
            upperBerth: upperberthFare,
          },
          bus_model: busModel,
          busCapacity,
          name: busName,
          busType: busTypeAC,
        },
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response);
        if (response) {
          history("/bus-details");
        }
        setEmpty();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex h-full overflow-y-scroll flex-col py-4 px-12">
      <div className="px-10 h-16 flex items-center justify-between mb-12">
        <p className="text-3xl">Add New Bus</p>
        <Link to="/bus-details">
          <BsArrowReturnLeft size={35} className="cursor-pointer" />
        </Link>
      </div>

      <form
        onSubmit={id ? editSubmitHandler : handleSubmit}
        className="w-full h-full p-6"
      >
        <div className="flex flex-col mb-4">
          <span className="text-2xl">Enter Name of the Bus</span>
          <input
            type="text"
            placeholder="Enter the bus name"
            className={InputStyle}
            value={busName}
            onChange={(e) => setBusName(e.target.value)}
          />
        </div>
        {/* <div className='flex flex-col mb-4'>
                     <span className='text-2xl'>Enter the Bus type (one_way / rounded_trip)</span>
                     <input type="text" placeholder='Enter the bus or trip type' className={InputStyle} value={busType} onChange={(e) => setBusType(e.target.value)} />
                </div>*/}
        <div className="flex flex-col mb-4">
          <span className="text-2xl">Enter the Bus type (ac / nonac)</span>
          <input
            type="text"
            placeholder="Enter the bus or trip type"
            className={InputStyle}
            value={busTypeAC}
            onChange={(e) => setBusTypeAC(e.target.value)}
          />
        </div>
        <div className="flex mb-4">
          <div className="flex flex-col">
            <span className="text-xl">Enter the Bus model (2+1 / 2+2)</span>
            <input
              type="text"
              placeholder="Enter the bus model"
              className={`${InputStyle} mr-12`}
              value={busModel}
              onChange={(e) => setBusModel(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl">Capacity of Bus</span>
            <input
              type="number"
              placeholder="Capacity of Bus"
              className={`${InputStyle}`}
              value={busCapacity}
              onChange={(e) => setBusCapacity(e.target.value)}
            />
          </div>
        </div>

        <div className="flex mb-4">
          <div className="flex flex-col">
            <span className="text-xl">Enter the Seats for Seater</span>
            <input
              type="number"
              placeholder="Enter the seater seats"
              className={`${InputStyle} mr-12`}
              value={seaterSeats}
              onChange={(e) => setSeaterSeats(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl">Enter the Seats for Sleeper</span>
            <input
              type="number"
              placeholder="Enter the sleeper seats"
              className={InputStyle}
              value={sleeperSeats}
              onChange={(e) => setSleeperSeats(e.target.value)}
            />
          </div>
        </div>

        <div className="flex mb-4">
          <div className="flex flex-col">
            <span className="text-xl">Enter the Fare for UpperBerth</span>
            <input
              type="number"
              placeholder="Enter the upper-berth fare"
              className={`${InputStyle} mr-12`}
              value={upperberthFare}
              onChange={(e) => setUpperberthFare(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl">Enter the Fare for LowerBerth</span>
            <input
              type="number"
              placeholder="Enter the lower-berth fare"
              className={InputStyle}
              value={lowerberthFare}
              onChange={(e) => setLowerberthFare(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginBottom: 10 }}>
          <TextField
            id="outlined-basic"
            label="Seat Number"
            variant="outlined"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
          />
          <FormControl sx={{ width: 200, ml: 1 }}>
            <InputLabel id="seat-type-select-label">Seat Type</InputLabel>
            <Select
              labelId="seat-type-select-label"
              id="seat-type-select"
              value={seatType}
              label="Seat Type"
              onChange={(e) => setSeatType(e.target.value)}
            >
              <MenuItem value="seater">Seater</MenuItem>
              <MenuItem value="sleeper">Sleeper</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 200, ml: 1 }}>
            <InputLabel id="place-type-select-label">Place</InputLabel>
            <Select
              labelId="place-type-select-label"
              id="place-type-select"
              value={placeType}
              label="Place"
              onChange={(e) => setPlaceType(e.target.value)}
            >
              <MenuItem value="besideOfDriver">Beside of Driver</MenuItem>
              <MenuItem value="behindOfDriver">Behind of Driver</MenuItem>
              <MenuItem value="lowerBirthA">LowerBirth A (Left Side)</MenuItem>
              <MenuItem value="lowerBirthB">LowerBirth B (Right Side)</MenuItem>
              <MenuItem value="upperBirthA">UpperBirth A (Left Side)</MenuItem>
              <MenuItem value="upperBirthB">UpperBirth B (Right Side)</MenuItem>
              <MenuItem value="backOfBus">Back Seats</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={addNewSeat} variant="contained" sx={{ m: 1 }}>
            Add Seat
          </Button>
        </div>

        <Paper
          sx={{
            textAlign: "center",
            mb: 1,
            backgroundColor: "rgb(18, 18, 18,0.2)",
          }}
        >
          <Typography
            textAlign="center"
            variant="h6"
            gutterBottom
            component="div"
          >
            Beside of Driver
          </Typography>
          {seats.map((seat) =>
            seat.place == "besideOfDriver" ? (
              <Chip
                sx={{ margin: 1 }}
                icon={seat.type == "sleeper" ? <SleepIcon /> : <SeatIcon />}
                label={seat.number}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />
            ) : null
          )}
        </Paper>

        <Paper
          sx={{
            textAlign: "center",
            mb: 1,
            backgroundColor: "rgb(18, 18, 18,0.2)",
          }}
        >
          <Typography
            textAlign="center"
            variant="h6"
            gutterBottom
            component="div"
          >
            Behind of Driver
          </Typography>
          {seats.map((seat) =>
            seat.place == "behindOfDriver" ? (
              <Chip
                sx={{ margin: 1 }}
                icon={seat.type == "sleeper" ? <SleepIcon /> : <SeatIcon />}
                label={seat.number}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />
            ) : null
          )}
        </Paper>

        <Paper
          sx={{
            textAlign: "center",
            mb: 1,
            backgroundColor: "rgb(18, 18, 18,0.2)",
          }}
        >
          <Typography
            textAlign="center"
            variant="h6"
            gutterBottom
            component="div"
          >
            LowerBirth A
          </Typography>
          {seats.map((seat) =>
            seat.place == "lowerBirthA" ? (
              <Chip
                sx={{ margin: 1 }}
                icon={seat.type == "sleeper" ? <SleepIcon /> : <SeatIcon />}
                label={seat.number}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />
            ) : null
          )}
        </Paper>

        <Paper
          sx={{
            textAlign: "center",
            mb: 1,
            backgroundColor: "rgb(18, 18, 18,0.2)",
          }}
        >
          <Typography
            textAlign="center"
            variant="h6"
            gutterBottom
            component="div"
          >
            LowerBirth B
          </Typography>
          {seats.map((seat) =>
            seat.place == "lowerBirthB" ? (
              <Chip
                sx={{ margin: 1 }}
                icon={seat.type == "sleeper" ? <SleepIcon /> : <SeatIcon />}
                label={seat.number}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />
            ) : null
          )}
        </Paper>

        <Paper
          sx={{
            textAlign: "center",
            mb: 1,
            backgroundColor: "rgb(18, 18, 18,0.2)",
          }}
        >
          <Typography
            textAlign="center"
            variant="h6"
            gutterBottom
            component="div"
          >
            UpperBirth A
          </Typography>
          {seats.map((seat) =>
            seat.place == "upperBirthA" ? (
              <Chip
                sx={{ margin: 1 }}
                icon={seat.type == "sleeper" ? <SleepIcon /> : <SeatIcon />}
                label={seat.number}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />
            ) : null
          )}
        </Paper>

        <Paper
          sx={{
            textAlign: "center",
            mb: 1,
            backgroundColor: "rgb(18, 18, 18,0.2)",
          }}
        >
          <Typography
            textAlign="center"
            variant="h6"
            gutterBottom
            component="div"
          >
            UpperBirth B
          </Typography>
          {seats.map((seat) =>
            seat.place == "upperBirthB" ? (
              <Chip
                sx={{ margin: 1 }}
                icon={seat.type == "sleeper" ? <SleepIcon /> : <SeatIcon />}
                label={seat.number}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />
            ) : null
          )}
        </Paper>

        <Paper
          sx={{
            textAlign: "center",
            mb: 1,
            backgroundColor: "rgb(18, 18, 18,0.2)",
          }}
        >
          <Typography
            textAlign="center"
            variant="h6"
            gutterBottom
            component="div"
          >
            Back Seat of Bus
          </Typography>
          {seats.map((seat) =>
            seat.place == "backOfBus" ? (
              <Chip
                sx={{ margin: 1 }}
                icon={seat.type == "sleeper" ? <SleepIcon /> : <SeatIcon />}
                label={seat.number}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
              />
            ) : null
          )}
        </Paper>
        <button
          type="submit"
          className="mb-10 bg-amber-600 text-white w-32 h-11 rounded-md hover:shadow-bs1 transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BusDetailsForm;
