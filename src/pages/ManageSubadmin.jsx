import React, { useState, useEffect } from "react";
import { GrBus } from "react-icons/gr";
import axios from "axios";
import { getToken } from "../utils/Common";
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
// import View from '../components/View';
// import Edit from '../components/Edit';
// import Delete from '../components/Delete';

const ManageSubadmin = () => {
  const [allAdminData, setAllAdminData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/alladminlist",
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response.data.data);
        setAllAdminData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = async (id) => {
    console.log(id);
    await axios
      .delete(
        `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/deleteadmin/${id}`,
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

  const statusHandler = async (id, status) => {
    console.log(id);
    if (status === "pending") {
      status = "active";
    } else {
      status = "pending";
    }
    console.log(status);
    await axios
      .patch(
        `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/statusadmin/${id}`,
        {
          status: status,
        },
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
        <div className="h-full flex items-center flex-col overflow-y-scroll px-8 py-14">
          <div className="flex items-center text-left w-full pb-4 text-3xl justify-between">
            <div className="flex">
              <GrBus className="mr-4" />
              Manage Subadmin
            </div>

            <Link to="/all-admin-form">
              <AddNewButton title="Add New Subadmin" />
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
                  <TableCell>Subadmin ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone No.</TableCell>
                  {/* <TableCell align="center">View</TableCell> */}
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allAdminData?.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.number}</TableCell>
                    {/* <TableCell align="center"><View title="View"/></TableCell> */}
                    <TableCell align="center">
                      <button
                        className="bg-blue-600 h-7 w-24 rounded-md text-white"
                        onClick={() => statusHandler(row._id, row.status)}
                      >
                        {row.status}
                      </button>
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

export default ManageSubadmin;
