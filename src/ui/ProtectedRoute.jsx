import styled from 'styled-components';
import useUser from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  //if user is not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);
  //While loading shows spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //If user is authenticated, show children
  return children;
};

export default ProtectedRoute;
