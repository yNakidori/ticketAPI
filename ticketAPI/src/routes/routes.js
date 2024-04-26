import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import logIn from "../register/logIn";
import mainPage from "../pages/mainPage";

const Routes = () => {
    return(
        <BrowserRouter>
        <Route Component={logIn} path="login" exact />
        <Route Component={mainPage} path="mainpage" exact />
        </BrowserRouter>
    )
}

export default Routes;