import type { FrameSeries, Frame } from './types';

export class ScoreCalculator {
    /**
     * Calculate bowling score from frame series
     * 
     * FrameSeries length can be 0 to 10 normally
     * We append 11th frame for strike and spare bonus
     */
    static calculateScore(frames: FrameSeries): number {
        let score = 0;

        for (let i = 0; i < frames.length; i++) {
            const currentFrame = frames[i];
            let frameScore = 0;
            console.log(`Frame ${i + 1}: ${currentFrame}`);

            if(!currentFrame || currentFrame.length === 0) {
                continue;
            }

            // if 10th frame, we need to handle strike and spare differently
            if(i === 9) {
                frameScore = this.processFrame(currentFrame, i, frames);

                score += frameScore;
                console.log(`Frame ${i + 1} score: ${frameScore}`);
                console.log(`Total score: ${score}`);
                console.log(`---------------------------------------------`);
                // for 10th frame, we don't need to iterater on next frames
                break;
            } else {
                // Strike (single roll = 10)
                if (currentFrame?.length === 1) {
                    frameScore = 10;
                    console.log(`Frame ${i + 1} is strike`);
                    frameScore += this.getStrikeBonus(frames, i);
                } 
                // Regular frame or spare
                else if (currentFrame?.length === 2) {
                    frameScore = (currentFrame[0] || 0) + (currentFrame[1] || 0);
                    
                    // Spare bonus (if frame total = 10)
                    if (frameScore === 10) {
                        console.log(`Frame ${i + 1} is spare`);
                        frameScore += this.getSpareBonus(frames, i);
                    }
                }
            }

            score += frameScore;
            console.log(`Frame ${i + 1} score: ${frameScore}`);
            console.log(`Total score: ${score}`);
            console.log(`---------------------------------------------`);
        }

        return score;
    }

    private static processFrame(currentFrame: Frame, currentIndex: number, frames: FrameSeries): number {
        let frameScore = 0;

        if(currentFrame.length === 1) {
            frameScore = 10;
            console.log(`Frame ${currentIndex + 1} is strike`);

            frameScore += this.getStrikeBonus(frames, currentIndex);
        } else if(currentFrame?.length === 2) {
            frameScore = (currentFrame[0] || 0) + (currentFrame[1] || 0);

            // Spare bonus - take 1 roll from next frame
            if (frameScore === 10) {
                console.log(`Frame ${currentIndex + 1} is spare`);

                frameScore += this.getSpareBonus(frames, currentIndex);
            }
        }

        return frameScore;
    }

    /**
     * Get bonus points for a strike (next 2 rolls)
     */
    private static getStrikeBonus(frames: FrameSeries, currentIndex: number): number {
        let bonus = 0;
        const nextFrame = frames[currentIndex + 1];
        const secondNextFrame = frames[currentIndex + 2];

        if (nextFrame) {
            bonus += nextFrame[0] || 0;
            bonus += nextFrame[1] || 0;
        }

        if (secondNextFrame) {
            bonus += (secondNextFrame[0] || 0) + (secondNextFrame[1] || 0);
        }

        return bonus;
    }

    /**
     * Get bonus points for a spare (next 1 roll)
     */
    private static getSpareBonus(frames: FrameSeries, currentIndex: number): number {
        const nextFrame = frames[currentIndex + 1];
        return nextFrame?.[0] || 0;
    }
}
