import { useState } from 'react';
import { Composition } from 'remotion';
import { CodeFrame } from './Components/CodeFrame';
import MemoryFrame from './Components/MemoryFrame';
import OutputFrame from './Components/OutputFrame';
import StackFrame from './Components/StackFrame';
import { HelloWorld } from './HelloWorld';
import { Logo } from './HelloWorld/Logo';
import { Subtitle } from './HelloWorld/Subtitle';
import { Title } from './HelloWorld/Title';
import Leason1 from './Leason1';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Leason1"
				component={Leason1}
				durationInFrames={4000}
				fps={30}
				width={1920}
				height={1080}
			/>
				<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={350}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Logo"
				component={Logo}
				durationInFrames={200}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Title"
				component={Title}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Subtitle"
				component={Subtitle}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Output"
				component={OutputFrame}
				durationInFrames={200}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					logs: [
						{ name: 2, from: 10 },
						{ name: 'ana are mere', from: 100 }
					]
				}}
			/>
			<Composition
				id="MemoryFrame"
				component={MemoryFrame}
				durationInFrames={350}
				fps={30}
				defaultProps={{
					limits: [
						{ name: "test", data: [{ item: 'tesasdasdsat23 = undefined', from: 0 }, { item: 'tesasdasdsat23 = undefined', from: 50 }], from: 0, to: 20 },
						{ name: "test 2", data: [{ item: 'test2 = <uninitialize>', from: 0 }], from: 33, to: 120 },
						// { name: "test 3", from: 63, to: 160 },
						// { name: "test 4", from: 165, to: 300 },
						// { name: "test 5", from: 210, to: 340 },
					]
				}}
				width={1920}
				height={1080}
			/>
			<Composition
				id="StackFrame"
				component={StackFrame}
				durationInFrames={350}
				fps={30}
				defaultProps={{
					contexts: [
						{ name: "test", from: 0, to: 20 },
						{ name: "test 2", from: 60, to: 330 },
						{ name: "test 3", from: 120, to: 160 },
						{ name: "test 4", from: 185, to: 300 },
						// { name: "test 5", from: 20, to: 320 },
					]
				}}
				width={1920}
				height={1080}
			/>
			<Composition
				id="CodeFrame"
				component={CodeFrame}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					width: 1200,
					highlights: [{ line: 4, from: 50, to: 100 }],
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
							from: 50,
						},
					],
					title: 'Video.tsx',
				}}
			/>
		</>
	);
};
