import { useQuery } from '@tanstack/react-query';
import { getAllBookings } from '../../services/apiBookings';
const useBookings = () => {
  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings'],
    queryFn: getAllBookings,
  });

  return { isLoading, bookings };
};

export default useBookings;
