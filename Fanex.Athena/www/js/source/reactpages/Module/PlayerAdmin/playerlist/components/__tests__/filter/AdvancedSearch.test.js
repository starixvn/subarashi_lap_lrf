import React from 'react';
import { shallow } from 'enzyme';

import { AdvancedSearch } from '../../filter/AdvancedSearch';
import { JestEnvironment } from '@jest/environment';

describe('AdvancedSearch', () => {
    const defaultProps = {
        param: {
            currency: '',
            oddsGroup: '',
            specialLevel: '',
            baStatus: ''
        },
        onChange: jest.fn()
    }

    it('_createSelectData - return correct data list', () => {
        const originalList = [
            { Id: 'eur', Value: 'EUR', Status: true }, 
            { Id: 'usd', Value: 'usd', Status: true }
        ];
        const selectedItemString = 'eur';

        const expectedResult = [
            { Id: 'eur', Value: 'EUR', Status: true }, 
            { Id: 'usd', Value: 'usd', Status: false }
        ];

        const instance = new AdvancedSearch(defaultProps);

        const result = instance._createSelectData(originalList, selectedItemString);

        expect(result).toEqual(expectedResult);
    })

    it('handleChange - props.onChange should be called with correct parameter', () => {
        const name = 'currency';
        const selectedItemKey = 'usd,euro,vnd';
        const props = {...defaultProps};
        const instance = new AdvancedSearch(props);

        instance.handleChange(name, selectedItemKey);

        expect(props.onChange).toHaveBeenCalledWith(name, selectedItemKey);
    })
    
    describe('render', () => {
        it('with initial state - should match snapshot', () => {
            const wrapper = shallow(<AdvancedSearch {...defaultProps}/>);

            expect(wrapper).toMatchSnapshot();
        })
    })
})