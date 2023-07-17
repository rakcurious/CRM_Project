import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "../pages/admin";
import Customer from "../pages/customer";
import Engineer from "../pages/engineer";
import Login from "../pages/login";
import Wanderer from "../pages/wanderer";
import RequireAuth from "./RequireAuth";
import Unauthorised from "../pages/unauthorised";

const Routing = () => {
  const ROLES = {
    ADMIN: "ADMIN",
    CUSTOMER: "CUSTOMER",
    ENGINEER: "ENGINEER",
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RequireAuth secureUser={[ROLES.ADMIN]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth secureUser={[ROLES.CUSTOMER]} />}>
          <Route path="/customer" element={<Customer />} />
        </Route>
        <Route element={<RequireAuth secureUser={[ROLES.ENGINEER]} />}>
          <Route path="/engineer" element={<Engineer />} />
        </Route>
        <Route path="/*" element={<Wanderer />} />
        <Route path="/unauthorised" element={<Unauthorised />} />
      </Routes>
    </Router>
  );
};

export default Routing;
