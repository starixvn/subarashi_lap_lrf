import React from 'react';
import { shallow } from 'enzyme';
import { OddsGroupCell } from '../../grid/OddsGroupCell';

describe('OddsGroupCell', () => {
    const defaultProps = {
        value: '2', 
        handleToggleOddsGroup: jest.fn()
    }

    it('should match snapshot', () => {
        const wrapper = shallow(<OddsGroupCell {...defaultProps} />);

        expect(wrapper).toMatchSnapshot();
    })
})