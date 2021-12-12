import styled from "styled-components";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <NoPage>
      <ErrorCode> 404 </ErrorCode>
      <ErrorMessage> Page Not Found... </ErrorMessage>
      <BackHome>
        <Link to="/">Go Back Home</Link>
      </BackHome>
    </NoPage>
  );
};

const NoPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ErrorCode = styled.div`
  text-align: center;
  font-size: 200px;
  font-weight: regular;

  @media (max-width: 768px) {
    font-size: 100px;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 50px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const BackHome = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
  cursor: pointer;
  color: white;
  background-color: #1498f5;
  padding: 10px 20px;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
  a {
    color: white;
  }
  @media (min-width: 768px) {
    padding: 15px 30px;
  }
`;

export default NotFound;
