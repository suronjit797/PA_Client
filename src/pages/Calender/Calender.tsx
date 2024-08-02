import { Calendar } from "antd";

const CalendarD = () => {
  return <Calendar onSelect={(a)=> console.log({a: a.format('DD/MM/YYYY')})} />;
};

export default CalendarD;
