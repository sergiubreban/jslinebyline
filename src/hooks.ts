import { interpolate, useCurrentFrame } from 'remotion';

export const useFadeOut = (delay: number, durationInFrame: number): number => {
    const frame = useCurrentFrame();
    const disappearsScaleValue = interpolate(frame - delay, [0, durationInFrame], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    return disappearsScaleValue;
};