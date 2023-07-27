import React, { useState } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import { DropdownButton, DropdownItem } from '@jsroot/components/dropdown';
import { SearchingDateRangeOptions } from '../lib/constants'

const SearchingDateRangeOption = (props) => {
    const { value, onChange } = props;
    const [isOpen, setIsOpen] = useState(false);
    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const toggleButton = {
        className: 'toggle-outline toggle-outline-light'
    }

    const selectedValue = value || SearchingDateRangeOptions.AllDate;

    return (
        <DropdownButton className="search-option" isOpen={isOpen} toggleButton={toggleButton}
            onToggle={handleToggleDropdown}
            buttonLabel={(<i className="material-icons">settings</i>)}
            onClose={handleClose}>
            <DropdownItem tag="div">
                <label className="selection-item">
                    <input type="radio" name="searchOption" value={SearchingDateRangeOptions.AllDate}
                        checked={selectedValue === SearchingDateRangeOptions.AllDate} onChange={onChange} />
                    &nbsp;&nbsp;{LangHelper.getSingleResource('AllDates')}
                </label>
            </DropdownItem>
            <DropdownItem tag="div">
                <label className="selection-item">
                    <input type="radio" name="searchOption" value={SearchingDateRangeOptions.DateRange}
                        checked={selectedValue === SearchingDateRangeOptions.DateRange} onChange={onChange} />
                    &nbsp;&nbsp;{LangHelper.getSingleResource('SelectDateRange')}
                </label>
            </DropdownItem>
        </DropdownButton>
    )
}

export default SearchingDateRangeOption