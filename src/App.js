import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Fragment, useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
import styled from "styled-components";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
    console.log(props.loading);
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

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserAuth: () => dispatch(getUserAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// eslint-disable-next-line no-lone-blocks
{
  /* <BrowserRouter>
      {props.loading ? (
        <Spinner>Loading...</Spinner>
      ) : (
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
      )}
    </BrowserRouter> */
}
