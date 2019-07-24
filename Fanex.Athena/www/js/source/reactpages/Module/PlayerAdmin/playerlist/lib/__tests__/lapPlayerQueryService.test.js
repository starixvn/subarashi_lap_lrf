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

    it('fetchData - commonService.fetchData should be called with correct parameter', () => {
        const param = {...defaultParam };
        const commonService = {
            fetchData: jest.fn(() => Promise.resolve({ data: {} }))
        }

        const expectedApiInfo = apiInfo.lapSearch;

        LapPlayerQueryService.fetchData(param, commonService, apiInfo);

        expect(commonService.fetchData).toHaveBeenCalledWith(expectedApiInfo.type, expectedApiInfo.action, param);
    })

    it('fetchData - return empty list - should return correct result', () => {
        const param = {...defaultParam };
        const commonService = {
            fetchData: jest.fn(() => Promise.resolve({ data: { PlayerList: [] } }))
        }

        Promise.resolve(LapPlayerQueryService.fetchData(param, commonService, apiInfo)).then((result) => {
            expect(result).toEqual(emptyResult);
        })
    })

    it('fetchData - throw exception - should return empty result', () => {
        const param = {...defaultParam };
        const commonService = {
            fetchData: jest.fn(() => new Promise(() => {
                throw new Error('Network Error')
            }))
        }

        Promise.resolve(LapPlayerQueryService.fetchData(param, commonService, apiInfo)).then((result) => {
            expect(result).toEqual(emptyResult);
        })
    })

    it('fetchData - has player list response - should call _fetchFromLrf with correct parameter', () => {
        const param = {...defaultParam };
        const expectedResponse = [{ CustId: 1, UserName: 'test' }];
        const commonService = {
            fetchData: jest.fn(() => Promise.resolve({ data: { PlayerList: expectedResponse } }))
        }

        const expectedApiInfo = apiInfo.lrfDataById;
        LapPlayerQueryService._fetchFromLrf = jest.fn();

        LapPlayerQueryService.fetchData(param, commonService, apiInfo)

        Promise.resolve().then(() => {
            expect(LapPlayerQueryService._fetchFromLrf).toHaveBeenCalledWith(param, expectedApiInfo, expectedResponse, commonService);
        })
    })

    it('_fetchFromLrf - return correct data result', () => {
        const lapPlayerList = [{ CustId: 1, UserName: 'test1', Status: 0 }, { CustId: 2, UserName: 'test2', Status: 1 }];
        const param = {
            currency: '',
            specialLevel: '',
            pageSize: 50,
            pageIndex: 1
        }
        const expectedResonse = [{ CustId: 1, BaStatus: true, OddsGroup: 'A' }, { CustId: 2, BaStatus: false, OddsGroup: 'B' }];
        const commonService = {
            fetchData: jest.fn(() => Promise.resolve({ data: { PlayerList: expectedResonse, TotalItem: 2 } }))
        }

        const expectedLrfParam = {
            currency: param.currency,
            idList: '1,2',
            specialLevel: param.specialLevel,
            pageSize: param.pageSize,
            pageIndex: param.pageIndex
        }
        const lrfDataById = apiInfo.lrfDataById;
        const expectedMergingData = [
            { CustId: 1, UserName: 'test1', Status: 0, BaStatus: true, OddsGroup: 'A' },
            { CustId: 2, UserName: 'test2', Status: 1, BaStatus: false, OddsGroup: 'B' }
        ];
        PlayerListDataHelper.mergePlayerList = jest.fn(() => expectedMergingData);

        const expectedResult = {
            playerList: expectedMergingData,
            totalItem: 2
        }
        const result = LapPlayerQueryService._fetchFromLrf(param, lrfDataById, lapPlayerList, commonService);

        expect(commonService.fetchData).toHaveBeenCalledWith(lrfDataById.type, lrfDataById.action, expectedLrfParam);
        Promise.resolve().then(() => {
            expect(result).toEqual(expectedResult);
        })
    })
})