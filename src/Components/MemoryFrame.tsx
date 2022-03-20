import { FC } from "react";
import { CodeFrame } from "./CodeFrame";
import { Container, Frame } from "./shared"
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useFadeOut } from "../hooks";

interface Limit {
  name: string;
  data: {
    item: string;
    value?: string;
    changeValueAtFrame?: { value: string, frame: number };
    from: number
  }[];
  from: number;
  to: number;
}

const MemoryFrame = (props: { limits: Limit[] }) => {
  const { limits } = props;

  return <>
    <>
      <Container> <h1><i>Memory</i></h1></Container>
      {limits.map((limit) => <LocalMemory key={limit.name} limit={limit} />)}
    </>
  </>
}


const getProgressOfLine = ({
  frame,
  fps,
  from,
}: {
  frame: number;
  fps: number;
  from: number;
}) => {
  return spring({
    fps,
    frame: frame - from,
    config: {
      stiffness: 200,
      damping: 100,
      mass: 0.5,
      overshootClamping: true,
    },
  });
};

const LocalMemory: FC<{ limit: Limit }> = ({ limit }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const { name, data, from, to } = limit;
  const fadeOutScaleValue = useFadeOut(to, 20)

  const getValue = (value: string | undefined, frame: number, changeValueAtFrame?: { frame: number, value: string }) => {
    console.log({ frame }, changeValueAtFrame?.frame)
    return value ? ` = ${changeValueAtFrame && changeValueAtFrame.frame <= frame ? changeValueAtFrame.value : value}` : ''
  }
  return <div style={{
    ...(fadeOutScaleValue === 0 && { display: 'none' }),
    lineHeight: fadeOutScaleValue + 'em',
    transform: `scale(${fadeOutScaleValue})`,
    opacity: getProgressOfLine({
      frame,
      fps,
      from,
    }),
    fontSize:
      getProgressOfLine({
        frame,
        fps,
        from,
      }) + 'em',
  }}>
    <CodeFrame timing={data.map(({ from }, line) => ({ line, from }))}
      title={name}
      code={data
        .map(({ item, value, changeValueAtFrame }) => `${item}${getValue(value, frame, changeValueAtFrame)}`
        ).join('\n')} width={750} />
  </div>
}

export default MemoryFrame