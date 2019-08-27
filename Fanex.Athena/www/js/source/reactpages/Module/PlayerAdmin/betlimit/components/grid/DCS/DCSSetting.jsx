import React, { useState  } from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import createSettingGrid from '../Base/createSettingGrid';
import SettingGrid from '../Base/SettingGrid';

const DCSSetting = React.forwardRef((props, grid) => {
    const { data, setting, showErrorMsg } = props;
    const Grid = createSettingGrid(SettingGrid);

    return <Grid data={data} ref={grid} showErrorMsg={showErrorMsg} setting={setting} />
});

export default React.memo(DCSSetting);