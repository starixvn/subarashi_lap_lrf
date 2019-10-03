import React from 'react';
import { shallow } from 'enzyme';
import { FormFilter } from '../FormFilter';
import { searchOptions, defaultPagingOption } from '../../lib/constants';
import LangHelper from '@jsroot/lib/langHelper';

describe('FormFilter', () => {
    const defaultProps = {
        pagingOption: { ...defaultPagingOption },
        setSelectedPlayer: jest.fn(),
        searchPlayer: jest.fn()
    }

    it('constructor initial state should be correct', () => {
        const instance = new FormFilter({ ...defaultProps });
        const expectedState = {
            userName: '',
            bankAccountNumber: '',
            email: '',
            currency: '',
            oddsGroup: '',
            specialLevel: '',
            baStatus: '',
            searchOption: searchOptions.matchCase
        }

        const result = instance.state;

        expect(result).toEqual(expectedState);
    })

    it('handleSubmit - setSelectedPlayer and searchPlayer should be called with correct parameter', () => {
        const props = { ...defaultProps };
        const instance = new FormFilter(props);
        const currentState = {
            userName: 'test',
            bankAccountNumber: '1234',
            email: 'aaabbbbccc@yahoo.com',
            currency: 'USD',
            oddsGroup: 'A',
            specialLevel: '2',
            baStatus: '1',
            searchOption: searchOptions.matchCase
        }

        instance.state = {...currentState};

        const expectedState = {
            ...currentState,
            pageSize: props.pagingOption.PageSize, 
            pageIndex: props.pagingOption.PageIndex
        }
        const event = {
            preventDefault: jest.fn()
        }

        instance.handleSubmit(event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(props.setSelectedPlayer).toHaveBeenCalledWith(null);
        expect(props.searchPlayer).toHaveBeenCalledWith(expectedState);
    })

    it('handleChange - setState should be called with correct parameter', () => {
        const instance = new FormFilter({ ...defaultProps });
        const event = {
            target: {
                name: 'userName',
                value: 'test1'
            }
        }

        instance.setState = jest.fn();
        const expectedStateParam = {
            userName: 'test1'
        }

        instance.handleChange(event);

        expect(instance.setState).toHaveBeenCalledWith(expectedStateParam);
    })

    it('handleAdvancedSearchChange - setState should be called with correct parameter', () => {
        const instance = new FormFilter({ ...defaultProps });
        instance.setState = jest.fn();
        const fieldName = 'currency';
        const value = 'EUR';
        const expectedState = {
            [fieldName]: value
        }

        instance.handleAdvancedSearchChange(fieldName, value);

        expect(instance.setState).toHaveBeenCalledWith(expectedState);
    })

    it('_renderUserGuide - should match snapshot', () => {
        LangHelper.getSingleResource = jest.fn((name) => name);
        const instance = new FormFilter({ ...defaultProps });
        const userGuide = instance._renderUserGuide();

        const result = shallow(<div>{userGuide}</div>);

        expect(result).toMatchSnapshot();
    })

    describe('render', () => {
        it('isShowAdvancedSearch = false - should match snapshot without AdvancedSearch', () => {
            const result = shallow(<FormFilter {...defaultProps} />);

            expect(result).toMatchSnapshot();
        })

        it('isShowAdvancedSearch = true - should match snapshot with AdvancedSearch', () => {
            const wrapper = shallow(<FormFilter {...defaultProps} />);
            wrapper.setState({
                userName: 'test',
                isShowAdvancedSearch: true
            });

            expect(wrapper).toMatchSnapshot();
        })
    })
})