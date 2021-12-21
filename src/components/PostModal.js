import { useState, Fragment } from "react";
import styled, { keyframes } from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { serverTimestamp } from "firebase/firestore";
import { postArticleAPI } from "../actions";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState();
  const [shareImage, setShareImage] = useState();
  const [videoLink, setVideoLink] = useState();
  const [assetArea, setAssetArea] = useState();

  const changeHandler = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert("Please select an image");
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const postArticle = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImage,
      video: videoLink,
      user: props.user,
      description: editorText,
      timestamp: serverTimestamp(),
    };

    props.postArticle(payload);
    props.onClickHandler(e);
  };

  const resetHandler = (e) => {
    e.preventDefault();
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    props.onClickHandler(e);
  };

  return (
    <Fragment>
      {props.onShowModal === "open" ? (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => resetHandler(e)}>
                <img src="/images/close-icon.svg" alt="" width={20} />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What's up man???"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={changeHandler}
                    />
                    <p>
                      <label htmlFor="file"> Select an image to share </label>
                    </p>

                    {shareImage && (
                      <img src={URL.createObjectURL(shareImage)} alt="" />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <Fragment>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"%100"} url={videoLink} />
                      )}
                    </Fragment>
                  )
                )}
              </Editor>
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/share-image.svg" alt="" width={16} />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/youtube-brands.svg" alt="" width={22} />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img
                    src="/images/comment-dots-regular.svg"
                    alt=""
                    width={22}
                  />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(e) => postArticle(e)}
              >
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      ) : null}
    </Fragment>
  );
};

const rotate = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  color: black;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${rotate} 0.5s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  max-height: 90%;
  background-color: white;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    svg {
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    margin-right: 5px;
  }
`;

const PostButton = styled.div`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: #0a66c2;
  color: ${(props) => (props.disabled ? "black" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease-in-out;
  background-color: ${(props) => (props.disabled ? "#e6e6e6" : "#0a66c2")};
  &:hover {
    background: ${(props) => (props.disabled ? "gray" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textArea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
