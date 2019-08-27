import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import createSettingGrid from '../Base/createSettingGrid';
import KNSettingGrid from './KNSettingGrid';

const KNSetting = React.forwardRef((props, grid) => {
    const { data, setting, showErrorMsg } = props;
    const Grid = createSettingGrid(KNSettingGrid);

    return <Grid data={data} ref={grid} showErrorMsg={showErrorMsg} setting={setting} />
});

export default React.memo(KNSetting);
