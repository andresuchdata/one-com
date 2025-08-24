import type { Frame, FrameSeries } from './types';

export class ScoreCalculator {
    /**
     * Calculate bowling score from frame series
     * 
     * FrameSeries length can be 0 to 10 normally
     * We append 11th and 12th frames for strike and spare if needed
     */
    static calculateScore(frames: FrameSeries): number {
        let score = 0;

        for (let i = 0; i < frames.length; i++) {
            const currentFrame = frames[i];
            let frameScore = 0;

            console.log(`Frame ${i + 1}: ${currentFrame}`);

            // Strike (single roll = 10)
            if (currentFrame?.length === 1) {
                frameScore = 10;
                frameScore += this.getStrikeBonus(frames, i);
            } 
            // Regular frame or spare
            else if (currentFrame?.length === 2) {
                frameScore = (currentFrame[0] || 0) + (currentFrame[1] || 0);
                
                // Spare bonus (if frame total = 10)
                if (frameScore === 10) {
                    frameScore += this.getSpareBonus(frames, i);
                }
            }

            score += frameScore;
        }

        return score;
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
