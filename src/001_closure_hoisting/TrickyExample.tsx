import { FC } from "react";
import { Img, useCurrentFrame, useVideoConfig } from "remotion";
import { CodeFrame } from "../Components/CodeFrame";
import MemoryFrame from "../Components/MemoryFrame";
import OutputFrame from "../Components/OutputFrame";
import StackFrame from "../Components/StackFrame";
import { generateFromTo } from "../utils";
import LetError from "./leterror.png"
const unit = 100;
const code = `
let winner = 'you';
function logWinner() {
  console.log(winner)
  let winner = 'me';
}
logWinner()
`.trim();

const TrickyExample: FC = () => {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const highlightDelay = 50;
  return <div
    style={{
      width: videoConfig.width,
      height: videoConfig.height,
      display: 'flex',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', height: videoConfig.height / 1.4, width: videoConfig.width / 2.5 }}>
        <CodeFrame timing={[3].map(generateFromTo.bind(null, { unit: 50, skip: 0 })).flat()}
          highlights={[0, [1, 4], 5, -1, 2].map(generateFromTo.bind(null, { unit, skip: highlightDelay + 200 })).flat()}
          title='index.tsx'
          code={code} width={'750'} />
      </div>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', flex: '1', width: videoConfig.width / 2.5 }}>
        <OutputFrame logs={[]} />
        {frame >= highlightDelay + unit * 7 && <Img src={LetError} style={{ width: '100%', }} />}
      </div>
    </div>
    <div style={{ display: 'flex' }}>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', width: videoConfig.width / 2.5 }}>
        <MemoryFrame limits={[
          {
            name: 'main -f-',
            from: highlightDelay + unit + unit / 2,
            to: highlightDelay + unit * 12,
            data: [{
              item: 'winner',
              value: '<uninitialized>',
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
            to: highlightDelay + unit * 10,
            data: [{
              item: 'winner',
              value: '<uninitialized>',
              from: highlightDelay + unit * 6
            },
            {
              item: 'closure',
              from: highlightDelay + unit * 4
            },
            ]
          }
        ]} />
      </div>
      <div style={{ border: '2px solid rgba(0, 0, 0, 0.14)', width: videoConfig.width / 5 }}>
        <StackFrame contexts={[
          { name: "main", from: highlightDelay + unit, to: highlightDelay + unit * 12 },
          { name: "logWinner", from: highlightDelay + 200 + unit * 3, to: highlightDelay + unit * 10 },
        ]} />
      </div>
    </div>
  </div>
}

export default TrickyExample;