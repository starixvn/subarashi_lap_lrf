import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import CheckBox from '@jsroot/components/CheckBox';
import AdvancedSearch from './filter/AdvancedSearch';
import SearchOption from './filter/SearchOption';
import AthenaSearch from './filter/AthenaSearch';
import { licenseeType } from '../lib/constants';
import CollapsiblePanel from '@jsroot/components/collapsible-panel';
import UserGuide from '@jsroot/components/UserGuide';
import LangHelper from '@jsroot/lib/langHelper';
import { searchOptions, baStatusList, specialLevelListWithColor } from '../lib/constants';
import UserNameInput from './filter/UserNameInput';
import QueryString from '@jsroot/lib/QueryString';

export class FormFilter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            bankAccountNumber: '',
            email: '',
            currency: '',
            oddsGroup: '',
            specialLevel: '',
            baFilter: baStatusList.All,
            searchOption: searchOptions.matchCase
        }

        this.userGuide = this._renderUserGuide();
        this.allSpecialLevel = Object.keys(specialLevelListWithColor).map(item => item).join(',');
        this.userNameRef = React.createRef();
    }

    componentDidMount() {
        const custId = QueryString.getParam(window.location.href, 'custId');
        if(custId){
            this.props.getSinglePlayer(custId);

            this.userNameRef.current.value = QueryString.getParam(window.location.href, 'userName');
        }
    }
    

    handleSubmit = (event) => {
        event.preventDefault();
        const userName = this.userNameRef.current.value;
        const { bankAccountNumber, email } = this.state;
        if (!userName && !bankAccountNumber && !email) {
            return;
        }

        const { pagingOption, searchPlayer } = this.props;
        const { specialLevel, ...allParam } = this.state;
        const actualSpecialLevel = specialLevel.trim();
        const param = {
            ...allParam,
            userName,
            specialLevel: actualSpecialLevel === '' ? this.allSpecialLevel : actualSpecialLevel,
            pageSize: pagingOption.PageSize,
            pageIndex: pagingOption.PageIndex
        };

        searchPlayer(param);
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleSpecificInputChange = (name, value) => {
        this.setState({ [name]: value });
    }

    handleUserNameChange = (value) => {
        this.userNameRef.current.value = value;
    }

    showUserGuide() {

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
        const { bankAccountNumber, email, searchOption, ...advancedSearchParam } = this.state;
        const { type, isAdvancedSearch, isFilterCollapsing, currencyList, getSuggestionList } = this.props;
        const iconToggle = {
            tag: 'div',
            className: isFilterCollapsing ? 'chevron down' : 'chevron up',
            style: {}
        }

        return (
            <CollapsiblePanel className="page-filter" iconToggle={iconToggle} stickyFooter={this.userGuide}
                onCollapse={() => this.props.setCollapseFilter(true)} onExpand={() => this.props.setCollapseFilter(false)}>
                <div className="row">
                    <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">
                                {LangHelper.getSingleResource("Username")}
                                {(<SearchOption value={searchOption} onChange={this.handleChange} />)}
                            </label>
                            <UserNameInput ref={this.userNameRef} onSelectItem={(value) => this.handleUserNameChange(value)}
                                minChar={3} getSuggestionList={getSuggestionList} searchOption={searchOption} />
                        </div>
                    </div>

                    {type === licenseeType.nonApi && <AthenaSearch onChange={this.handleChange}
                        bankAccountNumber={bankAccountNumber} email={email} />}
                    {isAdvancedSearch && <AdvancedSearch currencyList={currencyList} param={advancedSearchParam} onChange={this.handleSpecificInputChange} />}

                    <div className="col-12 col-md-2 col-sm-2 col-lg-1 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                                <button type="button" className="btn btn-submit" onClick={this.handleSubmit}>{LangHelper.getSingleResource("Submit")}</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <CheckBox id="isAdvancedSearch"
                                checked={isAdvancedSearch}
                                onChange={checked => this.props.setAdvancedSearch(checked)}
                                label={LangHelper.getSingleResource("AdvancedSearch")} />
                        </div>
                    </div>
                </div>
            </CollapsiblePanel>
        );
    }
}
function mapDispatchToProps(dispatch) {
    const { searchPlayer, setAdvancedSearch, setCollapseFilter, getSuggestionList, getSinglePlayer } = ActionCreators;
    return bindActionCreators({ searchPlayer, setAdvancedSearch, setCollapseFilter, getSuggestionList, getSinglePlayer }, dispatch);
}
function mapStateToProps(state) {
    const { type, isAdvancedSearch, isFilterCollapsing, pagingOption, currencyList } = state;
    return Object.assign({}, { type, isAdvancedSearch, isFilterCollapsing, pagingOption, currencyList });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);