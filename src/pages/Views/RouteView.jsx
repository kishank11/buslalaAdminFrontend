import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { getToken } from "../../utils/Common";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const DriverView = () => {
  const { id } = useParams(null);

  const [tripData, setTripData] = useState(null);

  const [isSending, setIsSending] = useState(false);

  useEffect(async () => {
    setIsSending(true);
    await axios
      .get(
        `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/onetrip/${id}`,
        {
          headers: { Authorization: getToken() },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        setTripData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsSending(false);
  }, [isSending]);

  const handleClick = async (item) => {
    if (item.status == 0) {
      setIsSending(true);
      console.log(item);
      await axios
        .patch(
          `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/bookBus/${id}`,
          {
            seat_number1: item.id,
          },
          {
            headers: { Authorization: getToken() },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsSending(false);
    } else {
      console.log(item);
      setIsSending(true);
      await axios
        .patch(
          `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/unBookBus/${id}`,
          {
            seat_number1: item.id,
          },
          {
            headers: { Authorization: getToken() },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsSending(false);
    }
  };

  return (
    <React.Fragment>
      <div className="h-full flex items-center justify-center">
        <Grid
          container
          spacing={2}
          sx={{ margin: 2 }}
          style={{ textAlign: "center" }}
        >
          <Grid item xs={6} md={6}>
            <Item sx={{ color: "black", fontWeight: "bold", marginBottom: 2 }}>
              LowerBerth
            </Item>
            {tripData?.busId && tripData?.busId.bus_model == "2+1" ? (
              <Grid container spacing={2}>
                {tripData.number.map((item, index) => {
                  return (
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        color={item.status == 1 ? "error" : "success"}
                        onClick={() => handleClick(item)}
                      >
                        {"S" + (Number(index) + 1)}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <></>
            )}

            {tripData?.busId && tripData?.busId?.bus_model == "2+2" ? (
              <Grid container spacing={1}>
                <Grid container xs={6}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h4" component="h2">
                      A
                    </Typography>
                  </Grid>
                  {tripData?.seat_number?.lowerBerth &&
                    tripData?.seat_number?.lowerBerth
                      .slice(0, tripData.seat_number.lowerBerth.length / 2)
                      .map((item, index, array) => {
                        return (
                          <Grid item xs={6}>
                            <Button
                              variant="contained"
                              color={item.status == 1 ? "error" : "success"}
                              onClick={() => handleClick(item)}
                            >
                              {"S" + item.id}
                            </Button>
                          </Grid>
                        );
                      })}
                </Grid>

                <Grid container xs={6}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h4" component="h2">
                      B
                    </Typography>
                  </Grid>
                  {tripData?.seat_number?.lowerBerth
                    .slice(tripData.seat_number.lowerBerth.length / 2)
                    .map((item, index, array) => {
                      return (
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            color={item.status == 1 ? "error" : "success"}
                            onClick={() => handleClick(item)}
                          >
                            {"S" + (Number(index) + 1)}
                          </Button>
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>

          <Grid item xs={6} md={6}>
            <Item sx={{ color: "black", fontWeight: "bold", marginBottom: 2 }}>
              UpperBerth
            </Item>
            {tripData?.busId && tripData?.busId?.bus_model == "2+1" ? (
              <Grid container spacing={2}>
                {tripData.seat_number.upperBerth.map((item, index) => {
                  return (
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        color={item.status == 1 ? "error" : "success"}
                        onClick={() => handleClick(item)}
                      >
                        {"SL" + (Number(index) + 1)}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <></>
            )}

            {tripData?.busId && tripData?.busId?.bus_model == "2+2" ? (
              <Grid container spacing={1}>
                <Grid container xs={6}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h4" component="h2">
                      A
                    </Typography>
                  </Grid>
                  {tripData?.seat_number?.upperBerth
                    .slice(0, tripData.seat_number.upperBerth.length / 2)
                    .map((item, index) => {
                      return (
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            color={item.status == 1 ? "error" : "success"}
                            onClick={() => handleClick(item)}
                          >
                            {"SL" + (Number(index) + 1)}
                          </Button>
                        </Grid>
                      );
                    })}
                </Grid>
                <Grid container xs={6}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h4" component="h2">
                      B
                    </Typography>
                  </Grid>
                  {tripData?.seat_number?.upperBerth
                    .slice(tripData.seat_number.upperBerth.length / 2)
                    .map((item, index, array) => {
                      return (
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            color={item.status == 1 ? "error" : "success"}
                            onClick={() => handleClick(item)}
                          >
                            {"SL" + (Number(index) + 1)}
                          </Button>
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default DriverView;
