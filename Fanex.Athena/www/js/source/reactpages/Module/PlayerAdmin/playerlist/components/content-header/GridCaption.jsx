import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators } from '../../actions';
import ReportTitle from '@jsroot/components/ReportTitle';
import MultipleSelect from '@9softstudio/react-multiselect';
import LangHelper from '@jsroot/lib/langHelper';

export class GridCaption extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    handleChangeDisplayedColumn = (currentItem, selectedItemsKey) => {
        const { displayedColumnList, setDisplayedColumnList } = this.props;
        const selectedKeyList = selectedItemsKey.split(',');
        const newColumnList = displayedColumnList.map(item => {
            const isShow = selectedKeyList.indexOf(item.key) !== -1;

            return item.show === isShow ? item : { ...item, show: isShow };
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
        const { selectedPlayer } = this.props;
        if (selectedPlayer) {
            return (
                <>
                    <span className="link" onClick={() => this.props.setSelectedPlayer(null)}>Previous search result</span>
                    <span><i className="chevron right icon-separator"></i> Player: {selectedPlayer.userName} ({selectedPlayer.currency})</span>
                </>
            )
        }
        else {
            const { playerCount } = this.props;
            return (<span key="searchResult">{`Search Result: ${playerCount} Player(s)`}</span>);
        }
    }

    _buildRightPart() {
        return (
            <span className="caret-block">
                {this._buildDisplayedColumnList()}
                <span className="icon-excel-wrapper" onClick={this.handleExportExcel}>
                    <i className="icon-excel" title={LangHelper.getSingleResource('ExportToExcel')}></i>
                </span>
            </span>
        )
    }

    handleExportExcel = () => {
        const { type, param, exportExcel } = this.props;
        exportExcel(type, param);
    }

    render() {
        const Content = <>{this._buildLeftPart()}{this._buildRightPart()}</>;

        return (<ReportTitle tag="div" content={Content} />)
    }
}

function mapDispatchToProps(dispatch) {
    const { setSelectedPlayer, setDisplayedColumnList, exportExcel } = ActionCreators;
    return bindActionCreators({ setSelectedPlayer, setDisplayedColumnList, exportExcel }, dispatch);
}

function mapStateToProps(state) {
    const { pagingOption, selectedPlayer, displayedColumnList, type, param } = state;
    const playerCount = pagingOption.TotalItem || 0;
    return Object.assign({}, { playerCount, selectedPlayer, displayedColumnList, type, param });
};

export default connect(mapStateToProps, mapDispatchToProps)(GridCaption);