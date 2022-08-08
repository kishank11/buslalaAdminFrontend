import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { getToken } from "../../utils/Common";

const InputStyle =
  "outline-none h-12 p-4 border-[1px] border-zinc-400 rounded-md hover:shadow-bs1 transition-all duration-200 my-4 w-[350px]";

const status = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 2,
    name: "Inactive",
  },
  {
    id: 3,
    name: "Pending",
  },
];

const SubAdminForm = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminPhone, setAdminPhone] = useState("");

  const handleStatusChangeInput = (event) => {
    setSelectedStatus(event.target.value);
  };

  const setEmpty = () => {
    setSelectedStatus("");
    setAdminName("");
    setAdminEmail("");
    setAdminPassword("");
    setAdminPhone("");
  };

  const formChangeHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/createadmin",
        {
          name: adminName,
          email: adminEmail,
          password: adminPassword,
          number: adminPhone,
          status: selectedStatus,
        },
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response);
        setEmpty();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="p-10 overflow-y-scroll h-full">
      <div className="px-10 h-16 flex items-center justify-between mb-12">
        <p className="text-3xl">Add New Sub-Admin</p>
        <Link to="/manage-subadmin">
          <BsArrowReturnLeft size={35} className="cursor-pointer" />
        </Link>
      </div>
      <form onSubmit={formChangeHandler}>
        <div className="flex justify-around">
          <div className="flex flex-col">
            <span className="text-xl">Enter the Name</span>
            <input
              type="text"
              placeholder="Enter the name"
              className={`${InputStyle} mb-16`}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xl">Enter the Email</span>
            <input
              type="email"
              placeholder="Enter the email"
              className={`${InputStyle} mb-16`}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-around">
          <div className="flex flex-col">
            <span className="text-xl">Enter the Phone Number</span>
            <input
              type="number"
              placeholder="Enter the phone number"
              className={`${InputStyle} mb-16`}
              onChange={(e) => setAdminPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xl">Enter the Password</span>
            <input
              type="password"
              placeholder="Enter the password"
              className={`${InputStyle} mb-16`}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mx-32">
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
              <option value={state.id} key={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mx-32 my-16 bg-amber-600 text-white w-32 h-11 rounded-md hover:shadow-bs1 transition-all duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubAdminForm;
