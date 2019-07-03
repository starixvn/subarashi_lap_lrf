import React from 'react';
import { shallow } from 'enzyme';

import { PlayerRow } from '../../grid/PlayerRow';
import { StatusCell } from '../../grid/StatusCell';
import { OddsGroupCell } from '../../grid/OddsGroupCell';
import { SpecialLevelCell } from '../../grid/SpecialLevelCell';
import Switcher from '@jsroot/components/Switcher';

describe('PlayerRow', () => {
    const dataItem = {
        CustId: 1,
        Status: 'online',
        UserName: 'test1',
        RealName: 'test1 real',
        SystemId: 'abc',
        Currency: 'USD',
        CurrentBalance: 100,
        OutstandingBalance: '200',
        OddsGroup: 'A',
        BaStatus: true,
        SpecialLevel: 1,
        LastLoginIp: '1.1.1.',
        LastTransaction: '06/14/2019',
        Email: 'abc@yahoo.com',
        IsOnline: true
    };

    const displayedColumn = {
        CustId: true,
        Status: true,
        Username: true,
        SystemID: true,
        RealName: true,
        Currency: true,
        CurrentBalance: true,
        OutstandingBalance: true,
        OddsGroup: true,
        BAStatus: true,
        SpecialLevel: true,
        LastLoginIp: false,
        LastTransaction: false,
        Email: false
    }

    const defaultProps = {
        dataItem,
        displayedColumn,
        handleChangeBaStatus: jest.fn(),
        handleEnterContextMenu: jest.fn(),
        handleLeaveContextMenu: jest.fn(),
        handleToggleOddsGroup: jest.fn(),
        handleToggleSpecialLevel: jest.fn(),
        setCurrentActivePlayer: jest.fn(),
        handleToggleStatus: jest.fn()
    }

    it('render - match snapshot', () => {
        const props = {
            ...defaultProps
        }

        const wrapper = shallow(<PlayerRow {...props} />);

        expect(wrapper).toMatchSnapshot();
    })

    it('BA column - onChange - should call props.handleChangeBaStatus with correct parameter', () => {
        const props = { ...defaultProps };

        const wrapper = shallow(<PlayerRow {...props} />);
        const switcher = wrapper.find(Switcher).get(0);
        const event = {
            target: {
                checked: true
            }
        }

        switcher.props.onChange(event);

        expect(props.handleChangeBaStatus).toHaveBeenCalledWith(dataItem.CustId, true);
    })

    it('status column - handleToggleStatus - handleToggleStatus and setCurrentActivePlayer should be called with correct parameter', () => {
        const props = {
            ...defaultProps,
            handleToggleStatus: jest.fn(),
            setCurrentActivePlayer: jest.fn()
        };

        const wrapper = shallow(<PlayerRow {...props} />);
        const statusCell = wrapper.find(StatusCell).get(0);

        const event = {};
        statusCell.props.handleToggleStatus(event);

        expect(props.handleToggleStatus).toHaveBeenCalledWith(event);
        expect(props.setCurrentActivePlayer).toHaveBeenCalledWith({ custId: dataItem.CustId });
    })

    it('oddsgroup column - handleToggleOddsGroup - handleToggleOddsGroup and setCurrentActivePlayer should be called with correct parameter', () => {
        const props = {
            ...defaultProps,
            handleToggleOddsGroup: jest.fn(),
            setCurrentActivePlayer: jest.fn()
        };

        const wrapper = shallow(<PlayerRow {...props} />);
        const oddsGroupCell = wrapper.find(OddsGroupCell).get(0);

        const event = {};
        oddsGroupCell.props.handleToggleOddsGroup(event);

        expect(props.handleToggleOddsGroup).toHaveBeenCalledWith(event);
        expect(props.setCurrentActivePlayer).toHaveBeenCalledWith({ custId: dataItem.CustId });
    })

    it('special level column - handleToggleSpecialLevel - handleToggleSpecialLevel and setCurrentActivePlayer should be called with correct parameter', () => {
        const props = {
            ...defaultProps,
            handleToggleSpecialLevel: jest.fn(),
            setCurrentActivePlayer: jest.fn()
        };

        const wrapper = shallow(<PlayerRow {...props} />);
        const specialLevelCell = wrapper.find(SpecialLevelCell).get(0);

        const event = {};
        specialLevelCell.props.handleToggleSpecialLevel(event);

        expect(props.handleToggleSpecialLevel).toHaveBeenCalledWith(event);
        expect(props.setCurrentActivePlayer).toHaveBeenCalledWith({ custId: dataItem.CustId });
    })
})