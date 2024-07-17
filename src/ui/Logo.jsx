import styled from 'styled-components';
import { useDarkMode } from '../context/useDarkMode';

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      {isDarkMode ? (
        <Img src="/beachresort-light.png" alt="Logo" />
      ) : (
        <Img src="/beachresort-dark.png" alt="Logo" />
      )}
    </StyledLogo>
  );
}

export default Logo;
