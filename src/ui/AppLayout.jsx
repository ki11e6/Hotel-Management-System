import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <ToastContainer
        position="top-center"
        theme="colored"
        newestOnTop="true"
        pauseOnHover
        closeOnClick
      />
    </StyledAppLayout>
  );
};

export default AppLayout;
