import React, { useState, useEffect } from "react";
import { GrBus } from "react-icons/gr";
import { Link } from "react-router-dom";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { getToken } from "../utils/Common";
//Material-UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddNewButton from "../components/AddNewButton";
import View from "../components/View";
import Edit from "../components/Edit";
// import Delete from '../components/Delete';

const ManageDrivers = () => {
  const [allDriverData, setAllDriverData] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://coral-app-5v83l.ondigitalocean.app/api/admin/getalldriver",
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response.data.data);
        setAllDriverData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (search != "") {
      const new1 = allDriverData.filter((result) => {
        return Object.values(result)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFiltered(new1);
      console.log(new1);
    }
  }, [search]);

  const deleteHandler = async (id) => {
    console.log(id);
    await axios
      .delete(
        `https://coral-app-5v83l.ondigitalocean.app/api/admin/updatealldriver/${id}`,
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response);
        // setAllAdminData(response.data.data);
        // setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <ScaleLoader color="green" />
        </div>
      ) : (
        <div className="h-full flex items-center flex-col overflow-y-scroll px-8 mt-12">
          <div className="flex items-center text-left w-full pb-4 text-3xl justify-between">
            <div className="flex">
              <GrBus className="mr-4" />
              Manage Drivers
            </div>
            <input
              type="text"
              value={search}
              placeholder="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <Link to="/new-driver-form">
              <AddNewButton title="Add New Driver" />
            </Link>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="caption table">
              <TableHead
                style={{
                  boxShadow: "0px 1px 9px rgba(0, 0, 0, 0.12)",
                  borderRadius: "12px",
                }}
              >
                <TableRow>
                  <TableCell>Driver ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone No.</TableCell>
                  <TableCell align="center">View</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!search
                  ? allDriverData?.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.number}</TableCell>
                        <TableCell align="center">
                          <Link to={`/manage-drivers/view-driver/${row._id}`}>
                            <View title="View" />
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/edit-driver-form/${row._id}`}>
                            <Edit title="Edit" />
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <div className="bg-violet-600 h-6 rounded-md flex items-center justify-center text-white">
                            {row.status}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <button
                            className="bg-red-600 h-7 w-24 rounded-md text-white"
                            onClick={() => deleteHandler(row._id)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  : filtered?.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.number}</TableCell>
                        <TableCell align="center">
                          <Link to={`/manage-drivers/view-driver/${row._id}`}>
                            <View title="View" />
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/edit-driver-form/${row._id}`}>
                            <Edit title="Edit" />
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <div className="bg-violet-600 h-6 rounded-md flex items-center justify-center text-white">
                            {row.status}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <button
                            className="bg-red-600 h-7 w-24 rounded-md text-white"
                            onClick={() => deleteHandler(row._id)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </React.Fragment>
  );
};

export default ManageDrivers;
