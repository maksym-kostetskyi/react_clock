import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type Props = {
  hasClock: boolean;
};

type State = {
  today: Date;
  clockName: string;
  timeTimerId: number;
  nameTimerId: number;
  hasClock: boolean;
};

export class App extends React.Component<Props, State> {
  state: Readonly<State> = {
    today: new Date(),
    clockName: 'Clock-0',
    timeTimerId: 0,
    nameTimerId: 0,
    hasClock: true,
  };

  updateTime = () => {
    const now = new Date();

    if (this.state.hasClock) {
      // eslint-disable-next-line no-console
      console.log(now.toUTCString().slice(-12, -4));
    }

    this.setState({ today: now });
  };

  stopTimer() {
    window.clearInterval(this.state.timeTimerId);
    window.clearInterval(this.state.nameTimerId);
  }

  hideClockOnRightClick() {
    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();

      this.setState({ hasClock: false });
    });
  }

  showClockOnLeftClick() {
    document.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();

      this.setState({ hasClock: true, today: new Date() });
    });
  }

  componentDidMount(): void {
    const timeTimerId = window.setInterval(this.updateTime, 1000);

    const nameTimerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    this.setState({ timeTimerId: timeTimerId, nameTimerId: nameTimerId });
    this.hideClockOnRightClick();
    this.showClockOnLeftClick();
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
  ): void {
    if (prevState.clockName !== this.state.clockName && this.state.hasClock) {
      // eslint-disable-next-line no-console
      console.warn(
        'Renamed from ' + prevState.clockName + ' to ' + this.state.clockName,
      );
    }
  }

  componentWillUnmount(): void {
    this.stopTimer();
  }

  render() {
    const { today, clockName, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
          <div className="Clock">
            <strong className="Clock__name">{clockName}</strong>

            {' time is '}

            <span className="Clock__time">
              {today.toUTCString().slice(-12, -4)}
            </span>
          </div>
        )}
      </div>
    );
  }
}
