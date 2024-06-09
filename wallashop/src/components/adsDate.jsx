import { formatDistanceToNow } from "date-fns";
import es from "date-fns/locale/es";
import PropTypes from "prop-types";

const TimeAgo = ({ date }) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj)) {
    return null; // or return a default value
  }
  const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
  return <span>{timeAgo}</span>;
};

TimeAgo.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default TimeAgo;
