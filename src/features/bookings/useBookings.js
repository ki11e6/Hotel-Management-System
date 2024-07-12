import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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
    retry: false,
  });

  //Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, count };
};

export default useBookings;
