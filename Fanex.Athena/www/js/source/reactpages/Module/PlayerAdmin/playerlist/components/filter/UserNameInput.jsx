import React, { useState } from 'react';
import { DropdownMenu, DropdownItem } from '@jsroot/components/dropdown';
import Timer from '@jsroot/components/utils/timer';

export const UserNameInput = React.forwardRef((props, userNameRef) => {
    const { onSelectItem, minChar, getSuggestionList, searchOption } = props;

    const [isOpenSuggestion, setIsOpenSuggestion] = useState(false);
    const [suggestionList, setSuggestionList] = useState([]);
    const [dropdownStyle, setDropdownStyle] = useState(null);

    const handleChange = () => {
        const element = userNameRef.current;
        if(!element){
            return;
        }

        const { value } = element;

        if (value.length >= minChar) {
            const param = { userName: value, searchOption };
            getSuggestionList(param).then(response => {
                const rect = element.getBoundingClientRect();
                const style = {
                    left: rect.left,
                    top: rect.top + rect.height,
                    width: rect.width,
                    position: 'fixed'
                };

                setDropdownStyle(style);
                setSuggestionList(response.data || []);

                const hasData = response.data && response.data.length;
                setIsOpenSuggestion(!!hasData);
            })
        }
        else{
            setIsOpenSuggestion(false);
            setSuggestionList([]);
        }
    }

    const debounceChange = Timer.debounce(handleChange, 300);

    const handleSelectSuggestionItem = (value) => {
        onSelectItem && onSelectItem(value);
        handleCloseDropdown();
    }

    const handleCloseDropdown = () => {
        setIsOpenSuggestion(false);
    }

    return (
        <div className="pa-username">
            <input className="input-text" id="userName" name="userName" type="text" ref={userNameRef}
                autoComplete="off" onChange={debounceChange} />
            <div className="dropdown">
                <DropdownMenu isOpen={isOpenSuggestion} style={dropdownStyle}>
                    {
                        suggestionList.map(item => {
                            return <DropdownItem key={item} onClick={() => handleSelectSuggestionItem(item)}>{item}</DropdownItem>
                        })
                    }
                </DropdownMenu>
            </div>
        </div>
    )
});

export default React.memo(UserNameInput);