import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
import { auth } from "./firebase";
import styled from "styled-components";

function App(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.getUserAuth();
  }, [props]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <Spinner>
        <img src="/images/spinner.svg" alt="" />
      </Spinner>
    );
  }

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

const Spinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  border-radius: 5px;
  z-index: 999;
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
