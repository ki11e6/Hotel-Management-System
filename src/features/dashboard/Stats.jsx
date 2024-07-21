import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from 'react-icons/hi';
import Stat from './Stat';
import { HiOutlineBanknotes } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
const Stats = ({ bookings, confirmedStays, numDays, numCabins }) => {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title="Check ins"
        value={checkins}
        color="indigo"
        icon={<HiOutlineCalendar />}
      />
      <Stat
        title="Occupancy"
        value={Math.round(occupation * 100) + '%'}
        color="yellow"
        icon={<HiOutlineChartBar />}
      />
    </>
  );
};

export default Stats;
