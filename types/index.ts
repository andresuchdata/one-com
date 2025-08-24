export type Frame = [number, number] | [number] | [];
export type FrameSeries = Frame[];
export type TestData = {
    frames: FrameSeries;
    score: number;
}