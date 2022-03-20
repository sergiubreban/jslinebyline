import { Container, Frame } from "./shared"
import styled from 'styled-components';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useFadeOut } from "../hooks";
import { FC } from "react";

const Stack = styled.div`
flex: 1;
display: flex;
flex-direction: column-reverse;
height: 92%;
gap: 5px;
`;

const StackItem = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
font-size: 2rem;
// padding: 10px 10px;
background-color: #fffffff0;
min-width: 200px;
border: 1px solid gray;
border-radius: 25px;
width: 100%;
`;


type ExecutionContextData = {
  name: string;
  from: number;
  to: number;
};

const StackFrame = (props: { contexts: ExecutionContextData[] }) => {
  const { contexts } = props;
  console.log({ contexts })
  return <>
    <Container><h1><i>Execution stack</i></h1></Container>
    <Stack>
      {contexts.map((context: ExecutionContextData, i) => <ExecutionContext
        key={`${context.name}_${i}`}
        context={context} />
      )}
    </Stack>
  </>
}

const ExecutionContext: FC<{ context: ExecutionContextData }> = ({ context }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeOutScaleValue = useFadeOut(context.to, 20)
  const contextVal = spring({
    fps,
    frame: frame - context.from
  })
  return <div style={{
    ...(fadeOutScaleValue === 0 && { display: 'none' }),
    lineHeight: fadeOutScaleValue + 'em',
    transform: `scale(${fadeOutScaleValue})`,
    fontSize: contextVal + 'rem',
    opacity: frame - context.to > 0 ? Math.max((frame + 5 - context.to) / 10, 0) : contextVal
  }}>
    <StackItem>
      <h3 style={{ color: '#1A202C' }}>{context.name}</h3>
    </StackItem>
  </div>
}

export default StackFrame