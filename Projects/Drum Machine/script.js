const bankOne = [
  {
    key: "Q",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    key: "W",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    key: "E",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    key: "A",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    key: "S",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    key: "D",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    key: "Z",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    key: "X",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    key: "C",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

class DrumMachine extends React.Component {
  state = {
    display: "Press a key"
  };
  constructor(props) {
    super(props);
  }
  handleDisplay = (display) => this.setState({ display });
  render() {
    const { display } = this.state;
    return (
      <div id="drum-machine">
        <div id="display" className="display">
          <h1 className="nin">
            <span className="text-body">Drum Machine</span>
          </h1>
          <h2 className="key text-danger">{display}</h2>
          <div id="drum-pad">
            {bankOne.map((sound, idx) => (
              <Drum
                text={sound.key}
                key={idx}
                audio={sound.url}
                handleDisplay={this.handleDisplay}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
    this.audio = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.playMusic = this.playMusic.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  playMusic = () => {
    this.audio.current.play();
    this.props.handleDisplay(this.props.text);
    this.setState({ isPlaying: !this.state.isPlaying });
    setTimeout(() => {
      this.setState({ isPlaying: false });
    }, 100);
  };
  handleClick = () => {
    const keySound = document.getElementById(this.props.key);
    this.audio.currentTime = 0;
    this.audio.play();
  };
  handleKeyPress(e) {
    if (e.key.toUpperCase() === this.props.text) {
      this.audio.current.play();
      this.props.handleDisplay(this.props.text);
    }
  }
  render() {
    const { text, audio } = this.props;
    const isPlaying = this.state.isPlaying;
    const style = !this.state.isPlaying ? { background: "SandyBrown" } : null;
    return (
      <div id="bt" style={style} className="drum-pad" onClick={this.playMusic}>
        {text}
        <audio src={audio} ref={this.audio} id={text} className="clip" />
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
