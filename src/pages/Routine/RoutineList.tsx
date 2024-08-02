import { Timeline } from "antd";
import moment from "moment";
import { SmileOutlined } from "@ant-design/icons";

const convertedTimes = (time) => {
  const hour = Math.floor(time);
  const minute = (time - hour) * 60;
  return moment({ hour, minute }).format("h:mm A");
};

const times = [
  { time: "9.0 AM", content: "Woke up 9:00 AM", isPending: false },
  { time: "10.0 AM", content: "Breakfast", isPending: true },
  { time: "12.0 AM", content: "Work", isPending: false },
  { time: "1.0 PM", content: "Meeting", isPending: true },
  { time: "3.0 PM", content: "Lunch", isPending: false },
  { time: "4.0 PM", content: "Gym", isPending: true },
  { time: "6.0 PM", content: "Dinner", isPending: false },
  { time: "7.0 PM", content: "Study", isPending: true },
  { time: "10.0 PM", content: "Sleep", isPending: false },
];
// const convertedTimes = times.map(item => {
//     const hour = Math.floor(item.time);
//     const minute = (item.time - hour) * 60;
//     const formattedTime = moment({ hour, minute }).format('h:mm A');
//     return { ...item, formattedTime };
//   });

console.log({ convertedTimes: convertedTimes(22) });

const RoutineList = () => {
  const currentTime = moment().format("H.mm");

  return (
    <div className="routineTimeLine my-4 bg-card p-4 rounded-md">
      <Timeline mode="left">
        {times.map((item, index) => {
          const nextTime = times[index + 1]?.time || "24.00";
          const isCurrentTime = moment(currentTime, "H.mm A").isBetween(
            moment(item.time, "H.mm A"),
            moment(nextTime, "H.mm A"),
            null,
            "[)"
          );
          console.log(moment(item.time, "H.mm A").format("HH:MM"), moment(nextTime, "H.mm A").format("HH:MM"));
          const icon = isCurrentTime && <SmileOutlined />;
          //   : item.isPending ? (
          //     <CloseCircleOutlined className="text-red-600" />
          //   ) : (
          //     <CheckCircleOutlined className="text-green-600" />
          //   );

          //   const color = isCurrentTime ? "blue" : item.isPending ? "red" : "green";
          const color = isCurrentTime ? "blue" : "red";

          return (
            <Timeline.Item
              key={item.time}
              label={moment(item.time, "H.mm A").format("h:mm A")}
              color={color}
              dot={icon}
            >
              {item.content}
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
};

export default RoutineList;
