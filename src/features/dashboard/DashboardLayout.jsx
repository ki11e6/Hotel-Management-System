import styled from 'styled-components';
import useRecentBookings from './useRecentBookings';
import useRecentStays from './useRecentStays';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import useCabins from '../cabins/useCabins';
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading: loadingBooking, bookings } = useRecentBookings();
  const {
    isLoading: loadingStays,
    stays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const { cabins, isLoading: loadingCabins } = useCabins();

  if (loadingBooking || loadingStays || loadingCabins) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={cabins.length}
      />
      <div>Today&apos;s activity</div>
      <div>Chart stay duration</div>
      <div>Chat sales</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
