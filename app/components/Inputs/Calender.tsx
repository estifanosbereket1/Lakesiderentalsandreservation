"use client";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

import {
  DateRange,
  DateRangePicker,
  Range,
  RangeKeyDict,
} from "react-date-range";

interface CalenderProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calender: React.FC<CalenderProps> = ({
  disabledDates,
  onChange,
  value,
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};
export default Calender;
