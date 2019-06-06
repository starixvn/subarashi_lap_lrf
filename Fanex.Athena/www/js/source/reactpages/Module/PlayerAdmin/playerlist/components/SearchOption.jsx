import React, {useState} from 'react';
import { DropdownButton, DropdownItem } from '../../../../components/dropdown';

const SearchOption = (props) => {
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

    return (
        <DropdownButton className="search-option" isOpen={isOpen} toggleButton={toggleButton}
            onToggle={handleToggleDropdown}
            buttonLabel={(<i className="material-icons">settings</i>)}
            onClose={handleClose}>
            <DropdownItem tag="div">
                <label className="selection-item">
                <input type="radio" name="searchOption" defaultChecked={true} />
                    Match prefix e.g. "<span className="keyword">test</span>"ABCD
                </label>
            </DropdownItem>
            <DropdownItem tag="div">
                <label className="selection-item">
                <input type="radio" name="searchOption" />
                    Match case e.g. AB"<span className="keyword">test</span>"CD
                </label>
            </DropdownItem>
        </DropdownButton>
    )
}

export default SearchOption;