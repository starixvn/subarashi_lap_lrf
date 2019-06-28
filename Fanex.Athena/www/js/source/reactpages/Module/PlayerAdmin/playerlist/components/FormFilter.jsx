import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../actions/index.js'
import { bindActionCreators } from 'redux'
import CheckBox from '@jsroot/components/CheckBox'
import AdvancedSearch from './filter/AdvancedSearch';
import SearchOption from './filter/SearchOption';
import AthenaSearch from './filter/AthenaSearch';
import { licenseeType } from '../lib/constants';
import CollapsiblePanel from '@jsroot/components/collapsible-panel';
import UserGuide from '@jsroot/components/UserGuide';
import LangHelper from '@jsroot/lib/langHelper';
import { searchOptions } from '../lib/constants';

export class FormFilter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            bankAccountNumber: '', 
            email: '',
            currency: '',
            oddsGroup: '',
            specialLevel: '',
            baStatus: '',
            searchOption: searchOptions.matchCase
        }

        this.userGuide = this._renderUserGuide();
        this.iconContainerStyle = {
            height: '15px',
            width: '20px',
            cursor: 'pointer',
            position: 'absolute',
            left: 'calc(50% - 10px)',
            bottom: 0,
            paddingLeft: 5,
            background: '#4c6274'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {pagingOption} = this.props;
        this.props.setSelectedPlayer(null);
        const param = { 
            ...this.state, 
            pageSize: pagingOption.PageSize, 
            pageIndex: pagingOption.PageIndex 
        };
        this.props.searchPlayer(param);

        console.log(param);
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleAdvancedSearchChange = (name, value) => {
        this.setState({ [name]: value });
    }

    showUserGuide(){

    }

    _renderUserGuide() {
        const userGuideContent = 'Player Admin User Guide';

        return (<UserGuide 
                title={LangHelper.getSingleResource("UserGuide")} 
                contentTitle={LangHelper.getSingleResource("")}
                onClick={this.showUserGuide}
                content={userGuideContent} />)
    }

    render() {
        const { userName, bankAccountNumber, email, searchOption, ...advancedSearchParam } = this.state;
        const { type, isAdvancedSearch, isFilterCollapsing } = this.props;
        const iconToggle = {
            tag: 'div',
            className: isFilterCollapsing ? 'chevron down' : 'chevron up',
            style: {}
        }

        return (
            <CollapsiblePanel className="page-filter" iconToggle={iconToggle} 
                iconContainerStyle={this.iconContainerStyle} stickyFooter={this.userGuide}
                onCollapse={() => this.props.setCollapseFilter(true)} onExpand={() => this.props.setCollapseFilter(false)}>
                <div className="row">
                    <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">UserName {(<SearchOption value={searchOption} onChange={this.handleChange} />)}</label>
                            <input className="input-text" id="userName" name="userName" type="text" value={userName}
                                autoComplete="off" onChange={this.handleChange} />
                        </div>
                    </div>

                    {type === licenseeType.nonApi && <AthenaSearch onChange={this.handleChange} 
                                                        bankAccountNumber={bankAccountNumber} email={email} />}
                    {isAdvancedSearch && <AdvancedSearch param={advancedSearchParam} onChange={this.handleAdvancedSearchChange} />}

                    <div className="col-12 col-md-2 col-sm-2 col-lg-1 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" className="btn btn-submit" onClick={this.handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <CheckBox id="isAdvancedSearch"
                                checked={isAdvancedSearch}
                                onChange={checked => this.props.setAdvancedSearch(checked)}
                                label="Advanced Search" />
                        </div>
                    </div>
                </div>
            </CollapsiblePanel>
        );
    }
}
function mapDispatchToProps(dispatch) {
    const { searchPlayer, setSelectedPlayer, setAdvancedSearch, setCollapseFilter } = ActionCreators;
    return bindActionCreators({ searchPlayer, setSelectedPlayer, setAdvancedSearch, setCollapseFilter }, dispatch);
}
function mapStateToProps(state) {
    const { type, isAdvancedSearch, isFilterCollapsing, pagingOption } = state;
    return Object.assign({}, { type, isAdvancedSearch, isFilterCollapsing, pagingOption });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);