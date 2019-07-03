import React from 'react';
import { shallow } from 'enzyme';
import { UserNameCell } from '../../grid/UserNameCell';

describe('UserNameCell', () => {
    const defaultProps = {
        dataItem: {
            CustId: 1,
            UserName: 'test',
            Currency: 'USD'
        },
        setSelectedPlayer: jest.fn(),
        handleEnterContextMenu: jest.fn(),
        handleLeaveContextMenu: jest.fn(),
        setCurrentActivePlayer: jest.fn()
    }

    it('should match snapshot', () => {
        const wrapper = shallow(<UserNameCell {...defaultProps} />);

        expect(wrapper).toMatchSnapshot();
    })

    it('click username link - setSelectedPlayer should be called with correct parameter', () => {
        const props = {
            ...defaultProps,
            setSelectedPlayer: jest.fn()
        }
        const wrapper = shallow(<UserNameCell {...props} />);
        const expectedParam = {
            custId: props.dataItem.CustId,
            userName: props.dataItem.UserName,
            currency: props.dataItem.Currency
        }

        wrapper.find('.username-link').simulate('click', { preventDefault: jest.fn() });

        expect(props.setSelectedPlayer).toHaveBeenCalledWith(expectedParam);
    })

    it('onMouseEnter event with menu icon - setCurrentActivePlayer should be called with correct parameter', () => {
        const props = {
            ...defaultProps,
            setCurrentActivePlayer: jest.fn()
        }
        const wrapper = shallow(<UserNameCell {...props} />);
        const expectedParam = {
            custId: props.dataItem.CustId,
            userName: props.dataItem.UserName,
            currency: props.dataItem.Currency
        }

        wrapper.find('.cell-menu').simulate('mouseenter', { preventDefault: jest.fn() });

        expect(props.setCurrentActivePlayer).toHaveBeenCalledWith(expectedParam);
    })

    it('onMouseLeave event with menu icon - handleLeaveContextMenu should be called', () => {
        const props = {
            ...defaultProps,
            handleLeaveContextMenu: jest.fn()
        }
        const wrapper = shallow(<UserNameCell {...props} />);

        wrapper.find('.cell-menu').simulate('mouseleave');

        expect(props.handleLeaveContextMenu).toHaveBeenCalled();
    })
})