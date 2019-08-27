import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import GridHelper from '../../lib/helpers/gridHelper';
import { buildSelectedPlayer, buildCurrentActivePlayer } from '../../lib/helpers/playerDataBuilder';

export const UserNameCell = (props) => {
    const { dataItem, setSelectedPlayer, setCurrentActivePlayer, setContextMenu, contextMenu } = props;

    const handleSelectPlayer = (event) => {
        event.preventDefault();
        const newSelectedPlayer = buildSelectedPlayer(dataItem);
        setSelectedPlayer(newSelectedPlayer);
    }

    const handleEnterContextMenu = (event) => {
        event.preventDefault();
        const { isOpen } = contextMenu;
        if (!isOpen) {
            const contextMenuHeight = 140;
            const rect = event.target.getBoundingClientRect();
            const position = {
                x: rect.left - 10,
                y: GridHelper.calculateTopPosition(contextMenuHeight, rect.top)
            };

            setContextMenu({ position, isOpen: true });

            const currentActivePlayer = buildCurrentActivePlayer(dataItem);
            setCurrentActivePlayer(currentActivePlayer);
        }
    }

    const handleLeaveContextMenu = (event) => {
        event.preventDefault();
        if (contextMenu.isOpen) {
            setContextMenu({ ...contextMenu, isOpen: false })
        }
    }

    return (
        <div className="username-cell">
            <button className="btn-default btn-link username-link"
                onClick={handleSelectPlayer}>
                {dataItem.UserName}
            </button>
            <button className="btn-default btn-link btn-icon cell-menu"
                onMouseEnter={handleEnterContextMenu} onMouseLeave={handleLeaveContextMenu}>
                <i className="material-icons">edit</i>
            </button>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayer, setCurrentActivePlayer, setContextMenu } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer, setCurrentActivePlayer, setContextMenu }, dispatch);
}

function mapStateToProps(state) {
    const { contextMenu } = state;
    return Object.assign({}, { contextMenu });
};

export default connect(mapStateToProps, mapDispatchToProps)(UserNameCell);