import React, { useEffect } from "react";
import LandingPage from "./components/LandingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import DonateResourcePage from "./components/DonateResourcePage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import FindResourcesPage from "./components/FindResourcePage";
import ErrorPage from "./components/ErrorPage";
import AttributionsPage from "./components/AttributionsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginSuccess from "./components/LoginSuccess";
import Detail from "./components/Detail";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, selectUser } from "./features/users/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUser);
  useEffect(() => {
    dispatch(isLoggedIn());
  }, []); //eslint-disable-line
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage currentUser={user} />
          </Route>
          <Route exact path="/login/success">
            <LoginSuccess />
          </Route>
          <Route exact path="/login/failed">
            <ErrorPage />
          </Route>
          <Route path="/donate">
            <DonateResourcePage currentUser={user} />
          </Route>

          <Route path="/receive">
            <FindResourcesPage currentUser={user} />
          </Route>
          <Route path="/donation/:id">
            <Detail currentUser={user} />
          </Route>

          <Route path="/signin">
            <SignInPage currentUser={user} />
          </Route>

          <Route path="/signup">
            <SignUpPage currentUser={user} />
          </Route>

          <Route path="/attributions">
            <AttributionsPage />
          </Route>

          <Route path="/*">
            <ErrorPage />
          </Route>
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  );
}

export default App;
