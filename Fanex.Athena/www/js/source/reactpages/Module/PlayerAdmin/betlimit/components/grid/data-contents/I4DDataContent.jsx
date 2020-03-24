import React from 'react';
import I4DDataHandling from '../../../lib/i4DDataHandling';
import createSetting from '../base/SettingContent';
import I4DSettingGrid from '../sport-settings/I4DSettingGrid';

const Content = createSetting(I4DSettingGrid, new I4DDataHandling());

const NGDataContent = () => {
    return <Content />
}

export default NGDataContent;