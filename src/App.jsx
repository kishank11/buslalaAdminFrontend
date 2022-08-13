import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DashboardHome from "./pages/DashboardHome"
import BusDetails from "./pages/BusDetails";
// import LocationDetails from "./pages/LocationDetails"
import BookingDetails from "./pages/BookingDetails";
import ManageCustomers from "./pages/ManageCustomers";
import ManageDrivers from "./pages/ManageDrivers";
import ManageSubadmin from "./pages/ManageSubadmin";
import ManageSource from "./pages/ManageSource";
import ManageMidpoint from "./pages/ManageMidpoint";
import ManageDestination from "./pages/ManageDestination";

// import ManageFare from "./pages/ManageFare"
import ManageRoutes from "./pages/ManageRoutes";
import Login from "./pages/Login";
// import CustomerForm from "./pages/Forms/CustomerForm"
import DriverForm from "./pages/Forms/DriverForm";
import { getToken, getUser } from "./utils/Common";
import BusDetailsForm from "./pages/Forms/BusDetailsForm";
import SourceForm from "./pages/Forms/SourceForm";
import DestinationForm from "./pages/Forms/DestinationForm";
import AllRoutesForms from "./pages/Forms/AllRoutesForms";
import SubAdminForm from "./pages/Forms/SubAdminForm";
import MidpointForm from "./pages/Forms/MidpointForm";

import CustomerView from "./pages/Views/CustomerView";
import DriverView from "./pages/Views/DriverView";
import RouteView from "./pages/Views/RouteView";
import BookingView from "./pages/Views/BookingView";
import BusLocationView from "./pages/Views/BusLocationView";

const App = () => {
  const [token] = useState(getToken());
  const [user, setUser] = useState();

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await axios
      .get(
        "https://sea-turtle-app-5sz9y.ondigitalocean.app/api/admin/adminuserlog",
        {
          headers: {
            Authorization: token,
            "access-control-allow-origin": "*",
          },
        }
      )
      .then((response) => {
        setUser(response.data.data[0]);
        console.log(response.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!token) {
    return (
      <>
        <div>
          <Login />
        </div>
      </>
    );
  }

  if (token) {
    return (
      <div className="flex h-screen">
        <Router>
          <Sidebar />
          <div className="flex flex-col w-full">
            <Header />
            <Routes>
              {/* <Route path="/" element={<DashboardHome />} /> */}
              <Route path="/bus-details" element={<BusDetails />} />
              {/* <Route path="/location-details" element={<LocationDetails />} /> */}
              <Route path="/booking-details" element={<BookingDetails />} />
              <Route path="/" element={<ManageCustomers />} />
              <Route path="/manage-drivers" element={<ManageDrivers />} />
              <Route path="/manage-subadmin" element={<ManageSubadmin />} />
              <Route path="/manage-source" element={<ManageSource />} />
              <Route path="/manage-midpoint" element={<ManageMidpoint />} />

              <Route
                path="/manage-destination"
                element={<ManageDestination />}
              />
              {/* <Route path="/manage-fare" element={<ManageFare />} /> */}
              <Route path="/manage-routes" element={<ManageRoutes />} />
              <Route
                path="/manage-routes/view-router/:id"
                element={<RouteView />}
              />
              {/* <Route path="/new-customer-form" element={<CustomerForm />} /> */}
              <Route path="/new-driver-form" element={<DriverForm />} />
              <Route path="/addBus" element={<BusDetailsForm />} />
              <Route path="/new-source-form" element={<SourceForm />} />
              <Route
                path="/new-destination-form"
                element={<DestinationForm />}
              />
              <Route path="/new-midpoint-form" element={<MidpointForm />} />
              <Route path="/edit-source-form/:id" element={<SourceForm />} />
              <Route
                path="/edit-midpoint-form/:id"
                element={<MidpointForm />}
              />

              <Route
                path="/edit-destination-form/:id"
                element={<DestinationForm />}
              />
              <Route
                path="/edit-busDetails-form/:id"
                element={<BusDetailsForm />}
              />
              <Route path="/all-routes-form" element={<AllRoutesForms />} />
              <Route path="/all-routes-form/:id" element={<AllRoutesForms />} />
              <Route path="/all-admin-form" element={<SubAdminForm />} />
              <Route path="/edit-driver-form/:id" element={<DriverForm />} />
              <Route
                path="/manage-customers/view-customers/:id"
                element={<CustomerView />}
              />
              <Route
                path="/manage-drivers/view-driver/:id"
                element={<DriverView />}
              />
              <Route
                path="/booking-details/view-booking/:id"
                element={<BookingView />}
              />
              <Route
                path="/bus-details/location/:id"
                element={<BusLocationView />}
              />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
};

export default App;
