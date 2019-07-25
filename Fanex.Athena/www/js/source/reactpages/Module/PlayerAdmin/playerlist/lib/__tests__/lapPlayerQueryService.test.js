import LapPlayerQueryService from '../lapPlayerQueryService';
import PlayerListDataHelper from '../playerListDataHelper';
import { apiInfo } from '../constants';

describe('LapPlayerQueryService', () => {
    const defaultParam = {
        bankAccountNumber: '123',
        email: 'test@gmail.com'
    }

    const emptyResult = {
        playerList: [],
        totalItem: 0
    }

    describe('fetchData', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        })

        it('commonService.fetchData should be called with correct parameter', () => {
            const param = {...defaultParam };
            const commonService = {
                fetchData: jest.fn(() => Promise.resolve({ data: {} }))
            }

            const expectedApiInfo = apiInfo.lapSearch;

            const promise = LapPlayerQueryService.fetchData(param, commonService, apiInfo);

            return Promise.resolve(promise).then(() => {
                expect(commonService.fetchData).toHaveBeenCalledWith(expectedApiInfo.type, expectedApiInfo.action, param);
            })
        })

        it('return empty list - should return correct result', () => {
            const param = {...defaultParam };
            const commonService = {
                fetchData: jest.fn(() => Promise.resolve({ data: { PlayerList: [] } }))
            }

            const promise = LapPlayerQueryService.fetchData(param, commonService, apiInfo);

            return Promise.resolve(promise).then((result) => {
                expect(result).toEqual(emptyResult);
            })
        })

        it('throw exception - should return empty result', () => {
            const param = {...defaultParam };
            const commonService = {
                fetchData: jest.fn(() => new Promise(() => {
                    throw new Error('Network Error')
                }))
            }

            const promise = LapPlayerQueryService.fetchData(param, commonService, apiInfo);

            return Promise.resolve(promise).then((result) => {
                expect(result).toEqual(emptyResult);
            })
        })

        it('has player list response - should call _fetchFromLrf with correct parameter', () => {
            const param = {...defaultParam };
            const expectedResponse = [{ CustId: 1, UserName: 'test' }];
            const commonService = {
                fetchData: jest.fn(() => Promise.resolve({ data: { PlayerList: expectedResponse } }))
            }

            const expectedApiInfo = apiInfo.lrfDataById;
            const _fetchFromLrf = jest.spyOn(LapPlayerQueryService, '_fetchFromLrf');

            const promise = LapPlayerQueryService.fetchData(param, commonService, apiInfo)

            return Promise.resolve(promise).then(() => {
                expect(_fetchFromLrf).toHaveBeenCalledWith(param, expectedApiInfo, expectedResponse, commonService);
            })
        })
    })

    describe('_fetchFromLrf', () => {
        let originalMergePlayerList;
        beforeAll(() => {
            originalMergePlayerList = PlayerListDataHelper.mergePlayerList;
        });
        afterEach(() => {
            PlayerListDataHelper.mergePlayerList = originalMergePlayerList;
        })

        it('DataList response is empty - return Lap Player List', () => {
            const lapPlayerList = [
                { CustId: 1, UserName: 'test1', Status: 0, IP: '1.1.1.1', email: 'abc@gmail.com', isOnline: true, RealName: 'test1real' },
                { CustId: 2, UserName: 'test2', Status: 1, IP: '2.2.2.2', email: 'xyz@gmail.com', isOnline: false, RealName: 'test2real' }
            ];
            const param = {
                currency: '',
                specialLevel: '',
                pageSize: 50,
                pageIndex: 1
            }

            const expectedLrfParam = {
                currency: param.currency,
                idList: '1,2',
                specialLevel: param.specialLevel,
                pageSize: param.pageSize,
                pageIndex: param.pageIndex
            }
            const { lrfDataById } = apiInfo;
            const commonService = {
                fetchData: jest.fn((type, action, lrfParam) => {
                    const isMatchParam = JSON.stringify(lrfParam) === JSON.stringify(expectedLrfParam);
                    return type === lrfDataById.type && action === lrfDataById.action && isMatchParam ?
                        Promise.resolve({ data: { DataList: [], TotalItem: 0 } }) : null;
                })
            }

            const expectedPlayerList = [
                { CustId: 1, UserName: 'test1', Status: 0, RealName: 'test1real', LastLoginIp: '1.1.1.1', Email: 'abc@gmail.com', IsOnline: true },
                { CustId: 2, UserName: 'test2', Status: 1, RealName: 'test2real', LastLoginIp: '2.2.2.2', Email: 'xyz@gmail.com', IsOnline: false }
            ];
            const expectedResult = {
                playerList: expectedPlayerList,
                totalItem: 2
            }

            const promise = LapPlayerQueryService._fetchFromLrf(param, lrfDataById, lapPlayerList, commonService);

            return Promise.resolve(promise)
                .then((result) => {
                    expect(result).toEqual(expectedResult);
                })
        })

        it('return correct data result', () => {
            const lapPlayerList = [{ CustId: 1, UserName: 'test1', Status: 0 }, { CustId: 2, UserName: 'test2', Status: 1 }];
            const param = {
                currency: '',
                specialLevel: '',
                pageSize: 50,
                pageIndex: 1
            }
            const expectedResponse = [{ CustId: 1, BaStatus: true, OddsGroup: 'A' }, { CustId: 2, BaStatus: false, OddsGroup: 'B' }];
            const commonService = {
                fetchData: jest.fn(() => Promise.resolve({ data: { DataList: expectedResponse, TotalItem: 2 } }))
            }
            const expectedMergingData = [
                { CustId: 1, UserName: 'test1', Status: 0, BaStatus: true, OddsGroup: 'A' },
                { CustId: 2, UserName: 'test2', Status: 1, BaStatus: false, OddsGroup: 'B' }
            ];
            PlayerListDataHelper.mergePlayerList = jest.fn(() => expectedMergingData);

            const expectedResult = {
                playerList: expectedMergingData,
                totalItem: 2
            }
            const response = LapPlayerQueryService._fetchFromLrf(param, apiInfo.lrfDataById, lapPlayerList, commonService);

            return Promise.resolve(response).then((result) => {
                expect(result).toEqual(expectedResult);
            })
        })

        it('throw exception - should build data with Lap Player List', () => {
            const lapPlayerList = [
                { CustId: 1, UserName: 'test1', Status: 0, IP: '1.1.1.1', email: 'abc@gmail.com', isOnline: true, RealName: 'test1real' },
                { CustId: 2, UserName: 'test2', Status: 1, IP: '2.2.2.2', email: 'xyz@gmail.com', isOnline: false, RealName: 'test2real' }
            ];
            const param = {
                currency: '',
                specialLevel: '',
                pageSize: 50,
                pageIndex: 1
            }
            const commonService = {
                fetchData: jest.fn(() => new Promise(() => {
                    throw new Error('Network Error')
                }))
            }
            const { lrfDataById } = apiInfo;
            const expectedPlayerList = [
                { CustId: 1, UserName: 'test1', Status: 0, RealName: 'test1real', LastLoginIp: '1.1.1.1', Email: 'abc@gmail.com', IsOnline: true },
                { CustId: 2, UserName: 'test2', Status: 1, RealName: 'test2real', LastLoginIp: '2.2.2.2', Email: 'xyz@gmail.com', IsOnline: false }
            ];
            const expectedResult = {
                playerList: expectedPlayerList,
                totalItem: 2
            }
            const promise = LapPlayerQueryService._fetchFromLrf(param, lrfDataById, lapPlayerList, commonService);

            return Promise.resolve(promise)
                .then((result) => {
                    expect(result).toEqual(expectedResult);
                })
        })
    })
})