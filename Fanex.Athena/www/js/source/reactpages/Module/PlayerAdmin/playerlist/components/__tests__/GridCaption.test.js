import React from 'react';
import { shallow } from 'enzyme';

import { columnList } from '../../lib/constants';
import { GridCaption } from '../GridCaption';

describe('GridCaption', () => {
    const defaultProps = {
        playerList: null,
        selectedPlayer: null,
        selectedPlayerIdList: []
    };

    it('constructor - initial columnList should has correct data', () => {
        const instance = new GridCaption({ ...defaultProps });
        const expectedColumnList = columnList.map(item => {
            return {
                id: item,
                value: item,
                status: true
            }
        })

        expect(instance.columnList).toEqual(expectedColumnList);
    })

    it('_buildDropdownColumn - should match snapshot', () => {
        const instance = new GridCaption({ ...defaultProps });
        const dropdownColumn = instance._buildDropdownColumn();

        const wrapper = shallow(<div>{dropdownColumn}</div>);

        expect(wrapper).toMatchSnapshot();
    })

    describe('_buildLeftPart', () => {
        const runTest = ({ desciption, props }) => {
            it(desciption, () => {
                const instance = new GridCaption({ ...props });
                const leftPart = instance._buildLeftPart();

                const wrapper = shallow(<div>{leftPart}</div>);

                expect(wrapper.getElement()).toMatchSnapshot();
            })
        }

        const testCaseList = [
            {
                desciption: 'selectedPlayer is not null - should render correct breadcrumb information',
                props: {
                    ...defaultProps,
                    selectedPlayer: {
                        userName: 'test',
                        currency: 'USD'
                    }
                }
            },
            {
                desciption: 'selectedPlayer is null and selectedPlayerIdList has value - should render buttons for batch update',
                props: {
                    ...defaultProps,
                    selectedPlayerIdList: [1, 2]
                }
            },
            {
                desciption: 'have not selected any item yet - should render player count information',
                props: {
                    ...defaultProps,
                    playerList: [{}, {}, {}]
                }
            }
        ]

        testCaseList.forEach(runTest);
    })

    it('_buildRightPart - should render correctly with dropdown column and excel icon', () => {
        const instance = new GridCaption({ ...defaultProps });
        instance._buildDropdownColumn = jest.fn(() => 'Dropdown Column List');
        const rightPart = instance._buildRightPart();
        const wrapper = shallow(<div>{rightPart}</div>);

        expect(wrapper).toMatchSnapshot();
    })

    it('render - should match snapshot', () => {
        const instance = new GridCaption({ ...defaultProps });
        instance._buildLeftPart = jest.fn(() => "Left Part");
        instance._buildRightPart = jest.fn(() => "Right Part");

        const wrapper = shallow(<div>{instance.render()}</div>);

        expect(wrapper).toMatchSnapshot();
    })
})