import React, { forwardRef, useState  } from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import SettingGrid from '../Base/SettingGrid';
import CheckBox from '@jsroot/components/CheckBox';

const SBSettingGrid = forwardRef((props, grid) => {
    const { data, setting, showErrorMsg } = this.props;
    const [isCopy, setIsCopy] = useState[false];

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

    return (
        <div>
            {
                setting.EnableCopy && setting.Editable &&
                <CheckBox id="IsCopy"
                    checked={isCopy}
                    onChange={onCheck}
                    label={LangHelper.getSingleResource("CopyBetSettingFromSoccer")} />
            }
            <SettingGrid
                data={data}
                ref={grid}
                showErrorMsg={showErrorMsg}
                setting={setting} />
        </div>
    );
});

export default SBSettingGrid;
