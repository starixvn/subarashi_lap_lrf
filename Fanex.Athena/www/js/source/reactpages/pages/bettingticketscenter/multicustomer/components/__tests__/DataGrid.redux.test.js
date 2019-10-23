jest.mock('react-redux')
jest.mock('redux')
import { connect } from 'react-redux'

describe('connect ', () => {
    let mapStateToProps;
    const connectMock = jest.fn();

    beforeAll(() => {
        connect.mockImplementationOnce(mapStateToPropsFunc => {
            mapStateToProps = mapStateToPropsFunc;
            return connectMock;
        });
        require('../DataGrid').default;
    });

    it('props should be mapped correctly', () => {
        const expectedResult = {
            requestParam: '123',
        }

        const state = {
            requestParam: '123',
            gridData: [1,2,3],
            reportTitle: 'Test',
            anotherProp: 'not included'
        }

        const result = mapStateToProps(state);

        expect(result).toEqual(expectedResult);
    })

    it('returned function of connect should be called with correct parameter', () => {
        const DataGrid = require('../DataGrid').DataGrid;

        expect(connectMock).toHaveBeenCalledWith(DataGrid);
    })
})