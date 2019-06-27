import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

const UserNameCell = (props) => {
    const {dataItem, setSelectedPlayer, handleEnterContextMenu, handleLeaveContextMenu, setCurrentActivePlayer } = props;

    const handleSelectPlayer = (event) => {
        event.preventDefault();
        const player = {
            custId: dataItem.CustId,
            userName: dataItem.UserName,
            currency: dataItem.Currency
        };

        setSelectedPlayer(player);
    }

    const handleMouseEnter = (event) => {
        event.preventDefault();
        handleEnterContextMenu(event);
        const currentActivePlayer = {
            custId: dataItem.CustId,
            userName: dataItem.UserName,
            currency: dataItem.Currency
        };
        setCurrentActivePlayer(currentActivePlayer);
    }

    return (
        <div className="username-cell">
            <button className="btn-default btn-link username-link"
                onClick={handleSelectPlayer}>
                {dataItem.UserName}
            </button>
            <button className="btn-default btn-link btn-icon cell-menu"
                onMouseEnter={handleMouseEnter} onMouseLeave={handleLeaveContextMenu}>
                <i className="material-icons">edit</i>
            </button>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayer, setCurrentActivePlayer } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer, setCurrentActivePlayer }, dispatch);
}

export default connect(null, mapDispatchToProps)(React.memo(UserNameCell));