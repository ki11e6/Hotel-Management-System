import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
// styling
import GolbalStyles from './styles/GlobalStyles';
//solves automatic filtering of unknown props from Styled-components
import { StyleSheetManager } from 'styled-components';
import isValidProp from '@emotion/is-prop-valid';
// components
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Booking from './pages/Booking';
import Checking from './pages/Checking';
import ProtectedRoute from './ui/ProtectedRoute';
//react query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 1000, //after 60sec it will be re fetched.
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <StyleSheetManager
        shouldForwardProp={(propName) => isValidProp(propName)}
      >
        <GolbalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checking />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-center"
          theme="colored"
          newestOnTop="true"
          pauseOnHover
          closeOnClick
        />
      </StyleSheetManager>
    </QueryClientProvider>
  );
};

export default App;
