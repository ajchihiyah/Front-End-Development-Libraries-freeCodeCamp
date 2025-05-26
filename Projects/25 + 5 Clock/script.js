function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Control({ id, label, time, setTime }) {
  function reduceTime() {
    if (time > 1) setTime(--time);
  }

  function increaseTime() {
    if (time < 60) setTime(++time);
  }

  return (
    <div className="control">
      <h2 className="control-label" id={`${id}-label`}>
        {label}
      </h2>
      <div className="button-box">
        <button
          className="control-button"
          id={`${id}-decrement`}
          onClick={reduceTime}
        >
          <i className="fas fa-minus"></i>
        </button>
        <p className="control-length" id={`${id}-length`}>
          {time}
        </p>
        <button
          className="control-button"
          id={`${id}-increment`}
          onClick={increaseTime}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
}

function Timer({
  timer,
  setTimer,
  isRunning,
  setIsRunning,
  timerLabel,
  setTimerLabel,
  changeTimer,
  resetAll,
  beep
}) {
  function displayTimer(timer) {
    let minutes = parseInt(timer / 60, 10);
    let seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`;
  }

  useInterval(
    () => {
      if (timer > 0) {
        setTimer(--timer);
      } else {
        setIsRunning(false);
        playBeep();
        setTimeout(changeTimer, 4000);
      }
    },
    isRunning ? 1000 : null
  );

  function playBeep() {
    var playPromise = beep.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setTimeout(() => beep.pause(), 2800);
          setTimeout(() => beep.load(), 3000);
        })
        .catch((error) => console.log(error));
    }
  }

  function controlTimer() {
    setIsRunning(!isRunning);
  }

  return (
    <div className="timer">
      <h2 id="timer-label">{timerLabel}</h2>
      <p id="time-left">{displayTimer(timer)}</p>
      <div className="timer-controls">
        <button id="start_stop" onClick={controlTimer}>
          <i className="fas fa-play"></i>
          <i className="fas fa-pause"></i>
        </button>
        <button id="reset" onClick={resetAll}>
          <i className="fas fa-undo-alt"></i>
        </button>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
}

function App() {
  const [breakTime, setBreakTime] = React.useState(5);
  const [sessionTime, setSessionTime] = React.useState(25);
  const [timer, setTimer] = React.useState(sessionTime * 60);

  const [isRunning, setIsRunning] = React.useState(false);
  const [timerLabel, setTimerLabel] = React.useState("Session");

  React.useEffect(() => setTimer(sessionTime * 60), [sessionTime]);

  const beep = document.querySelector("#beep");

  function resetAll() {
    setIsRunning(false);
    setBreakTime(5);
    setSessionTime(25);
    setTimer(sessionTime * 60);
    setTimerLabel("Session");
    beep.pause();
    beep.load();
  }

  function changeTimer() {
    if (timerLabel === "Session") {
      setTimerLabel("Break");
      setTimer(breakTime * 60);
    } else {
      setTimerLabel("Session");
      setTimer(sessionTime * 60);
    }

    setIsRunning(true);
  }

  return (
    <div class="container">
      <h1 id="title">Pomodoro's Clock</h1>
      <div className="controlers">
        <Control
          id="break"
          label="Break Length"
          time={breakTime}
          setTime={setBreakTime}
        />
        <Control
          id="session"
          label="Session Length"
          time={sessionTime}
          setTime={setSessionTime}
        />
      </div>

      <Timer
        timer={timer}
        setTimer={setTimer}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        timerLabel={timerLabel}
        setTimerLabel={setTimerLabel}
        changeTimer={changeTimer}
        resetAll={resetAll}
        beep={beep}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
