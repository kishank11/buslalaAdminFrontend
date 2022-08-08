import React, { useEffect, useState } from "react";
import { GrBus } from "react-icons/gr";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken, getUser } from "../utils/Common";
import ScaleLoader from "react-spinners/ScaleLoader";
//Material-UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import AddNewButton from '../components/AddNewButton';
import View from "../components/View";
// import Edit from '../components/Edit';
import Delete from "../components/Delete";

const ManageCustomers = () => {
  const [customersData, setCustomersData] = useState();
  const [loading, setLoading] = useState(true);
  const [user] = useState(getUser());

  useEffect(() => {
    axios
      .get(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/getallcustomer",
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        setCustomersData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (user.type == "subadmin") {
    window.location.replace("/bus-details");
  }

  return (
    <React.Fragment>
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <ScaleLoader color="green" />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center flex-col overflow-y-scroll px-8 mb-12">
          <div className="flex items-center text-left w-full pb-4 text-3xl justify-between">
            <div className="flex">
              <GrBus className="mr-4" />
              Manage Customers
            </div>

            {/* <Link to="/new-customer-form">
                            <AddNewButton title="Add New Customer"/>
                        </Link> */}
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
                  <TableCell align="center">Customer ID</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone No.</TableCell>
                  <TableCell align="center">View</TableCell>
                  {/* <TableCell align="center">Edit</TableCell> */}
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customersData.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="center">{row.first_name}</TableCell>
                    <TableCell align="center">{row.last_name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.number}</TableCell>
                    <TableCell align="center">
                      <Link to={`/manage-customers/view-customers/${row._id}`}>
                        <View title="View" />
                      </Link>
                    </TableCell>
                    {/* <TableCell align="center">
                                        <Link to="/new-customer-form">
                                            <Edit title={row.edit} />
                                        </Link>
                                    </TableCell> */}
                    <TableCell align="center">
                      <Delete title={row.status} />
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

export default ManageCustomers;
