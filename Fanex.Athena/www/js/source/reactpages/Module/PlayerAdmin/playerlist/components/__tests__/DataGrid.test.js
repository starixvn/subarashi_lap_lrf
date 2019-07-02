import React from 'react';
import { shallow } from 'enzyme';

import { DataGrid } from '../DataGrid';
import PlayerRow from '../grid/PlayerRow';
import GridHelper from '../../lib/gridHelper';

describe('DataGrid', () => {
    const defaultProps = {
        playerList: null,
        selectedPlayer: null,
        selectedPlayerIdList: [],
        displayedColumnList: [
            { key: 'Status', value: 'Status', show: true },
            { key: 'Username', value: 'Username', show: true },
            { key: 'SystemID', value: 'SystemID', show: true }
        ],
        currentActivePlayer: null,
        setSelectedPlayerIdList: jest.fn(),
        setPlayerList: jest.fn(),
        setCurrentActivePlayer: jest.fn()
    }

    let originalClientWidth;
    beforeEach(() => {
        originalClientWidth = Math.min(document.body.clientWidth, 1920);
    })

    it('constructor - initial state should be correct', () => {
        const instance = new DataGrid({ ...defaultProps });

        const expectedState = {
            isOpenContextMenu: false,
            contextMenuPosition: null,
            specialLevelDropdownPosition: null,
            oddsGroupDropdownPosition: null,
            statusDropdownPosition: null
        }

        expect(instance.state).toEqual(expectedState);
        expect(instance.maxWidth).toBe(originalClientWidth);
    })

    it('_buildDisplayedColumn - return correct data', () => {
        const instance = new DataGrid({ ...defaultProps });

        const expectedResult = {
            Status: true,
            Username: true,
            SystemID: true
        }

        const result = instance._buildDisplayedColumn();

        expect(result).toEqual(expectedResult);
    })

    it('_renderDataSection - row list should be correct', () => {
        const props = { ...defaultProps };
        const instance = new DataGrid({ ...props });
        const dataList = [
            { CustId: 1, userName: 'test1' },
            { CustId: 2, userName: 'test2' }
        ];

        const displayedColumn = {
            Status: true,
            Username: true,
            SystemID: true
        }

        const firstRowProps = {
            dataItem: dataList[0],
            isChecked: false,
            displayedColumn,
            handleChangeBaStatus: instance.handleChangeBaStatus,
            handleEnterContextMenu: instance.handleEnterContextMenu,
            handleLeaveContextMenu: instance.handleLeaveContextMenu,
            handleToggleOddsGroup: instance.handleToggleOddsGroup,
            handleToggleSpecialLevel: instance.handleToggleSpecialLevel,
            handleToggleStatus: instance.handleToggleStatus
        }
        const secondRowProps = {
            dataItem: dataList[1],
            isChecked: false,
            displayedColumn,
            handleChangeBaStatus: instance.handleChangeBaStatus,
            handleEnterContextMenu: instance.handleEnterContextMenu,
            handleLeaveContextMenu: instance.handleLeaveContextMenu,
            handleToggleOddsGroup: instance.handleToggleOddsGroup,
            handleToggleSpecialLevel: instance.handleToggleSpecialLevel,
            handleToggleStatus: instance.handleToggleStatus
        }
        const expectedResult = [
            <PlayerRow key={1} {...firstRowProps} />,
            <PlayerRow key={2} {...secondRowProps} />
        ];

        const result = instance._renderDataSection(dataList, displayedColumn);

        expect(result).toEqual(expectedResult);
    })

    describe('handleEnterContextMenu', () => {
        it('contextMenu is not opening - setState should be called with correct parameter', () => {
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

        it('contextMenu is opening - do nothing', () => {
            const instance = new DataGrid({ ...defaultProps });
            instance.state = {
                isOpenContextMenu: true
            };

            instance.setState = jest.fn();

            instance.handleEnterContextMenu({});

            expect(instance.setState).not.toHaveBeenCalled();
        })
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

    describe('_handlerToggleDropdownLabel', () => {
        it('currentPosition has value - should toggle to null', () => {
            const stateName = 'statusDropdownPosition';
            const instance = new DataGrid({ ...defaultProps });
            instance.state = {
                [stateName]: { x: 100, y: 130 }
            }

            const expectedParam = { [stateName]: null };
            instance.setState = jest.fn();

            instance._handlerToggleDropdownLabel({}, stateName);

            expect(instance.setState).toHaveBeenCalledWith(expectedParam);
        })

        it('currentPosition is null - should call setState with correct parameter', () => {
            const stateName = 'statusDropdownPosition';
            const instance = new DataGrid({ ...defaultProps });
            instance.state = {
                [stateName]: null
            }

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

            const expectedParam = {
                [stateName]: { x: 100, y: 70 }
            };
            instance.setState = jest.fn();

            instance._handlerToggleDropdownLabel(event, stateName);

            expect(instance.setState).toHaveBeenCalledWith(expectedParam);
        })
    })

    describe('handling toggle dropdown on grid', () => {
        const runTest = ({ methodName, expectedStateName }) => {
            it(`${methodName} - should call _handlerToggleDropdownLabel with correct parameter`, () => {
                const instance = new DataGrid({ ...defaultProps });
                const event = {};
                instance._handlerToggleDropdownLabel = jest.fn();

                instance[methodName](event);

                expect(instance._handlerToggleDropdownLabel).toHaveBeenCalledWith(event, expectedStateName);
            })
        }

        const testCaseList = [
            { methodName: 'handleToggleSpecialLevel', expectedStateName: 'specialLevelDropdownPosition' },
            { methodName: 'handleToggleOddsGroup', expectedStateName: 'oddsGroupDropdownPosition' },
            { methodName: 'handleToggleStatus', expectedStateName: 'statusDropdownPosition' }
        ]

        testCaseList.forEach(runTest);
    })

    it('handleChangeUpdatePlayerItem - should call action props.setPlayerList with correct parameter', () => {
        const props = {
            ...defaultProps,
            playerList: [
                { CustId: 1, UserName: 'test1', Currency: 'USD', BaStatus: true },
                { CustId: 2, UserName: 'test2', Currency: 'USD', BaStatus: true }
            ],
            setPlayerList: jest.fn()
        }
        const instance = new DataGrid({ ...props });
        const custId = 1;
        const value = false;
        const fieldName = 'BaStatus';

        const expectedPlayerList = [
            { CustId: 1, UserName: 'test1', Currency: 'USD', BaStatus: false },
            { CustId: 2, UserName: 'test2', Currency: 'USD', BaStatus: true }
        ]

        instance.handleChangeUpdatePlayerItem(custId, value, fieldName);

        expect(props.setPlayerList).toHaveBeenCalledWith(expectedPlayerList);
    })

    it('handleChangeBaStatus - should call handleChangeUpdatePlayerItem with correct parameter', () => {
        const instance = new DataGrid({ ...defaultProps });
        instance.handleChangeUpdatePlayerItem = jest.fn();
        const custId = 1;
        const value = false;

        instance.handleChangeBaStatus(custId, value);

        expect(instance.handleChangeUpdatePlayerItem).toHaveBeenCalledWith(custId, value, 'BaStatus');
    })

    describe('_handleChangeDropdownValue', () => {
        const value = 'Closed';
        const fieldName = 'Status';
        it('currentActivePlayer has value - handleChangeUpdatePlayerItem and onChangeSuccess should be called', () => {
            const custId = 1;
            const props = {
                ...defaultProps,
                currentActivePlayer: { custId }
            }
            const instance = new DataGrid({ ...props });
            instance.handleChangeUpdatePlayerItem = jest.fn();
            const event = {
                preventDefault: () => { }
            }

            const onChangeSuccess = jest.fn();

            instance._handleChangeDropdownValue(event, value, fieldName, onChangeSuccess);

            expect(instance.handleChangeUpdatePlayerItem).toHaveBeenCalledWith(custId, value, fieldName);
            expect(onChangeSuccess).toHaveBeenCalled();
        })

        it('currentActivePlayer has no value - do nothing', () => {
            const props = {
                ...defaultProps,
                currentActivePlayer: null
            }
            const instance = new DataGrid({ ...props });
            instance.handleChangeUpdatePlayerItem = jest.fn();

            const event = {
                preventDefault: () => { }
            }
            instance._handleChangeDropdownValue(event, value, fieldName, null);

            expect(instance.handleChangeUpdatePlayerItem).not.toHaveBeenCalled();
        })
    })

    describe('handling Change dropdown values on grid', () => {
        const runTest = ({ methodName, expectedValue, expectedFieldName, callbackName }) => {
            it(`${methodName} - should call _handleChangeDropdownValue with correct parameter`, () => {
                const instance = new DataGrid({ ...defaultProps });
                const event = {};
                instance._handleChangeDropdownValue = jest.fn();
                const onChangeSuccess = instance[callbackName];

                instance[methodName](event, expectedValue);

                expect(instance._handleChangeDropdownValue).toHaveBeenCalledWith(event, expectedValue, expectedFieldName, onChangeSuccess);
            })
        }

        const testCaseList = [
            { methodName: 'handleChangeOddsGroup', expectedValue: 'A', expectedFieldName: 'OddsGroup', callbackName: 'handleToggleOddsGroup' },
            { methodName: 'handleChangeSpecialLevel', expectedValue: '1', expectedFieldName: 'SpecialLevel', callbackName: 'handleToggleSpecialLevel' },
            { methodName: 'handleChangeStatus', expectedValue: 'Archive', expectedFieldName: 'Status', callbackName: 'handleToggleStatus' }
        ]

        testCaseList.forEach(runTest);
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
            GridHelper.renderHeader = jest.fn(() => 'Header');
            instance._buildDisplayedColumn = jest.fn(() => 'DisplayedColumn');

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
            GridHelper.renderHeader = jest.fn(() => 'Header');
            instance._buildDisplayedColumn = jest.fn(() => 'DisplayedColumn');

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