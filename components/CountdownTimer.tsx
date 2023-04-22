import Countdown, { CountdownRenderProps } from "react-countdown";

interface Props {
  isLoadingExpiration: boolean;
  expiration: number;
}

interface Renderer {
  hours: number;
  minutes: number;
  seconds: number;
  completed?: number;
}

interface Timers extends Renderer {
  animated?: boolean;
}

interface Box {
  time: number;
  title: string;
  animated: boolean;
}

const Box = ({ time, title, animated }: Box) => (
  <div className="flex-1">
    <div className={`countdown ${animated && "animate-pulse"}`}>
      {time || 0}
    </div>
    <div className="countdown-label">{title}</div>
  </div>
);

const Timers = ({ hours, minutes, seconds, animated = false }: Timers) => (
  <div className="flex space-x-6">
    <Box time={hours} title="hours" animated={animated} />
    <Box time={minutes} title="minutes" animated={animated} />
    <Box time={seconds} title="seconds" animated={animated} />
  </div>
);

const CountdownTimer = ({ expiration, isLoadingExpiration }: Props) => {
  const renderer = ({ hours, minutes, seconds, completed }: Renderer) => {
    if (completed) {
      return (
        <div>
          <h2 className="text-white text-lg text-center animate-bounce">
            Tickets Sales have now CLOSED for this draw
          </h2>
          <Timers hours={hours} minutes={minutes} seconds={seconds} animated />
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="text-white text-sm mb-2 italic">Time Remaining</h3>
          <Timers hours={hours} minutes={minutes} seconds={seconds} />
        </div>
      );
    }
  };
  return (
    <div className="">
      <Countdown date={new Date(expiration * 1000)} renderer={renderer} />
    </div>
  );
};

export default CountdownTimer;
