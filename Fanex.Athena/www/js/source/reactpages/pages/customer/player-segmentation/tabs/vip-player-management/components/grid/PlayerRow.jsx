import React from 'react';
import { Row, Cell } from '@9softstudio/react-grid';
import CheckBox from '@jsroot/components/CheckBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
// import VipSwitcherCell from './VipSwitcherCell';

// export const PlayerRow = (props) => {
//     const { dataItem, setPlayerList, playerList } = props;
//     const {  ExternalId, SystemId, isSelected } = dataItem;

//     return (
//         <Row key={ExternalId}>
//             <Cell className="center-align"> <CheckBox id={`selectPlayer_${ExternalId}`}
//             checked={isSelected === true}
//             onChange={(checked) => {
//                 dataItem.isSelected = checked;
//                 setPlayerList([...playerList]);
//             } } /></Cell>
//             <Cell className="center-align">{SystemId}</Cell>
//             <Cell className="center-align">{SystemId}</Cell>
//             <Cell className="center-align">{SystemId}</Cell>
//         </Row>
//     )
// }

// function mapDispatchToProps(dispatch) {
//     const { setPlayerList } = ActionCreators;
//     return bindActionCreators({ setPlayerList }, dispatch);
// }

// function mapStateToProps(state) {
//     const { playerList } = state;
//     return Object.assign({}, { playerList });
// };

// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayerRow));



export class PlayerRow extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    // shouldComponentUpdate(nextProps) {
    //     const { dataItem } = nextProps;
    //     const currentDataItem = this.props.dataItem;
    //     return dataItem !== currentDataItem ||
    //      dataItem.isSelected !== currentDataItem.isSelected || dataItem.IsVipTagging !== currentDataItem.isSelected
    // }

    render() {
        const { dataItem, setPlayerList, playerList } = this.props;
        const { ExternalId, SystemId, isSelected } = dataItem;
        return <Row key={ExternalId}>
            <Cell className="center-align">
                <CheckBox id={`selectPlayer_${ExternalId}`}
                    checked={isSelected === true}
                    onChange={(checked) => {
                        dataItem.isSelected = checked;
                        setPlayerList([...playerList]);
                    }} /></Cell>
            <Cell className="center-align">{SystemId}</Cell>
            <Cell className="center-align">{SystemId}</Cell>
            <Cell className="center-align">{SystemId}</Cell>
        </Row>
    }
}

function mapDispatchToProps(dispatch) {
    const { setPlayerList } = ActionCreators;
    return bindActionCreators({ setPlayerList }, dispatch);
}

function mapStateToProps(state) {
    const { playerList } = state;
    return Object.assign({}, { playerList });
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerRow);

