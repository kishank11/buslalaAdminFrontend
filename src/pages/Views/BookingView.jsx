import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { getToken } from "../../utils/Common";
import ScaleLoader from "react-spinners/ScaleLoader";
import moment from "moment";

const BookingView = () => {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await axios
      .get(
        `https://coral-app-5v83l.ondigitalocean.app/api/admin/onebookingDetail/${id}`,
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        setBookingData(response.data.data);
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
        <div className="mt-8">
          <div className="px-60 h-16 flex items-center justify-between mb-4">
            <p className="text-3xl">Viewing Booking Details</p>
            <Link to="/manage-drivers">
              <BsArrowReturnLeft size={35} className="cursor-pointer" />
            </Link>
          </div>
          <div className="mx-20 bg-[#969557] rounded-2xl p-4 flex flex-col items-center text-white justify-center">
            <Row title="Name" data={bookingData.name} />
            <Row title="Email" data={bookingData.email} />
            <Row title="Phone Number" data={bookingData.ph_number} />
            <Row title="Status" data={bookingData?.status} />
            <Row title="1st Seat" data={bookingData.seat_number1} />
            {bookingData.seat_number2 ? (
              <Row title="2nd Seat" data={bookingData.seat_number2} />
            ) : (
              <></>
            )}
            <Row
              title="Date of Booking Ticket"
              data={moment(bookingData?.date).format("DD MMM YYYY")}
            />
            <Row
              title="Trip Date"
              data={moment(bookingData?.tripId?.date).format("DD MMM YYYY")}
            />
            <Row title="Trip Time" data={bookingData?.tripId?.time?.dept} />
            <Row title="Customer Email" data={bookingData?.email} />
            <Row title="Customer Mobile" data={bookingData?.ph_number} />

            <img src={bookingData.doc_image} width="500" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const Row = ({ title, data }) => {
  return (
    <div className="flex items-center mb-10">
      <p className="text-5xl">{title} : </p>
      <span className="text-4xl">&nbsp;{data}</span>
    </div>
  );
};

export default BookingView;
