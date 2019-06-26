import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../actions/index.js';
import ReportTitle from '../../../../components/ReportTitle';
import MultipleSelect from '@9softstudio/react-multiselect';
import BatchUpdateButton from './BatchUpdateButton';
import LangHelper from '../../../../lib/langHelper';

export class GridCaption extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    handleChangeDisplayedColumn = (currentItem, selectedItemsKey) => {
        const {displayedColumnList, setDisplayedColumnList} = this.props;
        const selectedKeyList = selectedItemsKey.split(',');
        const newColumnList = displayedColumnList.map(item => {
            const isShow = selectedKeyList.indexOf(item.key) !== -1;

            return item.show === isShow ? item : {...item, show: isShow};
        })

        setDisplayedColumnList(newColumnList);
    }

    _buildDisplayedColumnList() {
        return (
            <MultipleSelect id="columnList" className="selection-column"
                dataSource={this.props.displayedColumnList}
                keyField={"key"}
                valueField={"value"}
                statusField={"show"}
                onChange={this.handleChangeDisplayedColumn} />
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
        // For Phase 2
        // else if (selectedPlayerIdList.length > 0) {
        //     return (
        //         <>
        //             <BatchUpdateButton />
        //             <button className="btn-outline btn-outline-light" type="button">
        //                 {selectedPlayerIdList.length} Player(s) Selected <span className="close">&times;</span>
        //             </button>
        //         </>
        //     )
        // }
        else {
            const { playerList } = this.props;
            return (<span key="searchResult">{`Search Result: ${playerList.length} Player(s)`}</span>);
        }
    }

    _buildRightPart() {
        return (
            <span className="caret-block">
                {this._buildDisplayedColumnList()}
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
    const { setSelectedPlayer, setDisplayedColumnList } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer, setDisplayedColumnList }, dispatch);
}

function mapStateToProps(state) {
    const { playerList, selectedPlayer, selectedPlayerIdList, displayedColumnList } = state;
    return Object.assign({}, { playerList, selectedPlayer, selectedPlayerIdList, displayedColumnList });
};

export default connect(mapStateToProps, mapDispatchToProps)(GridCaption);