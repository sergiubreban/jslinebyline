import 'hack-font/build/web/hack.css';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import styled from 'styled-components';
import './prism.css';
import { Container, Frame } from './shared';

const Pre = styled.pre<{
  width: number;
}>`
	text-align: left;
	margin: 1em 0;
	font-size: 40px;
	width: ${(props: any) => props.width}px;
`;

const Line = styled.div`
	display: table-row;
`;

const LineContent = styled.span`
	display: table-cell;
`;

const getProgressOfLine = ({
  line,
  frame,
  fps,
  timing,
}: {
  line: number;
  frame: number;
  fps: number;
  timing: Timing[];
}) => {
  const segment = timing.find((t) => t.line === line);
  if (!segment) {
    return 1;
  }
  return spring({
    fps,
    frame: frame - segment.from,
    config: {
      stiffness: 200,
      damping: 100,
      mass: 0.5,
      overshootClamping: true,
    },
  });
};

type Timing = {
  line: number;
  from: number;
  to?: number;
};

type HighlightLine = {
  line: number;
  from: number;
  to: number;
}

export const CodeFrame: React.FC<{
  code: string;
  timing: Timing[];
  highlights?: HighlightLine[];
  title: string;
  width: number | string;
}> = ({ code, timing, title, width, highlights }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getHighlitedData = (i: number) => highlights?.find((highlight) => highlight.line === i)
  return (
    <>
      <>
        <Container><h1><i>{title}</i></h1></Container>
        <div>
          <Highlight
            {...defaultProps}
            theme={undefined}
            code={code}
            language="tsx"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <Pre width={width} className={className} style={{ ...style, backgroundColor: '#fffffff0', borderRadius: '25px' }}>
                {tokens.map((line, i) => {
                  const highlightData = getHighlitedData(i);
                  return (
                    <Line
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      {...getLineProps({ line, key: i })}
                      style={{
                        opacity: getProgressOfLine({
                          line: i,
                          frame,
                          fps,
                          timing,
                        }),
                        lineHeight: interpolate(
                          getProgressOfLine({
                            line: i,
                            frame,
                            fps,
                            timing,
                          }),
                          [0, 1],
                          [0, 1.53]
                        ),
                        fontSize:
                          getProgressOfLine({
                            line: i,
                            frame,
                            fps,
                            timing,
                          }) + 'em',
                      }}
                    >
                      <LineContent>
                        {line.map((token, key) => {
                          const props = getTokenProps({ token, key });
                          return (
                            <span
                              // eslint-disable-next-line react/no-array-index-key
                              key={key}
                              {...props}
                              {...(
                                highlightData &&
                                frame < highlightData.to &&
                                frame > highlightData.from &&
                                { className: props.className + ' line__highlighted' })}
                              style={{
                                fontSize:
                                  props.children.trim() === '' ? 40 : '1em',
                              }}
                            />
                          );
                        })}
                      </LineContent>
                    </Line>
                  );
                })}
              </Pre>
            )}
          </Highlight>
        </div>
      </>
    </>
  );
};
