import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { getToken } from "../../utils/Common";
import ScaleLoader from "react-spinners/ScaleLoader";

const DriverView = () => {
  const { id } = useParams();
  const [driverData, setDriverData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await axios
      .get(
        `https://coral-app-5v83l.ondigitalocean.app/api/admin/getonedriver/${id}`,
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        // console.log(response.data.data);
        setDriverData(response.data.data);
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
            <p className="text-3xl">Viewing Driver</p>
            <Link to="/manage-drivers">
              <BsArrowReturnLeft size={35} className="cursor-pointer" />
            </Link>
          </div>
          <div className="mx-20 bg-[#969557] rounded-2xl p-4 flex flex-col items-center text-white justify-center">
            <Row title="Name" data={driverData.name} />
            <Row title="Email" data={driverData.email} />
            <Row title="Phone Number" data={driverData.number} />
            <Row title="Status" data={driverData.status} />
            <Row title="Document" data="" />
            <img src={driverData.doc_image} width="500" />
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

export default DriverView;
