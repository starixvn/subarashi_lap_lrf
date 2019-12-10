import React from 'react';
import { Tabs, Tab } from '@9softstudio/react-simple-tab';
import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';
import ExchangeVoided from './AppContainer';

export const BTCContainer = (props) => {
    return (
        <div>
            <Tabs>
                <Tab label={LangHelper.getSingleResource("MultiCustomers")}
                    url={Site.resolveClientUrl("BettingTicketCenter/MultipleCustomers")}>
                </Tab>
                <Tab label={LangHelper.getSingleResource("SingleCustomer")}
                    url={Site.resolveClientUrl("BettingTicketCenter/SingleCustomer")}>
                </Tab>
                <Tab label={LangHelper.getSingleResource("RefNo")}
                    url={Site.resolveClientUrl("BettingTicketCenter/RefNo")}>
                </Tab>
                <Tab label={LangHelper.getSingleResource("Running")}
                    url={Site.resolveClientUrl("BettingTicketCenter/Running")}>
                </Tab>
                <Tab isActive={true} label={LangHelper.getSingleResource("Exchange")}
                    url={Site.resolveClientUrl("ExchangeVoided")}>
                </Tab>
            </Tabs>
            <div>
                <ExchangeVoided />
            </div>
        </div>
    )
}

export default BTCContainer;