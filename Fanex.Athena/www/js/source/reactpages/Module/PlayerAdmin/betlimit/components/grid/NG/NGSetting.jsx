import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import createSettingGrid from '../Base/createSettingGrid';
import NGSettingGrid from './NGSettingGrid';

const NGSetting = React.forwardRef((props, grid) => {
    const { data, setting, showErrorMsg } = props;
    const Grid = createSettingGrid(NGSettingGrid);

    return <Grid data={data} ref={grid} showErrorMsg={showErrorMsg} setting={setting} />
});

export default React.memo(NGSetting);
