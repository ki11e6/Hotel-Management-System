import styled from 'styled-components';
import useRecentBookings from './useRecentBookings';
import useRecentStays from './useRecentStays';
import Spinner from '../../ui/Spinner';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading: loadingBooking, bookings } = useRecentBookings();
  const { isLoading: loadingStays, stays, confirmedStays } = useRecentStays();
  if (loadingBooking || loadingStays) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today&apos;s activity</div>
      <div>Chart stay duration</div>
      <div>Chat sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
