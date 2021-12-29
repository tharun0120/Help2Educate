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


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/login/success">
            <LoginSuccess />
          </Route>
          <Route exact path="/login/failed">
            <ErrorPage />
          </Route>
          <Route path="/donate">
            <DonateResourcePage />
          </Route>

          <Route path="/receive">
            <FindResourcesPage />
          </Route>
          <Route path="/donation/:id">
            <Detail />
          </Route>

          <Route path="/signin">
            <SignInPage />
          </Route>

          <Route path="/signup">
            <SignUpPage />
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
