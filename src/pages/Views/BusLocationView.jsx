import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { getToken } from "../../utils/Common";
import ScaleLoader from "react-spinners/ScaleLoader";
import moment from "moment";

const BusLocationView = () => {
  const { id } = useParams();
  const [bus, setBus] = useState();
  const [loading, setLoading] = useState(true);

  const GOOGLE_MAPS_APIKEY = "AIzaSyB8rEE5-xgSHo4hMcO5FZIs1AoP9nguFrY";

  useEffect(async () => {
    await axios
      .get(
        `https://coral-app-5v83l.ondigitalocean.app/api/admin/onebusDetail/${id}`,
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        setBus(response.data.data);
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
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="mt-8"
        >
          {bus.latitude && bus.longitude ? (
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${bus.latitude},${bus.longitude},&zoom=13&scale=1&size=800x600&maptype=roadmap&key=AIzaSyADsP1zSHCrMeyM2spsz4uwRj0PVnQlNx0&format=png&visual_refresh=true&markers=icon:http://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico|34.052230,-118.243680`}
              alt="Google Map of Albany, NY"
            ></img>
          ) : (
            <h2>Location not available</h2>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default BusLocationView;
