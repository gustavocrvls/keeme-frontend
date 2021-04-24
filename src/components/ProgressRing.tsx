import React from 'react';
import styled from 'styled-components';

interface IProps {
  radius: number;
  stroke: number;
  progress: number;
  obtained: number;
  total: number;
}

interface IState {
  normalizedRadius: number;
  circumference: number;
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
    };
  }

  componentDidMount(): void {
    const { normalizedRadius } = this.state;

    this.setState({
      circumference: normalizedRadius * 2 * Math.PI,
    });
  }

  render(): JSX.Element {
    const { radius, stroke, progress, total, obtained } = this.props;
    const { circumference, normalizedRadius } = this.state;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    const strokeDashoffset2 = circumference - 1 * circumference;

    return (
      <ProgressRingContainer>
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#cacaca"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset: `${strokeDashoffset2}` }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#31878C"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <text
            fill="#000000"
            fontSize="24"
            fontFamily="Noto Sans, system-ui, sans-serif"
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            <tspan fontSize="30">{obtained}</tspan>
            <tspan fontSize="30">/</tspan>
            <tspan fontSize="14" dominantBaseline="hanging">
              {total}
            </tspan>
          </text>
        </svg>
      </ProgressRingContainer>
    );
  }
}
