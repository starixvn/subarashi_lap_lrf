import React, { useState } from 'react';
import { DropdownButton, DropdownItem } from '@jsroot/components/dropdown';
import LangHelper from '@jsroot/lib/langHelper';
import { historyMode } from '../lib/constants';

const HistoryOption = (props) => {
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

    const selectedValue = value || historyMode.Deposit;

    return (
        <DropdownButton className="search-option" isOpen={isOpen} toggleButton={toggleButton}
            onToggle={handleToggleDropdown}
            buttonLabel={(<i className="material-icons">settings</i>)}
            onClose={handleClose}>
            <DropdownItem tag="div">
                <label className="selection-item">
                    <input id={historyMode.Deposit} type="radio" name="searchOption" value={historyMode.Deposit}
                        checked={selectedValue == historyMode.Deposit} onChange={onChange} />
                    <label htmlFor={historyMode.Deposit}>{LangHelper.getSingleResource('Deposit')}</label>
                </label>
            </DropdownItem>
            <DropdownItem tag="div">
                <label className="selection-item">
                    <input id={historyMode.Withdrawal} type="radio" name="searchOption" value={historyMode.Withdrawal}
                        checked={selectedValue == historyMode.Withdrawal} onChange={onChange} />
                    <label htmlFor={historyMode.Withdrawal}>{LangHelper.getSingleResource('Withdrawal')}</label>
                </label>
            </DropdownItem>
        </DropdownButton>
    )
}

export default HistoryOption;
