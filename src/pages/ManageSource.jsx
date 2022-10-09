import React, { useEffect, useState } from "react";
import { GrBus } from "react-icons/gr";
import { Link } from "react-router-dom";
//Material-UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Edit from "../components/Edit";
import { getToken } from "../utils/Common";
import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import AddNewButton from "../components/AddNewButton";

const ManageSource = () => {
  const [sourceData, setSourceData] = useState();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    axios
      .get("https://coral-app-5v83l.ondigitalocean.app/api/admin/source", {
        headers: { Authorization: getToken() },
      })
      .then((response) => {
        setSourceData(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (search != "") {
      const new1 = sourceData.filter((result) => {
        return Object.values(result)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFiltered(new1);
      console.log(new1);
    }
  }, [search]);
  return (
    <React.Fragment>
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <ScaleLoader color="green" />
        </div>
      ) : (
        <div className="h-full flex items-center justify-center flex-col overflow-y-scroll px-8 mt-6">
          <div className="flex items-center text-left w-full pb-4 text-3xl justify-between">
            <div className="flex">
              <GrBus className="mr-4" />
              Manage Source
            </div>
            <input
              type="text"
              value={search}
              placeholder="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <Link to="/new-source-form">
              <AddNewButton title="Add New Source" />
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
                  <TableCell>Source ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Pickup Time</TableCell>
                  <TableCell align="center">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!search
                  ? sourceData?.map((data) => (
                      <TableRow key={data._id}>
                        <TableCell component="th" scope="row">
                          {`${data._id}`}
                        </TableCell>
                        <TableCell align="center">{data.name}</TableCell>
                        <TableCell align="center">
                          {data?.pick_up_time?.length >= 1
                            ? `${data.pick_up_time}`
                            : "7:05 PM"}
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/edit-source-form/${data._id}`}>
                            <Edit title="Edit" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  : filtered?.map((data) => (
                      <TableRow key={data._id}>
                        <TableCell component="th" scope="row">
                          {`${data._id}`}
                        </TableCell>
                        <TableCell align="center">{data.name}</TableCell>
                        <TableCell align="center">
                          {data?.pick_up_time?.length >= 1
                            ? `${data.pick_up_time}`
                            : "7:05 PM"}
                        </TableCell>
                        <TableCell align="center">
                          <Link to={`/edit-source-form/${data._id}`}>
                            <Edit title="Edit" />
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

export default ManageSource;
