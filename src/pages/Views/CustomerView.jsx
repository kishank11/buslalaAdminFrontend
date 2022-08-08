import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { getToken } from "../../utils/Common";
// import ScaleLoader from "react-spinners/ScaleLoader";

const CustomerView = () => {
  const { id } = useParams();
  // const [customerData, setCustomerData] = useState();
  // const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await axios
      .get(
        `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/getonecustomer/${id}`,
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        // setCustomerData(response.data.data);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mt-8">
      <div className="px-60 h-16 flex items-center justify-between">
        <p className="text-3xl">Viewing Customer</p>
        <Link to="/">
          <BsArrowReturnLeft size={35} className="cursor-pointer" />
        </Link>
      </div>

      <div></div>
    </div>
  );
};

export default CustomerView;
