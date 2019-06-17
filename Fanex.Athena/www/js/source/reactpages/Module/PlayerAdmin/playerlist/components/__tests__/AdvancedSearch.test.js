import React from 'react';
import { shallow } from 'enzyme';

import { AdvancedSearch } from '../AdvancedSearch';

describe('AdvancedSearch', () => {
    describe('render', () => {
        it('with initial state - should match snapshot', () => {
            const wrapper = shallow(<AdvancedSearch />);

            expect(wrapper).toMatchSnapshot();
        })
    })
})