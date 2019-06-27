import React from 'react';

import { oddsGroupListWithStyle } from '../../lib/constants';
import DropdownLabel from '../../../../../components/DropdownLabel';

const OddsGroupCell = (props) => {
    const { value, handleToggleOddsGroup } = props;
    const style = oddsGroupListWithStyle[value];

    return <DropdownLabel text={value} labelStyle={style} onClick={handleToggleOddsGroup} />
}

export default React.memo(OddsGroupCell);