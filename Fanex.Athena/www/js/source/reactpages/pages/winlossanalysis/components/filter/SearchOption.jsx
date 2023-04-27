import React, { useState } from 'react';
import { DropdownButton, DropdownItem } from '@jsroot/components/dropdown';
import { SearchMode } from '../../common/constants';
import LangHelper from '@jsroot/lib/langHelper';

const SearchOption = (props) => {
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

    const selectedValue = value || SearchMode.MatchPrecise;

    return (
        <DropdownButton className="search-option" isOpen={isOpen} toggleButton={toggleButton}
            onToggle={handleToggleDropdown}
            buttonLabel={(<i className="material-icons">settings</i>)}
            onClose={handleClose}>
            <DropdownItem tag="div">
                <label className="selection-item">
                    <input id={SearchMode.MatchPrecise} type="radio" name="searchOption" value={SearchMode.MatchPrecise}
                        checked={selectedValue == SearchMode.MatchPrecise} onChange={onChange} />
                    <label htmlFor={SearchMode.MatchPrecise} >{LangHelper.getSingleResource('MatchPrecise')}</label>
                </label>
            </DropdownItem>
            <DropdownItem tag="div">
                <label className="selection-item">
                    <input id={SearchMode.MatchCase} type="radio" name="searchOption" value={SearchMode.MatchCase}
                        checked={selectedValue == SearchMode.MatchCase} onChange={onChange} />
                    <label htmlFor={SearchMode.MatchCase}>{LangHelper.getSingleResource('MatchCase')} AB"<span className="keyword">test</span>"CD</label>
                </label>
            </DropdownItem>
        </DropdownButton>
    )
}

export default SearchOption;
