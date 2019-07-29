import PlayerMultipleQueryService from '../playerMultipleQueryService';
import PlayerListDataHelper from '../playerListDataHelper';
import { apiInfo } from '../constants';

describe('PlayerMultipleQueryService', () => {
    const defaultParam = {
        currency: '',
        specialLevel: '',
        pageSize: 50,
        pageIndex: 1
    };
    const defaultLapPlayerList = [
        { CustId: 1, UserName: 'test1', Status: 0, IP: '1.1.1.1', email: 'abc@gmail.com', isOnline: true, RealName: 'test1real' },
        { CustId: 2, UserName: 'test2', Status: 1, IP: '2.2.2.2', email: 'xyz@gmail.com', isOnline: false, RealName: 'test2real' }
    ];
    const defaultLapDifferenceList = [{ CustId: 4, UserName: 'test4', Status: 0, IP: '4.4.4.4', email: 'ijk@gmail.com', isOnline: true, RealName: 'test4real' }];
    const defaultLrfPlayerList = [{ CustId: 1, BaStatus: true, OddsGroup: 'A' }, { CustId: 2, BaStatus: false, OddsGroup: 'B' }];
    const defaultLrfDifferenceList = [{ CustId: 3, BaStatus: true, OddsGroup: 'D' }];
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

        let handler = null;
        let defaultCommonService = null;
        beforeEach(() => {
            defaultCommonService = {
                fetchMultiple: jest.fn((promiseList, callback) => {
                    handler = callback;

                    return { catch: jest.fn() }
                })
            }
        })
        afterEach(() => {
            handler = null;
            defaultCommonService = null;
            PlayerListDataHelper.mergePlayerList = originalMergePlayerList;
        })

        const runTestCallingCorrectFunction = (param, lrfList, lapList, functionName, checkResultFunc) => {
            const lrfResponse = { data: { DataList: lrfList, TotalItem: lrfList.length } };
            const lapResponse = { data: { PlayerList: lapList, TotalItem: lapList.length } };
            const lrfPromise = Promise.resolve(lrfResponse);
            const lapPromise = Promise.resolve(lapResponse);

            const commonService = {...defaultCommonService }

            const originalRefetchFunction = PlayerMultipleQueryService[functionName];
            const refetchPromise = Promise.resolve({ playerList: [], totalItem: 0 });
            PlayerMultipleQueryService[functionName] = jest.fn(() => refetchPromise);
            PlayerMultipleQueryService._getResult(param, lrfPromise, lapPromise, commonService, apiInfo);
            handler(lrfResponse, lapResponse);

            checkResultFunc();

            PlayerMultipleQueryService[functionName] = originalRefetchFunction;
        }

        it('both side have no differenceList - return merged common list', () => {
            const param = {};
            const lrfResponse = { data: { DataList: defaultLrfPlayerList, TotalItem: 2 } };
            const lapResponse = { data: { PlayerList: defaultLapPlayerList, TotalItem: 2 } };
            const lrfPromise = Promise.resolve(lrfResponse);
            const lapPromise = Promise.resolve(lapResponse);

            const commonService = {...defaultCommonService };

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

        it('data response has different items - should call _refetchFormAllSide with correct parameter', () => {
            const param = {...defaultParam };
            const lrfPlayerList = [...defaultLrfPlayerList, ...defaultLrfDifferenceList];
            const lapPlayerList = [...defaultLapPlayerList, ...defaultLapDifferenceList];
            const functionName = '_refetchFormAllSide';
            const checkResult = () => {
                const expectedLrfParam = {
                    currency: param.currency,
                    idList: '4',
                    specialLevel: param.specialLevel,
                    pageSize: param.pageSize,
                    pageIndex: param.pageIndex
                }

                const expectedLapParam = {
                    idList: [3]
                }

                const expectedLrfDataObject = {
                    commonList: [...defaultLrfPlayerList],
                    differenceList: [...defaultLrfDifferenceList]
                }

                const expectedLapDataObject = {
                    commonList: [...defaultLapPlayerList],
                    differenceList: [...defaultLapDifferenceList]
                }
                expect(PlayerMultipleQueryService[functionName]).toHaveBeenCalledWith(
                    expectedLrfParam,
                    expectedLapParam,
                    expectedLrfDataObject,
                    expectedLapDataObject,
                    defaultCommonService,
                    apiInfo);
            }

            runTestCallingCorrectFunction(param, lrfPlayerList, lapPlayerList, functionName, checkResult);
        })

        it('data response from Lap has different items - should call _refetchFromLrf with correct parameter', () => {
            const param = {...defaultParam };
            const lrfPlayerList = [...defaultLrfPlayerList];
            const lapPlayerList = [...defaultLapPlayerList, ...defaultLapDifferenceList];

            const functionName = '_refetchFromLrf';
            const checkResult = () => {
                const expectedLrfParam = {
                    currency: param.currency,
                    idList: '4',
                    specialLevel: param.specialLevel,
                    pageSize: param.pageSize,
                    pageIndex: param.pageIndex
                }

                const expectedLapDataObject = {
                    commonList: [...defaultLapPlayerList],
                    differenceList: [...defaultLapDifferenceList]
                }
                expect(PlayerMultipleQueryService[functionName]).toHaveBeenCalledWith(
                    expectedLrfParam,
                    expectedLapDataObject,
                    defaultCommonService,
                    apiInfo);
            }

            runTestCallingCorrectFunction(param, lrfPlayerList, lapPlayerList, functionName, checkResult);
        })

        it('data response from Lrf has different items - should call _refetchFromLap', () => {
            const param = {...defaultParam };
            const lrfPlayerList = [...defaultLrfPlayerList, ...defaultLrfDifferenceList];
            const lapPlayerList = [...defaultLapPlayerList];
            const functionName = '_refetchFromLap';
            const checkResult = () => {
                const expectedLapParam = {
                    idList: [3]
                }

                const expectedLrfDataObject = {
                    commonList: [...defaultLrfPlayerList],
                    differenceList: [...defaultLrfDifferenceList]
                }

                expect(PlayerMultipleQueryService[functionName]).toHaveBeenCalledWith(
                    expectedLapParam,
                    expectedLrfDataObject,
                    defaultCommonService,
                    apiInfo);
            }

            runTestCallingCorrectFunction(param, lrfPlayerList, lapPlayerList, functionName, checkResult);
        })
    })

    describe('_refetchFormAllSide', () => {
        it('should call fetchMultiple with correct parameter', () => {
            const { lrfDataById, lapDataById } = apiInfo;
            const param = {...defaultParam };
            const lrfParam = {
                currency: param.currency,
                idList: '4'
            }
            const lapParam = {
                idList: [3]
            }

            const lrfPromise = Promise.resolve({ data: 'lrf' });
            const lapPromise = Promise.resolve({ data: 'lap' });
            const commonService = {
                fetchData: jest.fn((type, action, passedParam) => {
                    const isLrf = type === lrfDataById.type &&
                        action === lrfDataById.action &&
                        JSON.stringify(passedParam) === JSON.stringify(lrfParam);

                    const isLap = type === lapDataById.type &&
                        action === lapDataById.action &&
                        JSON.stringify(passedParam) === JSON.stringify(lapParam);

                    return isLrf ? lrfPromise : (isLap ? lapPromise : null);
                }),
                fetchMultiple: jest.fn(() => ({
                    catch: () => ({})
                }))
            };

            const expectedParam = [lrfPromise, lapPromise];
            PlayerMultipleQueryService._refetchFormAllSide(lrfParam, lapParam, {}, {}, commonService, apiInfo);

            expect(commonService.fetchMultiple.mock.calls[0][0]).toEqual(expectedParam);
        })

        it('continue to fetchMultiple with both side - return correct data', () => {
            let handler = null;
            const commonService = {
                fetchData: jest.fn(() => Promise.resolve({})),
                fetchMultiple: jest.fn((promiseList, callback) => {
                    handler = callback;

                    return { catch: jest.fn() }
                })
            }
            const nextLrfResponse = {
                data: {
                    DataList: [
                        { CustId: 4, BaStatus: true, OddsGroup: 'C', UserName: 'test4' }
                    ],
                    TotalItem: 1
                }
            };
            const nextLapResponse = {
                data: {
                    PlayerList: [
                        { CustId: 3, UserName: 'test3', Status: 2, IP: '3.3.3.3', email: 'def@gmail.com', isOnline: true, RealName: 'test3real' },
                    ],
                    TotalItem: 1
                }
            };

            const lrfDataObject = {
                commonList: [],
                differenceList: [...defaultLrfDifferenceList]
            }
            const lapDataObject = {
                commonList: [],
                differenceList: [...defaultLapDifferenceList]
            }

            const expectedPlayerList = [{
                    CustId: 3,
                    UserName: 'test3',
                    Status: 2,
                    LastLoginIp: '3.3.3.3',
                    Email: 'def@gmail.com',
                    IsOnline: true,
                    RealName: 'test3real',
                    BaStatus: true,
                    OddsGroup: 'D',
                    SystemId: undefined,
                    Currency: undefined,
                    CurrentBalance: undefined,
                    OutstandingBalance: undefined,
                    SpecialLevel: undefined
                },
                {
                    CustId: 4,
                    UserName: 'test4',
                    Status: 0,
                    LastLoginIp: '4.4.4.4',
                    Email: 'ijk@gmail.com',
                    IsOnline: true,
                    RealName: 'test4real',
                    BaStatus: true,
                    OddsGroup: 'C',
                    SystemId: undefined,
                    Currency: undefined,
                    CurrentBalance: undefined,
                    OutstandingBalance: undefined,
                    SpecialLevel: undefined
                }
            ]
            const expectedResult = {
                playerList: expectedPlayerList,
                totalItem: 1
            }

            PlayerMultipleQueryService._refetchFormAllSide({}, {}, lrfDataObject, lapDataObject, commonService, apiInfo);
            const result = handler(nextLrfResponse, nextLapResponse);

            expect(result).toEqual(expectedResult);
        })

        it('throw exception - return empty result', () => {
            const commonService = {
                fetchData: jest.fn(() => Promise.resolve({})),
                fetchMultiple: jest.fn(() => new Promise(() => {
                    throw new Error('Network Error')
                }))
            }

            const lrfDataObject = {
                commonList: [],
                differenceList: []
            }
            const lapDataObject = {
                commonList: [],
                differenceList: []
            }

            const expectedResult = {
                playerList: [],
                totalItem: 0
            }
            const promise = PlayerMultipleQueryService._refetchFormAllSide({}, {}, lrfDataObject, lapDataObject, commonService, apiInfo);

            return Promise.resolve(promise).then((result) => {
                expect(result).toEqual(expectedResult);
            })
        })
    })

    describe('_refetchFromLrf', () => {
        const runTestForReturningEmptyResult = (commonService) => {
            const param = {};
            const lapDataObject = {
                commonList: [],
                differenceList: [...defaultLapDifferenceList]
            }

            const expectedPlayerList = lapDataObject.differenceList.map(item => {
                const { CustId, UserName, Status, RealName, IP, email, isOnline } = item;

                return {
                    CustId,
                    UserName,
                    Status,
                    RealName,
                    LastLoginIp: IP,
                    Email: email,
                    IsOnline: isOnline
                };
            })
            const expectedResult = {
                playerList: expectedPlayerList,
                totalItem: 1
            }

            const promise = PlayerMultipleQueryService._refetchFromLrf(param, lapDataObject, commonService, apiInfo);

            return Promise.resolve(promise).then((result) => {
                expect(result).toEqual(expectedResult);
            })
        }

        it('data response is empty - return lap list data', () => {
            const commonService = {
                fetchData: jest.fn(() => Promise.resolve({ data: { DataList: [], TotalItem: 0 } }))
            }

            return runTestForReturningEmptyResult(commonService);
        })

        it('throw exception - should return lap list data', () => {
            const commonService = {
                fetchData: jest.fn(() => new Promise(() => {
                    throw new Error('Network Error')
                }))
            }

            return runTestForReturningEmptyResult(commonService);
        })

        it('has data list response - return correct data', () => {
            let originalMergePlayerList = PlayerListDataHelper.mergePlayerList;
            const param = {};
            const lapDataObject = {
                commonList: [],
                differenceList: [...defaultLapDifferenceList]
            }
            const expectedResponse = [{ CustId: 1, UserName: 'test' }];
            const commonService = {
                fetchData: jest.fn(() => Promise.resolve({ data: { DataList: expectedResponse, TotalItem: 1 } }))
            }

            const expectedPlayerList = [{ UserId: 1 }];
            PlayerListDataHelper.mergePlayerList = jest.fn((lrfPlayerList, differenceList) => {
                return lrfPlayerList === expectedResponse && differenceList === lapDataObject.differenceList ? expectedPlayerList : null;
            });

            const promise = PlayerMultipleQueryService._refetchFromLrf(param, lapDataObject, commonService, apiInfo);

            return Promise.resolve(promise).then((result) => {
                expect(result.playerList).toBe(expectedPlayerList);
                expect(result.totalItem).toBe(1);

                PlayerListDataHelper.mergePlayerList = originalMergePlayerList;
            })
        })
    })

    describe('_refetchFromLap', () => {
        const runTestForReturningEmptyResult = (commonService) => {
            const lapParam = { idList: [1] };
            const lrfDataObject = {
                commonList: [],
                differenceList: [...defaultLrfDifferenceList]
            }

            const promise = PlayerMultipleQueryService._refetchFromLap(lapParam, lrfDataObject, commonService, apiInfo);

            return Promise.resolve(promise).then((result) => {
                expect(result.playerList).toBe(lrfDataObject.differenceList);
                expect(result.totalItem).toBe(1);
            })
        }

        it('get empty list response - should return lrf difference list result', () => {
            const commonService = {
                fetchData: jest.fn(() => Promise.resolve({ data: { PlayerList: [], TotalItem: 0 } }))
            }

            return runTestForReturningEmptyResult(commonService);
        })

        it('throw exception - should return lrf difference list result', () => {
            const commonService = {
                fetchData: jest.fn(() => new Promise(() => {
                    throw new Error('Network Error')
                }))
            }

            return runTestForReturningEmptyResult(commonService);
        })

        it('has player list response - should call _fetchFromLrf with correct parameter', () => {
            let originalMergePlayerList = PlayerListDataHelper.mergePlayerList;
            const expectedResponse = [{ CustId: 1, UserName: 'test' }];
            const commonService = {
                fetchData: jest.fn(() => Promise.resolve({ data: { PlayerList: expectedResponse, TotalItem: 1 } }))
            }
            const lapParam = { idList: [1] };
            const lrfDataObject = {
                commonList: [],
                differenceList: [...defaultLrfDifferenceList]
            }

            const expectedPlayerList = [{ UserId: 1 }];
            PlayerListDataHelper.mergePlayerList = jest.fn((differenceList, lapPlayerList) => {
                return lapPlayerList === expectedResponse && differenceList === lrfDataObject.differenceList ? expectedPlayerList : null;
            });

            const promise = PlayerMultipleQueryService._refetchFromLap(lapParam, lrfDataObject, commonService, apiInfo);

            return Promise.resolve(promise).then((result) => {
                expect(result.playerList).toBe(expectedPlayerList);
                expect(result.totalItem).toBe(1);

                PlayerListDataHelper.mergePlayerList = originalMergePlayerList;
            })
        })
    })
})