import React, { useEffect, useState } from "react";
// import { GrCurrency } from 'react-icons/gr';
import { getToken } from "../utils/Common";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import View from "../components/View";
//Material-UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Edit from '../components/Edit';

import { Link } from "react-router-dom";

const BookingDetails = () => {
  const [bookingDetailsData, setBookingDetailsData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/bookingDetails",
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        console.log(response?.data?.data);
        setBookingDetailsData(response?.data?.data);
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
        <div className="h-full flex items-center flex-col overflow-y-scroll px-8 mt-6">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1000 }} aria-label="caption table">
              <TableHead
                style={{
                  boxShadow: "0px 1px 9px rgba(0, 0, 0, 0.12)",
                  borderRadius: "12px",
                }}
              >
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Bus Name</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell align="center">Customer Name</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Status</TableCell>
                  {/* <TableCell align="center">Edit</TableCell> */}
                  <TableCell align="center">View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingDetailsData?.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell component="th" scope="row">
                      {data._id}
                    </TableCell>
                    <TableCell>{data.tripId?.busId?.name}</TableCell>
                    <TableCell>{data.tripId?.sourceId?.name}</TableCell>
                    <TableCell>{data.tripId?.destinationId?.name}</TableCell>
                    <TableCell align="center">{data.name}</TableCell>
                    <TableCell align="center">{data.price}</TableCell>
                    <TableCell align="center">{data.status}</TableCell>
                    {/* <TableCell align="center"><Edit title="Edit"/></TableCell> */}
                    <TableCell align="center">
                      <Link to={`/booking-details/view-booking/${data._id}`}>
                        <View title="View" />
                      </Link>
                      <Link to={`/api/user/cancelBookings/${data._id}`}>
                        <View title="Cancel" />
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

export default BookingDetails;
