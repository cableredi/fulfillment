import React from "react";
import { Switch } from "react-router-dom";
import PublicOnlyRoute from './Utils/PublicRoute';
import PrivateRoute from './Utils/PrivateRoute';
import LandingPage from "./routes/LandingPage";
import MainPage from './routes/MainPage';
import ViewPage from './routes/ViewPage';

export default function App() {
  return (
    <>
      <Switch>
        <PublicOnlyRoute exact path="/" component={LandingPage} />
        <PrivateRoute exact path='/main' component={MainPage} />
        <PrivateRoute exact path='/view' component={ViewPage} />
        <PrivateRoute exact path='/view/table' component={ViewPage} />
      </Switch>
    </>
  );
}
