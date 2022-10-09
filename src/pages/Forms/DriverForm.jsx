import React, { useEffect, useState } from "react";
import { BsArrowReturnLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/Common";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const InputStyle =
  "border-[1px] my-4 h-14 p-2 rounded-md outline-none hover:shadow-bs1 transition-all duration-200";

const status = [
  {
    id: 1,
    name: "active",
  },
  {
    id: 2,
    name: "inactive",
  },
  {
    id: 3,
    name: "pending",
  },
];

const CustomerForm = () => {
  const [addedCustomer, setAddedCustomer] = React.useState(false);
  const [updatedCustomer, setUpdatedCustomer] = React.useState(false);

  const { id } = useParams();

  const [allBuses, setAllBuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverNumber, setDriverNumber] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  const [driverBus, setDriverBus] = useState("");

  const handleStatusChangeInput = (event) => {
    event.preventDefault();
    setSelectedStatus(event.target.value);
  };

  const setEmpty = () => {
    setSelectedStatus("");
    setDriverName("");
    setDriverEmail("");
    setDriverNumber("");
    setDriverPassword("");
    setDriverBus("");
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let data = {
      name: driverName,
      email: driverEmail,
      number: driverNumber.toString(),
      status: selectedStatus,
      password: driverPassword,
      bus: driverBus,
    };
    console.log(data);
    await axios
      .post(
        "https://coral-app-5v83l.ondigitalocean.app/api/admin/adddriver",
        {
          name: driverName,
          email: driverEmail,
          number: driverNumber.toString(),
          status: selectedStatus,
          password: driverPassword,
          bus: driverBus,
        },
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setAddedCustomer(true);
          console.log(addedCustomer);
        }
        setEmpty();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(async () => {
    await axios
      .get(
        `https://coral-app-5v83l.ondigitalocean.app/api/admin/getonedriver/${id}`,
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((res) => {
        console.log(res);
        setDriverName(res.data.data.name);
        setDriverEmail(res.data.data.email);
        setDriverNumber(res.data.data.number);
        setSelectedStatus(res.data.data.status);
        setDriverPassword(res.data.data.password);
        setDriverBus(res.data.data.bus);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`https://coral-app-5v83l.ondigitalocean.app/api/admin/busDetails`, {
        headers: { Authorization: getToken() },
      })
      .then((res) => {
        console.log(res.data.data);
        setAllBuses(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editSubmitHandler = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        `https://coral-app-5v83l.ondigitalocean.app/api/admin/updatealldriver/${id}`,
        {
          name: driverName,
          email: driverEmail,
          number: driverNumber.toString(),
          status: selectedStatus,
          password: driverPassword,
          bus: driverBus,
        },
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          setUpdatedCustomer(true);
        }
        setEmpty();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="mt-12 overflow-x-scroll h-full">
      <div className="px-60 h-16 flex items-center justify-between">
        <p className="text-3xl">Add New Driver</p>
        <Link to="/manage-drivers">
          <BsArrowReturnLeft size={35} className="cursor-pointer" />
        </Link>
      </div>

      <form
        className="flex flex-col pl-60 py-8"
        onSubmit={id ? editSubmitHandler : formSubmitHandler}
      >
        {/* <input type="number" placeholder="Enter Driver ID" className={`${InputStyle} w-72`}/> */}
        <input
          type="text"
          placeholder="Enter Driver Name"
          className={`${InputStyle} w-[550px]`}
          onChange={(e) => setDriverName(e.target.value)}
          value={driverName}
        />
        <input
          type="email"
          placeholder="Enter Driver Email"
          className={`${InputStyle} w-96`}
          onChange={(e) => setDriverEmail(e.target.value)}
          value={driverEmail}
        />
        <input
          type="number"
          placeholder="Enter Driver Phone Number"
          className={`${InputStyle} w-96`}
          onChange={(e) => setDriverNumber(e.target.value)}
          value={driverNumber}
        />
        <input
          type="password"
          placeholder="Enter Driver Password"
          className={`${InputStyle} w-96`}
          onChange={(e) => setDriverPassword(e.target.value)}
          value={driverPassword}
        />

        <div className="mt-10 mb-10">
          <label htmlFor="status" className="text-xl pr-4">
            Status:{" "}
          </label>
          <select
            name="status"
            className="h-10 rounded-md border-[2px] cursor-pointer bg-[whitesmoke] outline-none w-44"
            onChange={handleStatusChangeInput}
            value={selectedStatus}
          >
            <option value="">Please select Status</option>
            {status.map((state) => (
              <option value={state.name} key={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 mb-10">
          <label htmlFor="status" className="text-xl pr-4">
            Bus:{" "}
          </label>
          <select
            name="status"
            className="h-10 rounded-md border-[2px] cursor-pointer bg-[whitesmoke] outline-none w-44"
            onChange={(e) => setDriverBus(e.target.value)}
            value={driverBus}
          >
            <option value="">Please select Bus</option>
            {allBuses.map((state) => (
              <option value={state._id} key={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* <input type="text" placeholder='Enter Driver Address' className={`${InputStyle} w-[500px]`} />
                <input type="text" placeholder="Enter Driver's City" className={`${InputStyle} w-52`} />
                <input type="number" placeholder='Total Experience' className={`${InputStyle} w-52`} />
                <input type="number" placeholder='Enter Driving License Number' className={`${InputStyle} w-80`} />
                <input type="text" placeholder='Enter Driver PAN Card' className={`${InputStyle} w-96`} />
                <input type="text" placeholder='Enter Driver Aadhar Card' className={`${InputStyle} w-96`} />
                <input type="text" placeholder='Referred By (Optional)' className={`${InputStyle} w-96`} /> */}

        {/* <label className='text-2xl my-4'>Status</label>
                <div className='flex items-center'>
                    <input type="radio" className='mr-3'/>
                    Active
                </div>
                <div className='flex items-center mb-6'>
                    <input type="radio" className='mr-3'/>
                    Inactive
                </div> */}

        <button
          className="bg-amber-400 mt-8 w-32 h-12 rounded-md text-white hover:shadow-bs1 transition-all duration-200"
          type="submit"
        >
          Add Driver
        </button>
      </form>

      <Dialog
        open={addedCustomer}
        onClose={() => {
          setAddedCustomer(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Added!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Added Driver Successfully
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={updatedCustomer}
        onClose={() => {
          setUpdatedCustomer(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Updated!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Updated Driver Successfully
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerForm;
