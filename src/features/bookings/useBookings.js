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

  //Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  //fetch
  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getAllBookings({ filter, sortBy, page }),
  });

  return { isLoading, bookings, count };
};

export default useBookings;
