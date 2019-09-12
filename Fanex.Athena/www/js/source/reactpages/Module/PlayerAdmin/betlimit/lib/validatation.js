import LangHelper from '@jsroot/lib/langHelper';
import { BetLimitType } from './constants';

export default class Validatation {
    static validate(current, limitData) {
        if (!current.IsUpdated) {
            return null;
        }

        const { MinBet, MaxBet, MaxPerMatch, Id } = current;

        if (isNaN(MinBet)) {
            return {
                Id: Id,
                Type: BetLimitType.MinBet,
                Message: LangHelper.getSingleResource('IncorrectMinBet')
            };
        }
        if (isNaN(MaxBet)) {
            return {
                Id: Id,
                Type: BetLimitType.MaxBet,
                Message: LangHelper.getSingleResource('IncorrectMaxBet')
            };
        }
        if (isNaN(MaxPerMatch)) {
            return {
                Id: Id,
                Type: BetLimitType.MaxPerMatch,
                Message: LangHelper.getSingleResource('IncorrectMaxPerMatch')
            };
        }

        if (limitData.BetValueMin > 0 && MinBet < limitData.BetValueMin) {
            return {
                Id: Id,
                Type: BetLimitType.MinBet,
                Message: LangHelper.getSingleResource('MinBetGreaterThanOrEqual') + ' ' + limitData.BetValueMin
            };
        }

        if (limitData.BetValueMax > 0 && MaxBet > limitData.BetValueMax) {
            return {
                Id: Id,
                Type: BetLimitType.MaxBet,
                Message: LangHelper.getSingleResource('MaxBetLessThanOrEqual') + ' ' + limitData.BetValueMax
            };
        }

        if (limitData.MaxPerMatchMax > 0 && MaxPerMatch > limitData.MaxPerMatchMax) {
            return {
                Id: Id,
                Type: BetLimitType.MaxPerMatch,
                Message: LangHelper.getSingleResource('MaxBetMatchMoreThanOrEqual') + ' ' + limitData.MaxPerMatchMax
            };
        }

        if (limitData.MaxPerMatchMin > 0 && MaxPerMatch < limitData.MaxPerMatchMin) {
            return {
                Id: Id,
                Type: BetLimitType.MaxPerMatch,
                Message: LangHelper.getSingleResource('MaxBetMatchLessThanOrEqual') + ' ' + limitData.MaxPerMatchMin
            };
        }

        if (MinBet > MaxBet) {
            return {
                Id: Id,
                Type: BetLimitType.MinBet,
                Message: LangHelper.getSingleResource('MinBetCanNotGreaterThanMaxBet') + ' ' + MaxBet
            };
        }

        if (MaxBet > MaxPerMatch) {
            return {
                Id: Id,
                Type: BetLimitType.MaxBet,
                Message: LangHelper.getSingleResource('MaxBetCanNotGreaterThanMaxPerMatch') + ' ' + MaxPerMatch
            };
        }

        return null;
    }

    static validateNumberGame(current, limitData) {
        const result = Validatation.validate(current, limitData);

        if (result) {
            return result;
        }

        const { MaxPerBall, Id } = current;

        if (isNaN(MaxPerBall)) {
            return {
                Id: Id,
                Type: BetLimitType.MaxPerBall,
                Message: LangHelper.getSingleResource('IncorrectMaxPerBall')
            };
        }

        if (limitData.MaxPerBallMax > 0 && MaxPerBall > limitData.MaxPerBallMax) {
            return {
                Id: Id,
                Type: BetLimitType.MaxPerBall,
                Message: LangHelper.getSingleResource('MaxPerBallLessThanOrEqual') + ' ' + limitData.MaxPerBallMax
            };
        }

        return null;
    }
}