import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from './action.js'
import { bindActionCreators } from 'redux'
import AppLayout from '@jsroot/layouts/AppLayout';
import BetListLayout from '@jsroot/layouts/betlist/BetListLayout';
import { Tabs, Tab } from '@9softstudio/react-simple-tab';
import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';

export const PageLayout = (props) => {
    const { toggleLoader, isConvertAll, selectedBaseCurrency, selectedTabIndex, children, hasExchange } = props;
    
    const getResource = (key) => {
        return LangHelper.getSingleResource(key);
    }

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${date.getFullYear()}`;
    }

    const beforeShow = () => {
        toggleLoader(true);
    }

    const afterShow = () => {
        toggleLoader(false);
    }

    return (
        <AppLayout>
            <BetListLayout
                pageName='BTC'
                rootUrl={Site.getRootUrl()}
                getResourceFunc={getResource}
                formatDateStringFunc={formatDateString}
                baseCurrency={isConvertAll ? selectedBaseCurrency : ''}
                beforeShowFunc={beforeShow}
                afterShowFunc={afterShow}
            >
                <Tabs>
                    <Tab isActive={selectedTabIndex == 0} label={LangHelper.getSingleResource("SingleCustomer")}
                        url={Site.resolveClientUrl("BettingTicketCenter/SingleCustomer")}>
                    </Tab>
                    <Tab isActive={selectedTabIndex == 1} label={LangHelper.getSingleResource("RefNo")}
                        url={Site.resolveClientUrl("BettingTicketCenter/RefNo")}>
                    </Tab>
                    <Tab isActive={selectedTabIndex == 2} label={LangHelper.getSingleResource("Running")}
                        url={Site.resolveClientUrl("BettingTicketCenter/Running")}>
                    </Tab>
                    <Tab isActive={selectedTabIndex == 3} label={LangHelper.getSingleResource("AdvancedSearch")}
                        url={Site.resolveClientUrl("BettingTicketCenter/AdvancedSearch")}>
                    </Tab>
                    {
                        hasExchange && 
                        <Tab isActive={selectedTabIndex == 4} label={LangHelper.getSingleResource("Exchange")}
                            url={Site.resolveClientUrl("ExchangeVoided")}>
                        </Tab>
                    }
                </Tabs>
                <div>
                    {children}
                </div>
            </BetListLayout>
        </AppLayout>
    );
}

function mapDispatchToProps(dispatch) {
    const { toggleLoader } = ActionCreators;
    return bindActionCreators({ toggleLoader }, dispatch);
}

function mapStateToProps(state) {
    const { isConvertAll, selectedBaseCurrency, hasExchange } = state;
    return Object.assign({}, { isConvertAll, selectedBaseCurrency, hasExchange });
}

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);