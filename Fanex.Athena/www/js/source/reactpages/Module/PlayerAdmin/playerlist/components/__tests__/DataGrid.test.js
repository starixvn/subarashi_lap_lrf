import React from 'react';
import { shallow } from 'enzyme';

import { DataGrid } from '../DataGrid';
import { specialLevelListWithColor, oddsGroupListWithStyle } from '../../lib/constants';

describe('DataGrid', () => {
    const defaultProps = {
        playerList: null,
        selectedPlayer: null,
        selectedPlayerIdList: [],
        setSelectedPlayer: undefined,
        setSelectedPlayerIdList: undefined
    }

    const specialLevelList = Object.keys(specialLevelListWithColor).map(item => {
        return {
            value: item,
            label: item === '0' ? 'None' : item
        }
    })

    let originalClientWidth;
    beforeEach(() => {
        originalClientWidth = Math.min(document.body.clientWidth, 1920);
    })

    it('constructor - initial state should be correct', () => {
        const instance = new DataGrid({ ...defaultProps });

        const expectedState = {
            contextMenuPosition: null,
            isOpenContextMenu: false
        }

        expect(instance.state).toEqual(expectedState);
        expect(instance.specialLevelList).toEqual(specialLevelList);
        expect(instance.maxWidth).toBe(originalClientWidth);
    })

    it('_renderHeader - should match snapshot', () => {
        const instance = new DataGrid({ ...defaultProps });
        const header = instance._renderHeader();

        const wrapper = shallow(<div>{header}</div>).getElement();

        expect(wrapper).toMatchSnapshot();
    })

    it('_renderDataSection - should return expected value', () => {
        const props = { ...defaultProps, selectedPlayerIdList: [1] };
        const instance = new DataGrid({ ...props });
        const dataList = [
            { CustId: 1, userName: 'test1' },
            { CustId: 2, userName: 'test2' }
        ];

        instance._buildDataRow = jest.fn((dataItem, isChecked) => {
            return {
                ...dataItem,
                isChecked
            }
        });

        const expectedResult = [
            { CustId: 1, userName: 'test1', isChecked: true },
            { CustId: 2, userName: 'test2', isChecked: false }
        ];

        const result = instance._renderDataSection(dataList);

        expect(result).toEqual(expectedResult);
    })

    it('_handleSelectPlayer - this.props.setSelectedPlayer should be called with correct parameter', () => {
        const props = { ...defaultProps, setSelectedPlayer: jest.fn() };
        const instance = new DataGrid({ ...props });
        const event = {
            preventDefault: () => { }
        }

        const playerInfo = {
            CustId: 1,
            UserName: 'test1',
            Currency: 'USD'
        }

        const expectedParam = {
            custId: playerInfo.CustId,
            userName: playerInfo.UserName,
            currency: playerInfo.Currency
        };

        instance._handleSelectPlayer(event, playerInfo);

        expect(props.setSelectedPlayer).toHaveBeenCalledWith(expectedParam);
    })

    it('handleEnterContextMenu - contextMenu is not opening - setState should be called with correct parameter', () => {
        const instance = new DataGrid({ ...defaultProps });
        instance.state = {
            isOpenContextMenu: false
        };

        const event = {
            target: {
                getBoundingClientRect: () => {
                    return {
                        left: 100,
                        top: 50
                    }
                }
            }
        }

        instance.setState = jest.fn();
        const expectedState = {
            contextMenuPosition: { x: 100, y: 50 },
            isOpenContextMenu: true
        }

        instance.handleEnterContextMenu(event);

        expect(instance.setState).toHaveBeenCalledWith(expectedState);
    })

    it('handleEnterContextMenu - contextMenu is opening - do nothing', () => {
        const instance = new DataGrid({ ...defaultProps });
        instance.state = {
            isOpenContextMenu: true
        };

        instance.setState = jest.fn();

        instance.handleEnterContextMenu({});

        expect(instance.setState).not.toHaveBeenCalled();
    })

    it('handleLeaveContextMenu - contextMenu is opening - close contextMenu by setting state', () => {
        jest.useFakeTimers();
        const instance = new DataGrid({ ...defaultProps });
        instance.state = {
            isOpenContextMenu: true
        };

        instance.setState = jest.fn();
        const expectedState = {
            isOpenContextMenu: false
        }
        let callback;
        let wait;
        window.setTimeout = jest.fn((cb, waitingTime) => {
            callback = cb;
            wait = waitingTime;
        })

        instance.handleLeaveContextMenu({});
        callback();

        expect(window.setTimeout).toHaveBeenCalledWith(callback, wait);
        expect(instance.setState).toHaveBeenCalledWith(expectedState);
    })

    it('_buildUserNameCell - should match snapshot', () => {
        const instance = new DataGrid({ ...defaultProps });
        const dataItem = {
            UserName: 'test1'
        }
        const userNameCell = instance._buildUserNameCell(dataItem);

        const wrapper = shallow(<div>{userNameCell}</div>).getElement();

        expect(wrapper).toMatchSnapshot();
    })

    it('_buildOddsGroupCell - should match snapshot', () => {
        const instance = new DataGrid({ ...defaultProps });
        const selectedOddsGroup = 'B';
        const oddsGroupCell = instance._buildOddsGroupCell(selectedOddsGroup);

        const wrapper = shallow(<div>{oddsGroupCell}</div>).getElement();

        expect(wrapper).toMatchSnapshot();
    })

    it('_buildSpecialLevelCell - should match snapshot', () => {
        const instance = new DataGrid({ ...defaultProps });
        const selectedSpecialLevel = 1;
        const specialLevelCell = instance._buildSpecialLevelCell(selectedSpecialLevel);

        const wrapper = shallow(<div>{specialLevelCell}</div>).getElement();

        expect(wrapper).toMatchSnapshot();
    })

    it('_buildDataRow - should match snapshot', () => {
        const instance = new DataGrid({ ...defaultProps });
        const dataItem = {
            CustId: 1,
            Status: 'online',
            SystemId: 'abc',
            Currency: 'USD',
            CurrentBalance: 100,
            OutstandingBalance: '200',
            OddsGroup: 'A',
            BaStatus: true,
            SpecialLevel: 1,
            LastTransaction: '06/14/2019',
            Email: 'abc@yahoo.com'
        };
        instance._buildUserNameCell = jest.fn(() => 'UserNameCell');
        instance._buildOddsGroupCell = jest.fn(() => 'OddsGroupCell');
        instance._buildSpecialLevelCell = jest.fn(() => 'SpecialLevelCell');

        const dataRow = instance._buildDataRow(dataItem, true);

        const wrapper = shallow(<div>{dataRow}</div>).getElement();

        expect(wrapper).toMatchSnapshot();
    })

    describe('render', () => {
        const renderProps = {
            ...defaultProps,
            playerList: [
                { CustId: 1, UserName: 'test1', Currency: 'USD' },
                { CustId: 2, UserName: 'test2', Currency: 'USD' }
            ],
            selectedPlayerIdList: []
        };

        it('selectedPlayer has value - should render only one row', () => {
            const props = {
                ...renderProps,
                selectedPlayer: {
                    custId: 1,
                    userName: 'test1',
                    currency: 'USD'
                }
            };

            const instance = new DataGrid(props);
            instance._renderHeader = jest.fn(() => 'Header');

            let dataList;
            instance._renderDataSection = jest.fn((data) => {
                dataList = data;
                return 'Data List';
            });

            const renderedResult = instance.render();
            const wrapper = shallow(<div>{renderedResult}</div>).getElement();

            expect(dataList.length).toBe(1);
            expect(wrapper).toMatchSnapshot();
        })

        it('selectedPlayer has no value - should render all items in dataList', () => {
            const props = {
                ...renderProps
            };

            const instance = new DataGrid(props);
            instance._renderHeader = jest.fn(() => 'Header');

            let dataList;
            instance._renderDataSection = jest.fn((data) => {
                dataList = data;
                return 'Data List';
            });

            const renderedResult = instance.render();
            const wrapper = shallow(<div>{renderedResult}</div>).getElement();

            expect(dataList).toEqual(renderProps.playerList);
            expect(wrapper).toMatchSnapshot();
        })
    })
})