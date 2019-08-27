import React from 'react';
import Service from '../../../lib/service';
import LangHelper from '@jsroot/lib/langHelper';

const SettingInput = (props) => {
    const { value, editable, className, onBlur, type, setInputRef, children } = props;
    const formatValue = Service.formatValue(value);

    const inputRef = (e) => setInputRef(type, e);

    return (
        <td className='pa-betlimit-cell'>
            <input className={className}
                type='text'
                ref={inputRef}
                autoComplete='off'
                maxLength='14'
                defaultValue={formatValue}
                onBlur={onBlur}
                disabled={!editable} />
            {children}
        </td>
    );
};

export default SettingInput;