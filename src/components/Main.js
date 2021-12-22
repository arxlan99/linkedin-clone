import { useState, useEffect, Fragment } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import styled from "styled-components";
import { getArticlesApi } from "../actions";
import PostModal from "./PostModal";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticle();
  }, [props.articles]);

  const clickHandler = (e) => {
    e.preventDefault();
    setShowModal(showModal === "close" ? "open" : "close");
  };

  return (
    <Fragment>
      <Container>
        <SharedBox>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <button
              onClick={clickHandler}
              disabled={props.loading ? true : false}
            >
              Start a post
            </button>
          </div>
          <div>
            <button>
              <img src="/images/photo-icon.svg" width={32} alt="" />
              <span>Photo</span>
            </button>

            <button>
              <img src="/images/video-icon.svg" width={32} alt="" />
              <span>Video</span>
            </button>

            <button>
              <img src="/images/event-icon.svg" color="red" width={24} alt="" />
              <span>Event</span>
            </button>

            <button>
              <img src="/images/article-icon.svg" width={32} alt="" />
              <span>Write article</span>
            </button>
          </div>
        </SharedBox>
        {props.loading && <img src="/images/spinner.svg" alt="" />}
        {props.articles.length === 0 ? (
          <p>There are no articles...</p>
        ) : (
          <Content>
            {props.articles.length > 0 &&
              props.articles.map((article, index) => (
                <Article key={index}>
                  <SharedActor>
                    <a href="!">
                      <img src={article.actor.image} alt="" />
                      <div>
                        <div style={{ textAlign: "left" }}>Title </div>
                        <div style={{ textAlign: "left" }}>
                          {article.actor.description}{" "}
                        </div>
                        <div style={{ textAlign: "left" }}>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </div>
                      </div>
                    </a>
                    <button>
                      <img src="/images/like-icon.svg" width={8} alt="" />
                    </button>
                  </SharedActor>
                  <Description>{article.description} </Description>
                  <SharedImg>
                    <a href="!">
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer url={article.video} width="100%" />
                      ) : (
                        article.sharedImg && (
                          <img src={article.sharedImg} alt="" width="100%" />
                        )
                      )}
                    </a>
                  </SharedImg>
                  <SocialCounts>
                    <li>
                      <button>
                        <img
                          src="/images/thumbs-up-solid.svg"
                          width={16}
                          alt=""
                        />
                        <img src="" alt="" />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a href="!">{article.comments} </a>
                    </li>
                  </SocialCounts>
                  <SocialActions>
                    <button>
                      <img
                        src="/images/thumbs-up-solid.svg"
                        width={16}
                        alt=""
                      />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comments-solid.svg" width={16} alt="" />
                      <span>Comment</span>
                    </button>
                    <button>
                      <img src="/images/share-solid.svg" width={16} alt="" />
                      <span>Share</span>
                    </button>
                    <button>
                      <img
                        src="/images/paper-plane-solid.svg"
                        width={16}
                        alt=""
                      />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
        )}
        <PostModal onShowModal={showModal} onClickHandler={clickHandler} />
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 0 1px rgba(0 0 0 15%), 0 0 0 rgba(0 0 0 20%);
`;

const SharedBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
    }
    img:hover,
    span:hover {
      opacity: 0.7;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
  }
  img {
    height: 48px;
    width: 48px;
  }
  & > div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;
    margin-left: 8px;
    overflow: hidden;
    span {
      text-align: left;
      &::first-child {
        font-size: 14px;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.1);
      }

      &::nth-child(n + 1) {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  div {
    margin: 0 16px;
    overflow: hidden;
    border-radius: 5px;
    background-color: white;
    box-sizing: border-box;
    img {
      margin: -5px;
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  li {
    margin-right: 12px;
    button {
      display: flex;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 48px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    @media (max-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.article.loading,
    user: state.user.user,
    articles: state.article.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getArticle: () => dispatch(getArticlesApi()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
