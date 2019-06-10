import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Pager } from '@9softstudio/react-grid';
import GridCaption from './GridCaption';
import DataGrid from './DataGrid';

export class Content extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            pagingOption: {
                PageIndex: 1,
                PageSize: 50,
                PageList: [50, 100, 200, 500],
                TotalItem: 1000
            }
        }
    }

    render() {
        const { playerList } = this.props;
        const { pagingOption } = this.state;

        return ( playerList &&
            <div className="result-content">
                <Pager pageOption={pagingOption} />
                <GridCaption />
                <DataGrid />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch);
}

function mapStateToProps(state) {
    const { playerList } = state;
    return Object.assign({}, { playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);