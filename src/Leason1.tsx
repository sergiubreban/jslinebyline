import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import AdvancedExample from "./001_closure_hoisting/AdvancedExample";
import MidExample from "./001_closure_hoisting/MidExample";
import SimpleExample from "./001_closure_hoisting/SimpleExample";
import TrickyExample from "./001_closure_hoisting/TrickyExample";

const Leason1 = () => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return <div style={{ flex: 1, backgroundColor: '#1A202C', color: '#fff' }}>
		<div style={{ opacity }}>
			<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
				{frame < 600 && <SimpleExample />}
			</Sequence>
			<Sequence from={600} durationInFrames={videoConfig.durationInFrames}>
				{frame < 1800 && < MidExample />}
			</Sequence>
			<Sequence from={1800} durationInFrames={videoConfig.durationInFrames}>
				{frame < 3200 && <AdvancedExample />}
			</Sequence>
			<Sequence from={3200} durationInFrames={videoConfig.durationInFrames}>
				<TrickyExample />
			</Sequence>
		</div>
	</div>

}

export default Leason1;