import PlayerMultipleQueryService from '../playerMultipleQueryService';
import PlayerListDataHelper from '../playerListDataHelper';
import { apiInfo } from '../constants';

describe('PlayerMultipleQueryService', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })
    it('fetchData - should call _getResult with correct parameter', () => {
        const _getResult = jest.spyOn(PlayerMultipleQueryService, '_getResult');
        const { lrfSearch, lapSearch } = apiInfo;
        const param = { userName: 'test' };

        const expectedPromise = Promise.resolve({});
        const commonService = {
            fetchData: jest.fn((type, action, passedParam) => {
                const isValidParam = (type === lrfSearch.type || type === lapSearch.type) &&
                    (action === lrfSearch.action || action === lapSearch.action) &&
                    passedParam.userName === param.userName;

                return isValidParam ? expectedPromise : null;
            }),
            fetchMultiple: jest.fn(() => ({
                catch: () => ({})
            }))
        };

        const promise = PlayerMultipleQueryService.fetchData(param, commonService, apiInfo);

        return Promise.resolve(promise).then(() => {
            expect(_getResult).toHaveBeenCalledWith(param, expectedPromise, expectedPromise, commonService, apiInfo);
        });
    })

    describe('_getResult', () => {
        let originalMergePlayerList;
        beforeAll(() => {
            originalMergePlayerList = PlayerListDataHelper.mergePlayerList;
        });
        afterEach(() => {
            PlayerListDataHelper.mergePlayerList = originalMergePlayerList;
        })

        const defaultLapPlayerList = [
            { CustId: 1, UserName: 'test1', Status: 0, IP: '1.1.1.1', email: 'abc@gmail.com', isOnline: true, RealName: 'test1real' },
            { CustId: 2, UserName: 'test2', Status: 1, IP: '2.2.2.2', email: 'xyz@gmail.com', isOnline: false, RealName: 'test2real' }
        ];
        const defaultLrfPlayerList = [{ CustId: 1, BaStatus: true, OddsGroup: 'A' }, { CustId: 2, BaStatus: false, OddsGroup: 'B' }];

        const runTestCallingCorrectFunction = (param, lrfList, lapList, functionName) => {
            const lrfResponse = { data: { DataList: lrfList, TotalItem: 2 } };
            const lapResponse = { data: { PlayerList: lapList } };
            const lrfPromise = Promise.resolve(lrfResponse);
            const lapPromise = Promise.resolve(lapResponse);

            let handler = null;
            const commonService = {
                fetchMultiple: jest.fn((promiseList, callback) => {
                    handler = callback;

                    return { catch: jest.fn() }
                })
            }

            const originalRefetchFunction = PlayerMultipleQueryService[functionName];
            const refetchPromise = Promise.resolve({ playerList: [], totalItem: 0 });
            PlayerMultipleQueryService[functionName] = jest.fn(() => refetchPromise);
            PlayerMultipleQueryService._getResult(param, lrfPromise, lapPromise, commonService, apiInfo);
            handler(lrfResponse, lapResponse);

            expect(PlayerMultipleQueryService[functionName]).toHaveBeenCalled();

            PlayerMultipleQueryService[functionName] = originalRefetchFunction;
        }

        it('both side have no differenceList - return merged common list', () => {
            const param = {};
            const lrfResponse = { data: { DataList: defaultLrfPlayerList, TotalItem: 2 } };
            const lapResponse = { data: { PlayerList: defaultLapPlayerList } };
            const lrfPromise = Promise.resolve(lrfResponse);
            const lapPromise = Promise.resolve(lapResponse);

            let handler = null;
            const commonService = {
                fetchMultiple: jest.fn((promiseList, callback) => {
                    handler = callback;

                    return { catch: jest.fn() }
                })
            }

            const expectedMergedPlayerList = [
                { CustId: 1, BaStatus: true, OddsGroup: 'A', Status: 0 },
                { CustId: 2, BaStatus: false, OddsGroup: 'B', Status: 1 }
            ];
            PlayerListDataHelper.mergePlayerList = jest.fn(() => expectedMergedPlayerList);
            const expectedResult = {
                playerList: expectedMergedPlayerList,
                totalItem: 2
            }

            PlayerMultipleQueryService._getResult(param, lrfPromise, lapPromise, commonService, apiInfo);
            const result = handler(lrfResponse, lapResponse);

            expect(result).toEqual(expectedResult);
        })

        it('data response has different items - should call _refetchFormAllSide', () => {
            const param = {
                currency: '',
                specialLevel: '',
                pageSize: 50,
                pageIndex: 1
            };
            const lrfPlayerList = [
                ...defaultLrfPlayerList,
                { CustId: 3, UserName: 'test3', Status: 2, IP: '3.3.3.3', email: 'def@gmail.com', isOnline: true, RealName: 'test3real' }
            ];
            const lapPlayerList = [...defaultLrfPlayerList, { CustId: 4, BaStatus: true, OddsGroup: 'C' }];

            runTestCallingCorrectFunction(param, lrfPlayerList, lapPlayerList, '_refetchFormAllSide');
        })

        it('data response from Lap has different items - should call _refetchFromLrf', () => {
            const param = {
                currency: '',
                specialLevel: '',
                pageSize: 50,
                pageIndex: 1
            };
            const lrfPlayerList = [...defaultLrfPlayerList];
            const lapPlayerList = [...defaultLrfPlayerList, { CustId: 4, BaStatus: true, OddsGroup: 'C' }];

            runTestCallingCorrectFunction(param, lrfPlayerList, lapPlayerList, '_refetchFromLrf');
        })

        it('data response from Lap has different items - should call _refetchFromLrf', () => {
            const param = {
                currency: '',
                specialLevel: '',
                pageSize: 50,
                pageIndex: 1
            };
            const lrfPlayerList = [
                ...defaultLrfPlayerList,
                { CustId: 3, UserName: 'test3', Status: 2, IP: '3.3.3.3', email: 'def@gmail.com', isOnline: true, RealName: 'test3real' }
            ];
            const lapPlayerList = [...defaultLrfPlayerList];

            runTestCallingCorrectFunction(param, lrfPlayerList, lapPlayerList, '_refetchFromLap');
        })
    })
})