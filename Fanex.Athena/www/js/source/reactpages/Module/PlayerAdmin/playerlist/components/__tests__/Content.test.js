import React from 'react';
import { shallow } from 'enzyme';
import { Content } from '../Content';

describe('Content', () => {
    const defaultProps = {
        playerList: null
    }

    describe('render', () => {
        it('playerList is null - return null', () => {
            const wrapper = shallow(<Content {...defaultProps} />);

            expect(wrapper).toMatchSnapshot();
        })

        it('playerList is not null - should match snapshot', () => {
            const props = {...defaultProps, playerList: ['Item 1', 'Item 2']}
            const wrapper = shallow(<Content {...props} />);

            expect(wrapper).toMatchSnapshot();
        })
    })
})