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
})