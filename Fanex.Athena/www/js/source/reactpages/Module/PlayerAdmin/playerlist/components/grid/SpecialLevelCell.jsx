import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { specialLevelListWithColor } from '../../lib/constants';
import DropdownLabel from '@jsroot/components/DropdownLabel';

import { ActionCreators } from '../../actions';
import GridInteractionService from '../../lib/gridInteractionService';
import { getSpecialLevelText, buildCurrentActivePlayer } from '../../lib/utils';

export const SpecialLevelCell = (props) => {
    const { dataItem, specialLevelDropdownPosition, setCurrentActivePlayer, setSpecialLevelDropdownPosition } = props;
    const value = dataItem.SpecialLevel;
    const style = { backgroundColor: specialLevelListWithColor[value] };

    const handleToggleSpecialLevel = (event) => {
        const currentActivePlayer = buildCurrentActivePlayer(dataItem);
        setCurrentActivePlayer(currentActivePlayer);
        const newPosition = GridInteractionService.getNextDropdownPosition(event.target, specialLevelDropdownPosition);
        setSpecialLevelDropdownPosition(newPosition);
    }

    return <DropdownLabel text={getSpecialLevelText(value)} labelStyle={style} onClick={handleToggleSpecialLevel} />
}

function mapDispatchToProps(dispatch) {
    const { setCurrentActivePlayer, setSpecialLevelDropdownPosition } = ActionCreators;
    return bindActionCreators({ setCurrentActivePlayer, setSpecialLevelDropdownPosition }, dispatch);
}

function mapStateToProps(state) {
    const { specialLevelDropdownPosition } = state;
    return Object.assign({}, { specialLevelDropdownPosition });
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialLevelCell);