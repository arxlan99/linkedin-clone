import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Fragment, useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [props]);

  return (
    <BrowserRouter>
      <Routes>
        {!props.user ? (
          <Route path="*" element={<Login />} />
        ) : (
          <Fragment>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />}>
              <Route path="/Home" />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Fragment>
        )}
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserAuth: () => dispatch(getUserAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
