import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import SettingRow from '../Base/SettingRow';
import SettingInput from '../Base/SettingInput';
import Service from '../../../lib/service';
import { BetLimitType } from '../../../lib/constants';

const SettingGrid = (props) => {
    const { editable, data, setRef } = props;

    const buildBody = () => {
        let rows = [];

        for (let i = 0; i < data.length; i++) {
            const item = data[i];

            rows.push(
                <SettingRow
                    key={item.SportId}
                    id={item.SportId}
                    data={item}
                    ref={(e) => setRef(item.SportId, e)}
                    editable={editable}
                    validate={Service.validate}
                >
                    <td>{item.BetSettingType}</td>
                    <SettingInput type={BetLimitType.MinBet} value={item.MinBet} editable={editable}>
                        {item.BetValueMin > 0 && <span>{` >= ${Service.formatValue(item.BetValueMin)}`}</span>}
                    </SettingInput>
                    <SettingInput type={BetLimitType.MaxBet} value={item.MaxBet} editable={editable}>
                        {item.BetValueMax > 0 && <span>{` <= ${Service.formatValue(item.BetValueMax)}`}</span>}
                    </SettingInput>
                    <SettingInput type={BetLimitType.MaxPerMatch} value={item.MaxPerMatch} editable={editable}>
                        {item.MaxPerMatchMax > 0 && <span>{` <= ${Service.formatValue(item.MaxPerMatchMax)}`}</span>}
                    </SettingInput>
                </SettingRow>
            )
        }

        return <tbody>{rows}</tbody>;
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>{LangHelper.getSingleResource('Sport')}</th>
                    <th>{LangHelper.getSingleResource('MinBet')}</th>
                    <th>{LangHelper.getSingleResource('MaxBet')}</th>
                    <th>{LangHelper.getSingleResource('MaxPerMatch')}</th>
                </tr>
            </thead>
            {buildBody()}
        </table>
    );
};

export default SettingGrid;