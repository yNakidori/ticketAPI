import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import logIn from "../register/logIn";
import mainPage from "../pages/mainPage";

const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <Switch>=
                <Route exact path="/" element={<mainPage />} />
                <Route exact path="/logIn" element={<logIn />} />
            </Switch>
        </BrowserRouter>
    )
}

export default RoutesComponent;