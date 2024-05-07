import React, { memo, useState } from 'react'
import LangHelper from '@jsroot/lib/langHelper'
import { DropdownButton, DropdownItem } from '@jsroot/components/dropdown';
import { SearchingIdOptions } from '../lib/constants'

const SearchingIdOption = (props) => {
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

    const selectedValue = value || SearchingIdOptions.refNo;

    return (
        <DropdownButton className="search-option" isOpen={isOpen} toggleButton={toggleButton}
            onToggle={handleToggleDropdown}
            buttonLabel={(<i className="material-icons">settings</i>)}
            onClose={handleClose}>
            <DropdownItem tag="div">
                <label className="selection-item">
                    <input type="radio" name="searchOption" value={SearchingIdOptions.bookedId}
                        checked={selectedValue === SearchingIdOptions.bookedId} onChange={onChange} />
                    &nbsp;&nbsp;{LangHelper.getSingleResource('BookedId')}
                </label>
            </DropdownItem>
            <DropdownItem tag="div">
                <label className="selection-item">
                    <input type="radio" name="searchOption" value={SearchingIdOptions.refNo}
                        checked={selectedValue === SearchingIdOptions.refNo} onChange={onChange} />
                    &nbsp;&nbsp;{LangHelper.getSingleResource('RefNo')}
                </label>
            </DropdownItem>
            <DropdownItem tag="div">
                <label className="selection-item">
                    <input type="radio" name="searchOption" value={SearchingIdOptions.userName}
                        checked={selectedValue === SearchingIdOptions.userName} onChange={onChange} />
                    &nbsp;&nbsp;{LangHelper.getSingleResource('Username')}
                </label>
            </DropdownItem>
        </DropdownButton>
    )
}

export default memo(SearchingIdOption);