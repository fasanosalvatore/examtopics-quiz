import Timer from "react-timer-wrapper";

export default function MyTimer({ submitted, timerDate, setTime }) {
  return (
    <>
      <Timer
        active={!submitted}
        duration={null}
        onTimeUpdate={({ time: hereTime }) => setTime(hereTime)}
      />
      <div className="flex text-4xl font-mono max-w-full justify-between text-gray-700">
        <span>{timerDate[0]}h</span>
        <span>{timerDate[1]}m</span>
        <span>{timerDate[2]}s</span>
      </div>
    </>
  );
}
