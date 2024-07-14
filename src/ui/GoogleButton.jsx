import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const googleStyle = css`
  color: white;
  background-color: #4285f4;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #357ae8;
  }

  img {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
`;

const GoogleButtonStyled = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  ${(props) => sizes[props.size]}
  ${googleStyle}
`;

GoogleButtonStyled.defaultProps = {
  size: 'medium',
};
const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;
const GoogleButton = ({ onClick, size }) => (
  <CenteredDiv>
    <GoogleButtonStyled onClick={onClick} size={size}>
      <img src="/google-icon.svg" alt="Google Icon" />
      Sign in with Google
    </GoogleButtonStyled>
  </CenteredDiv>
);

export default GoogleButton;
