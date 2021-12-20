import styled from "styled-components";

const PostModal = (props) => {
  return (
    <Container>
      <Content>
        <Header>
          <h2>Create a post</h2>
          <button>
            <img src="/images/close-icon.svg" alt="" width={20} />
          </button>
        </Header>
        <SharedContent>
          <UserInfo>
            <img src="/images/user.svg" alt="" />
            <span>Name</span>
          </UserInfo>
        </SharedContent>
        <ShareCreation>
          <AttachAssets>
            <AssetButton>
              <img src="/images/share-image.svg" alt="" width={16} />
            </AssetButton>
            <AssetButton>
              <img src="/images/youtube-brands.svg" alt="" width={22} />
            </AssetButton>
          </AttachAssets>
          <ShareComment>
            <AssetButton>
              <img src="/images/comment-dots-regular.svg" alt="" width={22} />
              Anyone
            </AssetButton>
          </ShareComment>
          <PostButton>Post</PostButton>
        </ShareCreation>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  color: black;
  background-color: rgba(0, 0, 0, 0.7);
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
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s ease-in-out;
  &:hover {
    background: #004182;
  }
`;

export default PostModal;
