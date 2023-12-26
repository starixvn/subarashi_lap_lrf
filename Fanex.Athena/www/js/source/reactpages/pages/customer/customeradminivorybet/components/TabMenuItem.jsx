import React from 'react';
import HistoryOption from './HistoryOption'

export const TabMenuItem = (props) => {
    const { item, isActive, onClickTabMenu, historyOption, handleChangeHistoryOption } = props;

    return (
        <li key={item.key}>
            <div style={{ display: 'flex'}}>
                <a className={isActive ? 'active' : ''} onClick={() => onClickTabMenu(item.key)}>
                    {item.name}
                    {item.isNew && <><span>&nbsp;</span>
                        <i className="icon-new" title="New" style={{ position: 'absolute' }} ></i>
                    </>}
                </a>

                {item.isShowOption && 
                    <div className="search-option-container">        
                        <HistoryOption value={historyOption} onChange={handleChangeHistoryOption} />
                    </div>}
            </div>
        </li>
    )
}

export default React.memo(TabMenuItem);