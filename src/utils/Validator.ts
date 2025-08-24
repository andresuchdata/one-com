import type { Frame, FrameSeries } from '../core/types';

export class Validator {
    /**
     * Parse and validate frame data string and return frame series
     */
    static parseFrameData(frameString: string): FrameSeries {
        try {
            const parsed = JSON.parse(frameString);

            if (!Array.isArray(parsed)) {
                throw new Error(`Invalid frames (must be array): ${frameString}`);
            }

            if (parsed.length === 0) {
                return [];
            }

            const resultFrame: FrameSeries = [];
            const parsedFrame = parsed as Frame[];

            parsedFrame.forEach(frame => {
                if (!Array.isArray(frame)) {
                    throw new Error(`Invalid frames (must be array): ${frameString}`);
                }

                if (frame.length > 2) {
                    throw new Error(`Invalid frames (must be max 2 elements): ${frameString}`);
                }

                // Validate roll data
                frame.forEach(roll => {
                    if (isNaN(Number(roll))) {
                        throw new Error(`Invalid roll data (must be numbers): ${frameString}`);
                    }
                });

                resultFrame.push(frame);
            });

            return resultFrame;
        } catch {
            throw new Error(`Invalid frames: ${frameString}`);
        }
    }

    /**
     * Parse line data and return frame series and score
     */
    static parseLineData(line: string | undefined): [FrameSeries, number] {
        if (!line) {
            throw new Error("Invalid line");
        }

        const lineData = line.split(":");

        if (lineData.length !== 2) {
            throw new Error(`Invalid line format: ${lineData}`);
        }

        const [frames, score] = lineData;
        
        if (score?.length === 0 || isNaN(Number(score))) {
            throw new Error(`Invalid score: ${score}`);
        }

        if (!frames || frames.length === 0) {
            throw new Error(`Invalid frames: ${frames}`);
        }

        const frameSeries = this.parseFrameData(frames);
        return [frameSeries, Number(score)];
    }
}
