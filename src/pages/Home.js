import React, { Fragment } from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import Main from "../components/Main";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <Fragment>
      <Header />
      <Container>
        <img src="/images/loading-spinner" alt="" />
        <Section>
          <h5>
            <Link to="#!">Hiring in a hurry? </Link>
          </h5>
          <p>
            - Find talented pros in record time with Upwork and keep business
            moving.
          </p>
        </Section>
        <Layout>
          <LeftSide />
          <Main />
          <RightSide />
        </Layout>
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
`;

/* const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`; */

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  padding: 0 30px;
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  /* grid-template-row: auto; */
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Home);
