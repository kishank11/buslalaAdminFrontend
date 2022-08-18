import React, { useState, useEffect } from "react";
import { GrBus } from "react-icons/gr";
import Edit from "../components/Edit";
import { Link } from "react-router-dom";
//Material-UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddNewButton from "../components/AddNewButton";
import { getToken } from "../utils/Common";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";

const BusDetails = () => {
  const [busDetailsData, setBusDetailsData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/busDetails",
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response.data.data);
        setBusDetailsData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  const deleteHandler = async (id) => {
    console.log(id);
    setLoading(true);
    await axios
      .delete(
        `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/deleteABus/${id}`,
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        //console.log(response);
        // setAllAdminData(response.data.data);
        //setLoading(false);
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
        <div className="h-full flex items-center justify-center flex-col overflow-y-scroll px-8 mt-6">
          <div className="flex items-center text-left w-full pb-4 text-3xl justify-between">
            <div className="flex">
              <GrBus className="mr-4" />
              Bus Details
            </div>

            <Link to="/addBus">
              <AddNewButton title="Add New Bus" />
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
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Name of Bus</TableCell>
                  <TableCell align="center">Bus Model</TableCell>
                  <TableCell align="center">Bus Type</TableCell>
                  <TableCell align="center">Fare of Upper Berth</TableCell>
                  <TableCell align="center">Fare of Lower Berth</TableCell>
                  <TableCell align="center">Fare of Lower Sleeper</TableCell>

                  <TableCell align="center">Seats of Seater</TableCell>
                  <TableCell align="center">Seats of Sleeper</TableCell>
                  <TableCell align="center">Capacity of Seats</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {busDetailsData?.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell component="th" scope="row">
                      {`Bus_${data._id.slice(-5)}`}
                    </TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.bus_model}</TableCell>
                    <TableCell align="center">{data.busType}</TableCell>
                    <TableCell align="center">{data.fare.upperBerth}</TableCell>
                    <TableCell align="center">{data.fare.lowerBerth}</TableCell>
                    <TableCell align="center">{data.fare.midpoint}</TableCell>

                    <TableCell align="center">{data.total_seater}</TableCell>
                    <TableCell align="center">{data.total_sleeper}</TableCell>
                    <TableCell align="center">{data.busCapacity}</TableCell>
                    <TableCell align="center">
                      <Link to={`/edit-busDetails-form/${data._id}`}>
                        <Edit title="Edit" />
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <button
                        className="bg-red-600 h-7 w-24 rounded-md text-white"
                        onClick={() => deleteHandler(data._id)}
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

export default BusDetails;
