import React from 'react';
import { shallow, mount } from 'enzyme';
import BatchUpdateButton from '../BatchUpdateButton';

describe('BatchUpdateButton', () => {
    describe('render', () => {
        it('render correctly with default state', () => {
            const wrapper = shallow(<BatchUpdateButton / >);

            expect(wrapper).toMatchSnapshot();
        })

        it('render correctly when toggle isOpen', () => {
            const wrapper = shallow(<BatchUpdateButton / >);

            const props = wrapper.props();
            props.onToggle();
            wrapper.update();

            expect(wrapper).toMatchSnapshot();
            
            props.onClose();
            wrapper.update();
            expect(wrapper).toMatchSnapshot();
        })
    })
})