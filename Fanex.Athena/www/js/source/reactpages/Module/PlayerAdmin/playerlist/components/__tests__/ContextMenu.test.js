import React from 'react';
import { shallow } from 'enzyme';

import ContextMenu from '../ContextMenu';

describe('ContextMenu', () => {
    const defaultProps = {
        position: null,
        isOpenContextMenu: false
    }

    it('with default props and inital state - should match snapshot', () => {
        const wrapper = shallow(<ContextMenu {...defaultProps} />);

        expect(wrapper).toMatchSnapshot();
    })

    it('onMouseEnter - isOpen should be true', () => {
        const wrapper = shallow(<ContextMenu {...defaultProps} />);

        const props = wrapper.props();
        props.onMouseEnter();

        expect(wrapper).toMatchSnapshot();
    })

    it('onMouseLeave - isOpen should rely on props.isOpenContextMenu', () => {
        const runTest = (initialProps) => {
            const wrapper = shallow(<ContextMenu {...initialProps} />);

            const props = wrapper.props();
            props.onMouseLeave();

            expect(wrapper).toMatchSnapshot();
        }

        const testCaseList = [{
            position: null,
            isOpenContextMenu: true
        }, {
            position: null,
            isOpenContextMenu: false
        }];

        testCaseList.forEach(item => {
            runTest(item);  
        })
    })
})