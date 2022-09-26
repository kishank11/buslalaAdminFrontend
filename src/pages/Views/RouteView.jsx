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
  const { id } = useParams();

  const [tripData, setTripData] = useState({});

  const [isSending, setIsSending] = useState(false);
  const [lowerBerth, setLowerBerth] = useState([]);
  const [upperBerth, setUpperBerth] = useState([]);

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

  useEffect(() => {
    const lowerBerth = [];
    const upperBerth = [];
    tripData?.seats?.map((item) => {
      if (item.place == "upperBirthA" || item.place == "upperBirthB") {
        upperBerth.push(item);
        console.log(upperBerth);
      } else {
        lowerBerth.push(item);
      }
      setLowerBerth(lowerBerth);
      setUpperBerth(upperBerth);
    });
    console.log(upperBerth);

    console.log(lowerBerth);
  }, []);
  const handleClick = async (item) => {
    if (item.status == 0) {
      setIsSending(true);
      console.log(item);
      await axios
        .patch(
          `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/bookBus/${id}`,
          {
            seat_number1: item.number,
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
      1;
      setIsSending(false);
    } else {
      console.log(item);
      setIsSending(true);
      await axios
        .patch(
          `https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/unBookBus/${id}`,
          {
            seat_number1: item.number,
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
            {tripData.busId && tripData.busId.bus_model == "2+1" ? (
              <Grid container spacing={2}>
                {lowerBerth.map((item, index) => {
                  return (
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        color={item.status == 1 ? "error" : "success"}
                        onClick={() => handleClick(item)}
                      >
                        {item.number}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <></>
            )}

            {tripData.busId && tripData.busId.bus_model == "2+2" ? (
              <Grid container spacing={1}>
                <Grid container xs={6}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h4" component="h2">
                      A
                    </Typography>
                  </Grid>
                  {lowerBerth
                    .slice(0, lowerBerth.length / 2)
                    .map((item, index, array) => {
                      return (
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            color={item.status == 1 ? "error" : "success"}
                            onClick={() => handleClick(item)}
                          >
                            {item.number}
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
                  {upperBerth.map((item, index, array) => {
                    return (
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color={item.status == 1 ? "error" : "success"}
                          onClick={() => handleClick(item)}
                        >
                          {item.number}
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
            {tripData.busId && tripData.busId.bus_model == "2+1" ? (
              <Grid container spacing={2}>
                {upperBerth.map((item, index) => {
                  return (
                    <Grid item xs={4}>
                      <Button
                        variant="contained"
                        color={item.status == 1 ? "error" : "success"}
                        onClick={() => handleClick(item)}
                      >
                        {item.number}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <></>
            )}

            {tripData.busId && tripData.busId.bus_model == "2+2" ? (
              <Grid container spacing={1}>
                <Grid container xs={6}>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="h4" component="h2">
                      A
                    </Typography>
                  </Grid>
                  {upperBerth
                    .slice(0, upperBerth.length / 2)
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
                  {upperBerth
                    .slice(upperBerth.length / 2)
                    .map((item, index, array) => {
                      return (
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            color={item.status == 1 ? "error" : "success"}
                            onClick={() => handleClick(item)}
                          >
                            {item.number}
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
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";
// import { BsArrowReturnLeft } from "react-icons/bs";
// import { getToken } from "../../utils/Common";

// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import { Typography } from "@mui/material";

// const DriverView = () => {
//   const { id } = useParams(null);

//   const [tripData, setTripData] = useState(null);

//   const [isSending, setIsSending] = useState(false);

//   useEffect(async () => {
//     setIsSending(true);
//     await axios
//       .get(`http://127.0.0.1:3001/api/admin/onetrip/${id}`, {
//         headers: { Authorization: getToken() },
//       })
//       .then((response) => {
//         console.log(response.data.data);
//         setTripData(response.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     setIsSending(false);
//   }, [isSending]);

//   const handleClick = async (item) => {
//     if (item.status == 0) {
//       setIsSending(true);
//       console.log(item);
//       await axios
//         .patch(
//           `http://127.0.0.1:3001/api/admin/bookBus/${id}`,
//           {
//             seat_number1: item.number,
//           },
//           {
//             headers: { Authorization: getToken() },
//           }
//         )
//         .then((response) => {
//           console.log(response);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//       setIsSending(false);
//     } else {
//       console.log(item);
//       setIsSending(true);
//       await axios
//         .patch(
//           `http://127.0.0.1:3001/api/admin/unBookBus/${id}`,
//           {
//             seat_number1: item.number,
//           },
//           {
//             headers: { Authorization: getToken() },
//           }
//         )
//         .then((response) => {
//           console.log(response);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//       setIsSending(false);
//     }
//   };

//   return (
//     <React.Fragment>
//       <div className="h-full flex items-center justify-center">
//         <Grid
//           container
//           spacing={2}
//           sx={{ margin: 2 }}
//           style={{ textAlign: "center" }}
//         >
//           <Grid item xs={6} md={6}>
//             <Item sx={{ color: "black", fontWeight: "bold", marginBottom: 2,marginTop:0 }}>
//              TRIP DETAILS
//             </Item>
//             {tripData?.busId && tripData?.busId.bus_model == "2+1" ? (
//               <Grid container spacing={2}>
//                 {tripData?.seat?.map((item, index) => {
//                   return (
//                     <Grid item xs={4}>
//                       <Button
//                         variant="contained"
//                         color={item.status == 1 ? "error" : "success"}
//                         onClick={() => handleClick(item)}
//                       >
//                         {item.number}
//                       </Button>
//                     </Grid>
//                   );
//                 })}
//               </Grid>
//             ) : (
//               <></>
//             )}

//             {tripData?.busId && tripData?.busId?.bus_model == "2+2" ? (
//               <Grid container spacing={2}>
//                 <Grid container xs={12}>
//                   <Grid item xs={12} style={{ textAlign: "center"}}>
//                     <Typography variant="h4" component="h2">
//                 SEATS
//                     </Typography>
//                   </Grid>
//                   {tripData?.seats?.map((item, index, array) => {
//                     return (
//                       <Grid item xs={6}>
//                         <Button
//                           variant="contained"
//                           color={item.status == 1 ? "error" : "success"}
//                           onClick={() => handleClick(item)}
//                         >
//                           {item.number}
//                         </Button>
//                       </Grid>
//                     );
//                   })}
//                 </Grid>

//                 {/* <Grid container xs={6}>
//                   <Grid item xs={12} style={{ textAlign: "center" }}>
//                     <Typography variant="h4" component="h2">
//                       B
//                     </Typography>
//                   </Grid>
//                   {tripData?.seats?.map((item, index, array) => {
//                     return (
//                       <Grid item xs={6}>
//                         <Button
//                           variant="contained"
//                           color={item.status == 1 ? "error" : "success"}
//                           onClick={() => handleClick(item)}
//                         >
//                           {item.number}
//                         </Button>
//                       </Grid>
//                     );
//                   })}
//                 </Grid> */}
//               </Grid>
//             ) : (
//               <></>
//             )}
//           </Grid>
//           </Grid>
//           </div>

//     </React.Fragment>
//   );
// };

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// export default DriverView;
