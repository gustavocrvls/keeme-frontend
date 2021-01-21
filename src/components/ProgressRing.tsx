import React from 'react';
import styled from 'styled-components';

interface IProps {
  radius: number,
  stroke: number,
  progress: number
}

interface IState {
  normalizedRadius: number,
  circumference: number,
}

const ProgressRingContainer = styled.div`
  circle {
    transition: stroke-dashoffset 0.9s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke-linecap: round;
  }
`;

export default class ProgressRing extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const { radius, stroke } = this.props;

    this.state = {
      normalizedRadius: radius - stroke * 2,
      circumference: 0,
    }
  }

  componentDidMount() {
    this.setState({
      circumference: this.state.normalizedRadius * 2 * Math.PI
    });
  }

  render() {
    const { radius, stroke, progress } = this.props;
    const { circumference, normalizedRadius } = this.state;
    const strokeDashoffset = circumference - progress / 100 * circumference;
    const strokeDashoffset2 = circumference - 1 * circumference;

    console.log(circumference, normalizedRadius);
    return (
      <ProgressRingContainer>
        <svg
          height={radius * 2}
          width={radius * 2}
        >
          <circle
            stroke="#cacaca"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset: `${strokeDashoffset2}` }}
            stroke-width={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#31878C"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            stroke-width={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <text
            fill="#000000"
            font-size="18"
            font-family="Verdana"
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
          >
            {progress}
          </text>
        </svg>
      </ProgressRingContainer>
    );
  }

}