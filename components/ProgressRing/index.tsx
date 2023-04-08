import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { ProgressRingProps } from './dtos';

export function ProgressRing({
  radius,
  stroke,
  obtained,
  progress,
  total,
}: ProgressRingProps): JSX.Element {
  const [normalizedRadius, setNormalizedRadius] = useState(radius - stroke * 2);
  const [circumference, setCircumference] = useState(0);

  useEffect(() => {
    setCircumference(normalizedRadius * 2 * Math.PI);
  }, []);

  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const strokeDashoffset2 = circumference - 1 * circumference;

  return (
    <Box>
      <svg height={radius * 2} width={radius * 2}>
        <Box
          as="circle"
          strokeLinecap="round"
          transition="stroke-dashoffset 0.9s"
          transform="rotate(-90deg)"
          transformOrigin="50% 50%"
          stroke="#cacaca"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: `${strokeDashoffset2}` }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <Box
          as="circle"
          strokeLinecap="round"
          transition="stroke-dashoffset 0.9s"
          transform="rotate(-90deg)"
          transformOrigin="50% 50%"
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
    </Box>
  );
}
