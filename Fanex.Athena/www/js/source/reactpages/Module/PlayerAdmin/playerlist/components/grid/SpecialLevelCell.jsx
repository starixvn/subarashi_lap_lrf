import React from 'react';

import { specialLevelListWithColor } from '../../lib/constants';
import DropdownLabel from '../../../../../components/DropdownLabel';

export const SpecialLevelCell = (props) => {
    const { value, handleToggleSpecialLevel } = props;
    const style = { backgroundColor: specialLevelListWithColor[value] };

    return <DropdownLabel text={value === '0' ? 'None' : value} labelStyle={style} onClick={handleToggleSpecialLevel} />
}

export default React.memo(SpecialLevelCell);