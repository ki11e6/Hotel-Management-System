import { PAGE_SIZE } from '../utils/constants';
import { getToday } from '../utils/helpers';
import supabase from './supabase';

//Get all booking from database
export async function getAllBookings({ filter, sortBy, page }) {
  try {
    let query = supabase
      .from('bookings')
      .select('*, cabins(name), guests(fullName,email)', { count: 'exact' });

    //Filter
    if (filter) {
      query = query.eq(filter.field, filter.value);
    }

    //SortBy
    if (sortBy) {
      query = query.order(sortBy.field, {
        ascending: sortBy.direction === 'asc',
      });
    }
    //Pagination
    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;
    if (error) throw error;
    return { data, count };
  } catch (error) {
    console.error('Error getting all bookings', error);
    throw new Error(error.massage || 'Unable to get all bookings');
  }
}

//Get single booking with id
export async function getBooking(id) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, cabins(*), guests(*)')
      .eq('id', id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error getting booking with id', error);
    throw new Error(error.massage || `Unable to get ${id} booking`);
  }
}

//Update single booking with id
export async function updateBooking(id, obj) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update(obj)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`Error when updating booking with id`, error);
    throw new Error(error.massage || `Unable to update booking with id: ${id}`);
  }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
