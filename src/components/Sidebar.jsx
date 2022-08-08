import React from "react";
import { BsPerson } from "react-icons/bs";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { BiBusSchool, BiLocationPlus, BiBook } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getToken, getUser } from "../utils/Common";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarBorder from "@mui/icons-material/StarBorder";
import Logo from "../assets/buslala.jpeg";
import { removeUserSession } from "../utils/Common";

const ItemsCenter =
  "flex items-center h-12 cursor-pointer text-xl border-b-[1px]";

const Sidebar = () => {
  const [open, setOpen] = React.useState(true);
  const [token] = React.useState(getToken());
  const [user] = React.useState(getUser());

  let RoutesCollapse;

  if (user.type == "subadmin") {
    RoutesCollapse = [
      {
        id: 3,
        title: "Manage Routes",
        route: "/manage-routes",
      },
    ];
  } else {
    RoutesCollapse = [
      {
        id: 1,
        title: "Manage Source",
        route: "/manage-source",
      },
      {
        id: 2,
        title: "Manage Destination",
        route: "/manage-destination",
      },
      {
        id: 3,
        title: "Manage Routes",
        route: "/manage-routes",
      },
    ];
  }

  React.useEffect(() => {
    console.log(user);
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const logoutHandler = () => {
    removeUserSession();
    window.location.reload();
  };
  return (
    <div className="w-96 bg-[#969557] h-screen px-4 pb-16 pt-10 flex flex-col justify-between overflow-y-scroll whitespace-nowrap">
      <div className="text-2xl text-white flex items-center justify-center h-24">
        <img src={Logo} alt="logo" height="100px" width="100px" />
      </div>

      <div className="text-white p-6">
        <ul className="flex flex-col justify-around h-full">
          {/* <Link to='/'>
                        <List component="div" disablePadding className={ItemsCenter}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <BsPerson color="white" size={25}/>
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </List>
                    </Link> */}

          {user.type == "admin" ? (
            <Link to="/">
              <List component="div" disablePadding className={ItemsCenter}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BsPerson color="white" size={25} />
                  </ListItemIcon>
                  <ListItemText primary="Manage Customers" />
                </ListItemButton>
              </List>
            </Link>
          ) : (
            <></>
          )}

          {user.type == "admin" ? (
            <Link to="/manage-drivers">
              <List component="div" disablePadding className={ItemsCenter}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BsPerson color="white" size={25} />
                  </ListItemIcon>
                  <ListItemText primary="Manage Driver" />
                </ListItemButton>
              </List>
            </Link>
          ) : (
            <></>
          )}

          {user.type == "admin" ? (
            <Link to="/manage-subadmin">
              <List component="div" disablePadding className={ItemsCenter}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BsPerson color="white" size={25} />
                  </ListItemIcon>
                  <ListItemText primary="Manage Subadmin" />
                </ListItemButton>
              </List>
            </Link>
          ) : (
            <></>
          )}

          <Link to="/bus-details">
            <List component="div" disablePadding className={ItemsCenter}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BiBusSchool color="white" size={25} />
                </ListItemIcon>
                <ListItemText primary="Bus Details" />
              </ListItemButton>
            </List>
            {/* <li className={ItemsCenter}><BiBusSchool />Bus Details</li> */}
          </Link>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Routes" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {RoutesCollapse.map((item) => (
              <Link to={item.route}>
                <List
                  component="div"
                  disablePadding
                  key={item.id}
                  className={ItemsCenter}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </List>
              </Link>
            ))}
          </Collapse>
          {/* <Link to='location-details'>
                        <List component="div" disablePadding className={ItemsCenter}>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <BiLocationPlus color="white" size={25}/>
                                </ListItemIcon>
                                <ListItemText primary="Location Details" />
                            </ListItemButton>
                        </List>
                    </Link> */}

          {user.type == "admin" ? (
            <Link to="booking-details">
              <List component="div" disablePadding className={ItemsCenter}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BiBook color="white" size={25} />
                  </ListItemIcon>
                  <ListItemText primary="Booking Details" />
                </ListItemButton>
              </List>
              {/* <li className={ItemsCenter}><BiBook />Booking Details</li> */}
            </Link>
          ) : (
            <></>
          )}
        </ul>
      </div>

      <div className="h-28 p-4 text-white flex items-center justify-center">
        <ul className="flex flex-col items-center justify-around w-full h-24">
          <li className={`${ItemsCenter} pb-6 w-full flex justify-center`}>
            <CgProfile />
            Profile
          </li>
          <li className={`${ItemsCenter} border-none`} onClick={logoutHandler}>
            <CgLogOut />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
