import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [props]);
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/Home" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

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
