import React, { useEffect, useState } from "react";
import { GrBus } from "react-icons/gr";
import { getToken } from "../utils/Common";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
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
import Edit from "../components/Edit";
import moment from "moment";
import "./style.css";
import { width } from "@mui/system";

const ManageRoutes = () => {
  const [allRoutesData, setAllRoutesData] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get("https://coral-app-5v83l.ondigitalocean.app/api/admin/alltrip", {
        headers: { Authorization: getToken() },
      })
      .then((response) => {
        console.log(response?.data?.data);
        setAllRoutesData(response?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (search != "") {
      const new1 = allRoutesData?.filter((result) => {
        if (result?.sourceId?.name) {
          return Object.values(result?.sourceId)
            .join("")
            .toLowerCase()
            .includes(search.toLowerCase());
        }
      });
      setFiltered(new1);
      console.log(new1);
    }
  }, [search]);
  return (
    <React.Fragment>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <ScaleLoader color="green" />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center flex-col overflow-hidden px-8 py-8">
          <div className="flex items-center text-left w-full pb-4 text-3xl justify-between">
            <div className="flex">
              <GrBus className="mr-4" />
              Manage Routes
            </div>
            <input
              type="text"
              value={search}
              placeholder="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>

            <Link to="/all-routes-form">
              <AddNewButton title="Add New Route" />
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
                  <TableCell>Source</TableCell>

                  <TableCell align="center">Destination</TableCell>
                  <TableCell align="center">Driver Name</TableCell>
                  <TableCell align="center">Bus Name</TableCell>
                  <TableCell align="center">Departure Time</TableCell>
                  <TableCell align="center">Arrival Time</TableCell>
                  <TableCell align="center">Departure Date</TableCell>
                  <TableCell align="center">Return Date</TableCell>
                  <TableCell align="center">Mid Lower Berth Fare</TableCell>
                  <TableCell align="center">Mid Upper Berth Fare</TableCell>
                  <TableCell align="center">Mid Lower Sleeper Fare</TableCell>

                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">View Seats</TableCell>
                  <TableCell align="center">Running Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!search
                  ? allRoutesData?.map((row) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {row.sourceId ? `${row?.sourceId?.name}` : ""}
                        </TableCell>

                        <TableCell align="center">
                          {row.destinationId
                            ? `${row?.destinationId?.name}`
                            : ""}
                        </TableCell>
                        <TableCell align="center">{row._id}</TableCell>
                        <TableCell align="center">
                          {row?.busId?.name ? row?.busId?.name : ""}
                        </TableCell>
                        <TableCell align="center">
                          {row.time.dept ? `${row.time.dept}` : ""}
                        </TableCell>
                        <TableCell align="center">{row.time.arr}</TableCell>

                        <TableCell align="center">
                          {row.date
                            ? moment(row.date).format("DD MMM YYYY")
                            : moment(row.deptDate).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell align="center">
                          {row.returnDate
                            ? `${moment(row.returnDate).format("DD MMM YYYY")}`
                            : ""}
                        </TableCell>
                        <TableCell align="center">
                          {row?.midpoint ? `${row?.midpoint.lowerBerth}` : ""}
                        </TableCell>
                        <TableCell align="center">
                          {row?.midpoint ? `${row?.midpoint.upperBerth}` : ""}
                        </TableCell>
                        <TableCell align="center">
                          {row?.midpoint ? `${row?.midpoint.lowerSleeper}` : ""}
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/all-routes-form/${row._id}`}>
                            <Edit title="Edit" />
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/manage-routes/view-router/${row._id}`}>
                            <Edit title="View" />
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            to={
                              row.busId
                                ? `/bus-details/location/${row.busId._id}`
                                : ""
                            }
                          >
                            <Edit
                              title={
                                row.status == "success"
                                  ? "Running"
                                  : "Not Running"
                              }
                            />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  : filtered?.map((row) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {row.sourceId ? `${row?.sourceId?.name}` : ""}
                        </TableCell>

                        <TableCell align="center">
                          {row.destinationId
                            ? `${row?.destinationId?.name}`
                            : ""}
                        </TableCell>
                        <TableCell align="center">{row._id}</TableCell>
                        <TableCell align="center">
                          {row.busId ? row.busId._id : ""}
                        </TableCell>
                        <TableCell align="center">
                          {row.time.dept ? `${row.time.dept}` : ""}
                        </TableCell>
                        <TableCell align="center">{row.time.arr}</TableCell>

                        <TableCell align="center">
                          {row.date
                            ? moment(row.date).format("DD MMM YYYY")
                            : moment(row.deptDate).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell align="center">
                          {row.returnDate
                            ? `${moment(row.returnDate).format("DD MMM YYYY")}`
                            : ""}
                        </TableCell>
                        <TableCell align="center">
                          {row?.midpoint ? `${row?.midpint.lowerBerth}` : ""}
                        </TableCell>
                        <TableCell align="center">
                          {row?.midpoint ? `${row?.midpint.upperBerth}` : ""}
                        </TableCell>
                        <TableCell align="center">
                          {row?.midpoint ? `${row?.midpint.lowerSleeper}` : ""}
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/all-routes-form/${row._id}`}>
                            <Edit title="Edit" />
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/manage-routes/view-router/${row._id}`}>
                            <Edit title="View" />
                          </Link>
                        </TableCell>
                        <TableCell align="center">
                          <Link
                            to={
                              row.busId
                                ? `/bus-details/location/${row.busId._id}`
                                : ""
                            }
                          >
                            <Edit
                              title={
                                row.status == "success"
                                  ? "Running"
                                  : "Not Running"
                              }
                            />
                          </Link>
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

export default ManageRoutes;
