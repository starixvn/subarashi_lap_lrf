import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions/index.js';
import ReportTitle from '../../../../components/ReportTitle';
import MultipleSelect from '@9softstudio/react-multiselect';
import BatchUpdateButton from './BatchUpdateButton';
import LangHelper from '../../../../lib/langHelper';
import { columnList } from '../lib/constants';

export class GridCaption extends React.PureComponent {
    constructor(props) {
        super(props);

        this.columnList = columnList.map(item => {
            return {
                id: item,
                value: item,
                status: true
            }
        })
    }

    _buildDropdownColumn() {
        return (
            <MultipleSelect id="columnList" className="selection-column"
                dataSource={this.columnList}
                keyField={"id"}
                valueField={"value"}
                statusField={"status"}
                onChange={(currentItem, selectedItemsKey) => console.log(selectedItemsKey)} />
        )
    }

    _buildLeftPart() {
        const { selectedPlayer, selectedPlayerIdList } = this.props;
        if (selectedPlayer) {
            return (
                <>
                    <span className="link" onClick={() => this.props.setSelectedPlayer(null)}>Previous search result</span>
                    <span> <strong>></strong> Player: {selectedPlayer.userName} ({selectedPlayer.currency})</span>
                </>
            )
        }
        else if (selectedPlayerIdList.length > 0) {
            return (
                <>
                    <BatchUpdateButton />
                    <button className="btn-outline btn-outline-light" type="button">
                        {selectedPlayerIdList.length} Player(s) Selected <span className="close">&times;</span>
                    </button>
                </>
            )
        }
        else {
            const { playerList } = this.props;
            return (<span key="searchResult">{`Search Result: ${playerList.length} Player(s)`}</span>);
        }
    }

    _buildRightPart() {
        return (
            <span className="caret-block">
                {this._buildDropdownColumn()}
                <span className="icon-excel-wrapper"><i className="icon-excel" title={LangHelper.getSingleResource('ExportToExcel')}></i></span>
            </span>
        )
    }

    render() {
        const Content = <>{this._buildLeftPart()}{this._buildRightPart()}</>;

        return (<ReportTitle tag="div" content={Content} />)
    }
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayer } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedPlayer, selectedPlayerIdList } = state;
    return Object.assign({}, { playerList, selectedPlayer, selectedPlayerIdList });
};

export default connect(mapStateToProps, mapDispatchToProps)(GridCaption);