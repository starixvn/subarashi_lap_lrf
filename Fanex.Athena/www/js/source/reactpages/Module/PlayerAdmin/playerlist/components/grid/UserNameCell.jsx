import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

const UserNameCell = (props) => {
    const {dataItem, setSelectedPlayer, handleEnterContextMenu, handleLeaveContextMenu} = props;

    const handleSelectPlayer = (event, playerInfo) => {
        event.preventDefault();
        const player = {
            custId: playerInfo.CustId,
            userName: playerInfo.UserName,
            currency: playerInfo.Currency
        };

        setSelectedPlayer(player);
    }

    return (
        <div className="username-cell">
            <button className="btn-default btn-link username-link"
                onClick={(e) => handleSelectPlayer(e, dataItem)}>
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
    const { setSelectedPlayer } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer }, dispatch);
}

export default connect(null, mapDispatchToProps)(React.memo(UserNameCell));