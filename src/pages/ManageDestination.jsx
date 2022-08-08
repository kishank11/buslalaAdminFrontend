import React, { useState, useEffect } from "react";
import { GrBus } from "react-icons/gr";
import { Link } from "react-router-dom";
//Material-UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Edit from "../components/Edit";
import { getToken } from "../utils/Common";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import AddNewButton from "../components/AddNewButton";

const ManageDestination = () => {
  const [destinationData, setDestinationData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/destination",
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response.data.data);
        setDestinationData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              Manage Destination
            </div>

            <Link to="/new-destination-form">
              <AddNewButton title="Add New Destination" />
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
                  <TableCell>Destination ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Drop Time</TableCell>
                  <TableCell align="center">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {destinationData.map((data) => {
                  return (
                    <TableRow key={data._id}>
                      <TableCell component="th" scope="row">
                        {data._id}
                      </TableCell>
                      <TableCell align="center">{data.name}</TableCell>
                      <TableCell align="center">
                        {data.drop_of_time.length === 1
                          ? data.drop_of_time[0]
                          : "07:15"}
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`/edit-destination-form/${data._id}`}>
                          <Edit title="Edit" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </React.Fragment>
  );
};

export default ManageDestination;
