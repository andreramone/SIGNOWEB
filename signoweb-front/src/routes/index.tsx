import React from "react";

import { Routes as MyRoutes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import Poll from "../Pages/Poll";
import CreatePoll from "../Pages/CreatePoll";
import EditPoll from "../Pages/EditPoll";

const Routes: React.FC = () => (
  <MyRoutes>
    <Route path="/" element={<Home />} />
    <Route path="/poll/:poll_id" element={<Poll />} />
    <Route path="/create" element={<CreatePoll />} />
    <Route path="/edit/:poll_id" element={<EditPoll />} />
  </MyRoutes>
);

export default Routes;