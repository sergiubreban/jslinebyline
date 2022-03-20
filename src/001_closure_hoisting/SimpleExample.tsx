import { FC } from "react";
import { useVideoConfig } from "remotion";
import { CodeFrame } from "../Components/CodeFrame";
import MemoryFrame from "../Components/MemoryFrame";
import OutputFrame from "../Components/OutputFrame";
import StackFrame from "../Components/StackFrame";

const unit = 100;
const code = `
var winner = 'you';

console.log(winner);
`.trim();

const SimpleExample: FC = () => {
  const videoConfig = useVideoConfig();

  return <div
    style={{
      width: videoConfig.width,
      height: videoConfig.height,
      display: 'flex',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', height: videoConfig.height / 1.4, width: videoConfig.width / 2.5 }}>
        <CodeFrame timing={[
          {
            line: 0,
            from: 20,
          },
          {
            line: 1,
            from: 50,
          },
          {
            line: 2,
            from: 60,
          }
        ]}
          highlights={[{
            from: 3 * unit,
            to: 4 * unit,
            line: 0
          },
          {
            from: 4 * unit,
            to: 5 * unit,
            line: 2
          }
          ]}
          title='index.tsx'
          code={code} width={'750'} />
      </div>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', flex: '1', width: videoConfig.width / 2.5 }}>
        <OutputFrame logs={[{
          from: 4 * unit,
          name: 'you'
        }]} />
      </div>
    </div>
    <div style={{ display: 'flex' }}>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', width: videoConfig.width / 2.5 }}>
        <MemoryFrame limits={[
          {
            name: 'main -f-',
            from: 2 * unit,
            to: 5.4 * unit,
            data: [{
              item: 'winner',
              value: 'undefined',
              changeValueAtFrame: { value: 'you', frame: 3 * unit },
              from: 2 * unit
            },
            ]
          }
        ]} />
      </div>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', width: videoConfig.width / 5 }}>
        <StackFrame contexts={[{ name: "main", from: unit, to: 5.4 * unit }]} />
      </div>
    </div>
  </div>
}

export default SimpleExample;