import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import { FormFilter } from '../FormFilter';

describe('FormFilter', () => {
    const defaultProps = {
        setSelectedPlayer: jest.fn(),
        searchPlayer: jest.fn()
    }

    it('constructor initial state should be correct', () => {
        const instance = new FormFilter({ ...defaultProps });
        const expectedState = {
            userName: '',
            isShowAdvancedSearch: false
        }

        const result = instance.state;

        expect(result).toEqual(expectedState);
    })

    it('handleSubmit - setSelectedPlayer and searchPlayer should be called with correct parameter', () => {
        const props = { ...defaultProps };
        const instance = new FormFilter(props);
        instance.state = {
            userName: 'test'
        }
        const event = {
            preventDefault: jest.fn()
        }

        instance.handleSubmit(event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(props.setSelectedPlayer).toHaveBeenCalledWith(null);
        expect(props.searchPlayer).toHaveBeenCalledWith({ userName: 'test' });
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

    describe('render', () => {
        it('isShowAdvancedSearch = false - should match snapshot without AdvancedSearch', () => {
            const renderer = new ShallowRenderer();
            const result = renderer.render(<FormFilter {...defaultProps} />);
    
            expect(result).toMatchSnapshot();
        })

        it('isShowAdvancedSearch = true - should match snapshot with AdvancedSearch', () => {
            const wrapper = shallow(<FormFilter { ...defaultProps } />);
            wrapper.setState({
                userName: 'test',
                isShowAdvancedSearch: true
            });
             
            expect(wrapper).toMatchSnapshot();
        })
    })
})