import React, { useState  } from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import createSettingGrid from '../Base/createSettingGrid';
import SettingGrid from '../Base/SettingGrid';
import CheckBox from '@jsroot/components/CheckBox';

const SBSetting = React.forwardRef((props, grid) => {
    const { data, setting, showErrorMsg } = props;
    const [isCopy, setIsCopy] = useState(false);

    const onCheck = (checked) => {
        let isCopy = checked;

        if (checked) {
            if (!grid.copyData()) {
                isCopy = false
            }
        }
        else {
            grid.removeCopyData();
        }

        setIsCopy(isCopy);
    }

    const Grid = createSettingGrid(SettingGrid);

    return (
        <div>
            {
                setting.EnableCopy && setting.Editable &&
                <CheckBox id="IsCopy"
                    checked={isCopy}
                    onChange={onCheck}
                    label={LangHelper.getSingleResource("CopyBetSettingFromSoccer")} />
            }
            <Grid
                data={data}
                ref={grid}
                showErrorMsg={showErrorMsg}
                setting={setting} />
        </div>
    );
});

export default React.memo(SBSetting);
