import { FC } from "react";
import { CodeFrame } from "./CodeFrame";

const OutputFrame: FC<{ logs: { name: string | number, from: number }[] }> = ({ logs }) => {
  return <div style={{ width: '100%' }}>
    <CodeFrame timing={logs.map(({ from }, line) => ({ line, from }))}
      title={'Output'}
      code={logs.map(({ name }) => `> ${name}`).join('\n')} width={'750'} />
  </div>
}


export default OutputFrame;