import { useQuery } from '@tanstack/react-query';
import { getAllBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
const useBookings = () => {
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  //SortBy
  const sortByRow = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRow.split('-');
  const sortBy = { field, direction };

  //fetch
  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getAllBookings({ filter, sortBy }),
  });

  return { isLoading, bookings };
};

export default useBookings;
