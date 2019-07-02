import * as filterHandlerAction from '../filterHandlerAction';
import { SET_PARAM, SET_PLAYER_LIST, SET_SELECTED_PLAYER } from '../types';

jest.mock('../../lib/playerListService', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getPlayerList: jest.fn((param) => {
                const playerListByCaseId = {
                    '1': { playerList: [{ custId: 1, userName: 'test1' }, { custId: 2, userName: 'test2' }] },
                    '2': { playerList: [] },
                    '3': { playerList: [{ custId: 1, userName: 'test1' }] }
                }

                const response = playerListByCaseId[param.caseId];
                return Promise.resolve(response);
            })
        };
    })
});

describe('filterHandlerAction', () => {
    it('setParam - return correct data', () => {
        const data = { userName: 'test', currency: 'USD' };
        const result = filterHandlerAction.setParam(data);
        const expectedResult = { type: SET_PARAM, data };

        expect(result).toEqual(expectedResult);
    })

    describe('searchPlayer', () => {
        it('playerList has many items - should dispatch setPlayerList action correctly', (done) => {
            const playerList = [{ custId: 1, userName: 'test1' }, { custId: 2, userName: 'test2' }];
            const expectedSetPlayerListParam = {
                type: SET_PLAYER_LIST,
                data: playerList
            }

            const mockDispatch = jest.fn();
            const param = { caseId: 1, userName: 'test', currency: 'USD' };
            filterHandlerAction.searchPlayer(param)(mockDispatch);

            Promise.resolve().then(() => {
                expect(mockDispatch).toHaveBeenCalledTimes(2);
                expect(mockDispatch).toHaveBeenCalledWith(expectedSetPlayerListParam);
                done();
            })
        })

        it('playerList has 1 item - should dispatch setSelectedPlayer action correctly', (done) => {
            const expectedSetPlayerListParam = {
                type: SET_SELECTED_PLAYER,
                data: { custId: 1, userName: 'test1' }
            }

            const mockDispatch = jest.fn();
            const param = { caseId: 3, userName: 'test', currency: 'USD' };
            filterHandlerAction.searchPlayer(param)(mockDispatch);

            Promise.resolve().then(() => {
                expect(mockDispatch).toHaveBeenCalledTimes(3);
                expect(mockDispatch.mock.calls[1][0]).toEqual(expectedSetPlayerListParam);
                done();
            })
        })

        it('playerList is empty - should dispatch setSelectedPlayer with null value', (done) => {
            const expectedSetPlayerListParam = {
                type: SET_SELECTED_PLAYER,
                data: null
            }

            const mockDispatch = jest.fn();
            const param = { caseId: 2, userName: 'test', currency: 'USD' };
            filterHandlerAction.searchPlayer(param)(mockDispatch);

            Promise.resolve().then(() => {
                expect(mockDispatch).toHaveBeenCalledTimes(3);
                expect(mockDispatch.mock.calls[1][0]).toEqual(expectedSetPlayerListParam);
                done();
            })
        })
    })
})