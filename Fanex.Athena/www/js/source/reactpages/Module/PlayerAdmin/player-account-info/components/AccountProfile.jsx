import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index.js'
import { bindActionCreators } from 'redux'

export class AccountProfile extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }

        this.tabList = [
            { name: 'accountProfile', text: 'Account Profile' },
            { name: 'bankInformation', text: 'Bank Information' },
            { name: 'accountRecord', text: 'Account Record' }
        ]
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        const params = { ibcCustId: 1 };
        this.props.getAccountInfo(params)
            .then(result => {
                this.setState({ data: result });
            })
            .catch(err => {
                console.log(err);
            });
    }

    _renderTabList() {
        return (
            this.tabList.map((item, index) => {
                return (
                    <li className="tab" key={item.name}>
                        <a href="javascript:;" className={index === 0 ? 'active' : ''}>
                            {item.text}
                        </a>
                    </li>
                )
            })
        )
    }

    render() {
        const { data } = this.state;
        return data && (
            <div className="acc-infor-group">
                <div className="header-tab">
                    <div className="content-tab">
                        <ul className="tabs">
                            {this._renderTabList()}
                        </ul>
                    </div>
                </div>
                <div className="tab-panel">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td className="first-cell">AG UserID</td>
                                <td>qatest01</td>
                            </tr>
                            <tr>
                                <td>Gold Deluxe UserID</td>
                                <td>qatest01</td>
                            </tr>
                            <tr>
                                <td>VoidBridge UserID</td>
                                <td>qatest01</td>
                            </tr>
                            <tr>
                                <td colSpan="2"></td>
                            </tr>
                            <tr>
                                <td>First name</td>
                                <td>qatest01</td>
                            </tr>
                            <tr>
                                <td>Last name</td>
                                <td>101</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>Male</td>
                            </tr>
                            <tr>
                                <td>Date of birth</td>
                                <td>34335</td>
                            </tr>
                            <tr>
                                <td>Mobile</td>
                                <td>111</td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>Togo</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td>City/ Town</td>
                                <td>22</td>
                            </tr>
                            <tr>
                                <td>State</td>
                                <td>33</td>
                            </tr>
                            <tr>
                                <td>Zip Code</td>
                                <td>44</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <h4>Account Profile (Call From LRF & LAP)</h4>
                <ul>
                    <li>Created Date: {data.CreatedDate}</li>
                    <li>Last Login: {data.LastLogin}</li>
                    <li>Last Txn: {data.LastTxn}</li>
                    <li>Email (LAP): {data.Email}</li>
                    <li>LapInfo1 (LAP): {data.LapInfo1}</li>
                    <li>LapInfo2 (LAP): {data.LapInfo2}</li>
                </ul> */}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { getAccountInfo } = ActionCreators;
    return bindActionCreators({ getAccountInfo }, dispatch);
}

function mapStateToProps(state) {
    return Object.assign({}, {});
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);