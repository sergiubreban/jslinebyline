import { FC } from "react";
import { useVideoConfig } from "remotion";
import { CodeFrame } from "../Components/CodeFrame";
import MemoryFrame from "../Components/MemoryFrame";
import OutputFrame from "../Components/OutputFrame";
import StackFrame from "../Components/StackFrame";
import { generateFromTo } from "../utils";

const unit = 100;
const code = `
var winner = 'you';
function logWinner() {
  console.log(winner)
}
logWinner()
`.trim();

const MidExample: FC = () => {
  const videoConfig = useVideoConfig();

  const highlightDelay = 150;
  return <div
    style={{
      width: videoConfig.width,
      height: videoConfig.height,
      display: 'flex',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', height: videoConfig.height / 1.4, width: videoConfig.width / 2.5 }}>
        <CodeFrame timing={[[1, 3], 2, 4].map(generateFromTo.bind(null, { unit: 50, skip: 0 })).flat()}
          highlights={[0, [1, 3], 4, -1, 2].map(generateFromTo.bind(null, { unit, skip: highlightDelay + 200 })).flat()}
          title='index.tsx'
          code={code} width={'750'} />
      </div>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', flex: '1', width: videoConfig.width / 2.5 }}>
        <OutputFrame logs={[{
          from: highlightDelay + 200 + unit * 5.5,
          name: 'you'
        }]} />
      </div>
    </div>
    <div style={{ display: 'flex' }}>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', width: videoConfig.width / 2.5 }}>
        <MemoryFrame limits={[
          {
            name: 'main -f-',
            from: highlightDelay + unit + unit / 2,
            to: highlightDelay + unit * 10,
            data: [{
              item: 'winner',
              value: 'undefined',
              changeValueAtFrame: { frame: highlightDelay + unit * 3, value: 'you' },
              from: highlightDelay + unit
            }, {
              item: 'logWinner -f-',
              from: highlightDelay + unit * 2
            },
            ]
          },
          {
            name: 'logWinner -f- ',
            from: highlightDelay + 200 + unit * 3.4,
            to: highlightDelay + unit * 9,
            data: [{
              item: 'closure',
              from: highlightDelay + unit * 4
            }
            ]
          }
        ]} />
      </div>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', width: videoConfig.width / 5 }}>
        <StackFrame contexts={[
          { name: "main", from: highlightDelay + unit, to: highlightDelay + unit * 10 },
          { name: "logWinner", from: highlightDelay + 200 + unit * 3, to: highlightDelay + unit * 9 },
        ]} />
      </div>
    </div>
  </div>
}

export default MidExample;