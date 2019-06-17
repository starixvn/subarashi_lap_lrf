import React from 'react';
import { shallow } from 'enzyme';

import { PlayerDetail } from '../PlayerDetail';

describe('PlayerDetail', () => {
    const defaultProps = {
        selectedPlayer: null,
        getLink: jest.fn(),
        getTabList: jest.fn()
    }

    it('constructor - initial state should be correct', () => {
        const expectedTabList = [{ Action: 'test1/index', SystemType: 0 }, { Action: 'test2/index', SystemType: 1 }];
        const props = {
            ...defaultProps,
            getTabList: jest.fn(() => [...expectedTabList])
        }

        const instance = new PlayerDetail(props);
        const expectedState = {
            selectedTabIndex: 0,
            targetUrl: ''
        }

        expect(instance.state).toEqual(expectedState);
        expect(instance._tabList).toEqual(expectedTabList);
    })

    it('handleClickMenu - setState should be called with correct parameters', () => {
        const instance = new PlayerDetail({ ...defaultProps });
        const event = {
            preventDefault: () => { }
        }

        instance.setState = jest.fn();
        const actionLink = 'test1/index';
        const tabIndex = 1;
        const expectedParam = {
            targetUrl: actionLink,
            selectedTabIndex: tabIndex
        }

        instance.handleClickMenu(event, actionLink, tabIndex);

        expect(instance.setState).toHaveBeenCalledWith(expectedParam);
    })

    it('_buildActionUrl - props.getLink should be called with correct parameters', () => {
        const runTest = (action, expectedUrl) => {
            const props = {
                ...defaultProps,
                selectedPlayer: {
                    custId: 1
                },
                getLink: jest.fn()
            }

            const instance = new PlayerDetail(props);
            const systemType = 1;

            instance._buildActionUrl(systemType, action);

            expect(props.getLink).toHaveBeenCalledWith(systemType, expectedUrl);
        }

        runTest('test/index', 'test/index?custId=1');
        runTest('test/index?param1=value1', 'test/index?param1=value1&custId=1');
    })

    it('_renderTabList - should match snapshot', () => {
        const instance = new PlayerDetail({ ...defaultProps });
        const tabList = [
            { SystemType: 0, Action: 'test1/action1', Name: 'test1', Text: 'Test 1' },
            { SystemType: 1, Action: 'test1/action2', Name: 'test2', Text: 'Test 2' },
            { SystemType: 0, Action: 'test2/action2', Name: 'test3', Text: 'Test 3' }
        ]
        instance._buildActionUrl = jest.fn((systemType, action) => {
            return `${action}?systemType=${systemType}`;
        })

        const tabListContent = instance._renderTabList(tabList);
        const wrapper = shallow(<div>{tabListContent}</div>);

        expect(wrapper).toMatchSnapshot();
    })

    describe('render', () => {
        it('selectedPlayer is null - return null', () => {
            const instance = new PlayerDetail({ ...defaultProps });

            const result = instance.render();

            expect(result).toBeNull();
        })

        it('tabList is empty - return null', () => {
            const props = {
                ...defaultProps,
                selectedPlayer: {},
                getTabList: jest.fn(() => [])
            }
            const instance = new PlayerDetail(props);

            const result = instance.render();

            expect(result).toBeNull();
        })

        it('with initial state - should match snapshot', () => {
            const expectedTabList = [{ Action: 'test1/index', SystemType: 0 }, { Action: 'test2/index', SystemType: 1 }];
            const props = {
                ...defaultProps,
                selectedPlayer: {},
                getTabList: jest.fn(() => [...expectedTabList])
            }

            const instance = new PlayerDetail(props);
            instance._buildActionUrl = jest.fn((systemType, action) => {
                return `${action}?systemType=${systemType}`;
            })

            instance._renderTabList = jest.fn(() => 'This is tab list');

            const renderedContent = instance.render();
            const wrapper = shallow(<div className="wrapper">{renderedContent}</div>);

            expect(wrapper).toMatchSnapshot();
        })

        it('targetUrl has value - _buildActionUrl should not be called - match snapshot', () => {
            const expectedTabList = [{ Action: 'test1/index', SystemType: 0 }, { Action: 'test2/index', SystemType: 1 }];
            const props = {
                ...defaultProps,
                selectedPlayer: {},
                getTabList: jest.fn(() => [...expectedTabList])
            }

            const instance = new PlayerDetail(props);
            instance.state = {
                targetUrl: 'test/action'
            }
            instance._buildActionUrl = jest.fn();

            instance._renderTabList = jest.fn(() => 'This is tab list');

            const renderedContent = instance.render();
            const wrapper = shallow(<div className="wrapper">{renderedContent}</div>);

            expect(instance._buildActionUrl).not.toHaveBeenCalled();
            expect(wrapper).toMatchSnapshot();
        })
    })
})