import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { CodeFrame } from './Components/CodeFrame';
import { Logo } from './HelloWorld/Logo';
import { Subtitle } from './HelloWorld/Subtitle';
import { Title } from './HelloWorld/Title';

export const HelloWorld: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({ titleText, titleColor }) => {
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
	const transitionStart = 25;

	return (
		<div style={{ flex: 1, backgroundColor: 'white' }}>
			<div style={{ opacity }}>
				<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
					<Logo transitionStart={transitionStart} />
				</Sequence>
				<Sequence from={transitionStart + 10}>
					<Title titleText={titleText} titleColor={titleColor} />
				</Sequence>
				<Sequence from={transitionStart + 50}>
					<Subtitle />
				</Sequence>
				<Sequence from={transitionStart + 70}>
					<div style={{ transform: 'scale(.5)' }}>
						<CodeFrame timing={[
							{
								line: 6,
								from: 50,
							},
						]}
							title='Video.tsx'
							code={`
export const RemotionVideo = () => {
	return (
		<Composition
			id="CodeFrame"
			component={CodeFrame}
			durationInFrames={3 * 30}
			fps={30}
			width={1920}
			height={1080}
		/>
	);
}

					`.trim()} width={1200} />
					</div>
					{/* <Composition
						id="CodeFrame"
						component={CodeFrame}
						durationInFrames={100}
						fps={30}
						width={1920}
						height={1080}
						defaultProps={{
							width: 1200,
							code: `
export const RemotionVideo = () => {
	return (
		<Composition
			id="CodeFrame"
			component={CodeFrame}
			durationInFrames={3 * 30}
			fps={30}
			width={1920}
			height={1080}
		/>
	);
}

					`.trim(),
							timing: [
								{
									line: 6,
									from: 0,
								},
							],
							title: 'Video.tsx',
						}}
					/> */}
				</Sequence>
			</div>
		</div>
	);
};
