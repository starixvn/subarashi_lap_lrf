import React from 'react';
import { shallow } from 'enzyme';
import { OddsGroupDropdown } from '../../grid/OddsGroupDropdown';
import { DropdownItem } from '@jsroot/components/dropdown';

describe('OddsGroupDropdown', () => {
    const defaultProps = {
        position: null,
        onClose: jest.fn(),
        onChange: jest.fn()
    }

    describe('render', () => {
        const runTest = (position) => {
            const isOpen = !!position;
            const spec = `isOpen: ${isOpen} - should match snapshot`;
            it(spec, () => {
                const props = {
                    ...defaultProps,
                    position
                }
                const wrapper = shallow(<OddsGroupDropdown {...props} />);

                expect(wrapper).toMatchSnapshot();
            })
        }

        [null, { x: 10, y: 50 }].forEach(runTest);
    })

    it('click on menu item - props.onChange should be called with correct parameter', () => {
        const props = {
            ...defaultProps,
            position: { x: 10, y: 5 },
            onChange: jest.fn()
        }
        const wrapper = shallow(<OddsGroupDropdown {...props} />);
        const dropdownItem = wrapper.find(DropdownItem).get(0);

        const event = {};
        dropdownItem.props.onClick(event);

        expect(props.onChange).toHaveBeenCalledWith(event, 'A');
    })
})