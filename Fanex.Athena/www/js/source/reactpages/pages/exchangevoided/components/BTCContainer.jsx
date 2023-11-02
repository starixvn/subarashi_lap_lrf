import React from 'react';
import { Tabs, Tab } from '@9softstudio/react-simple-tab';
import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';
import ExchangeVoided from './AppContainer';
import { tabList } from '../../bettingticketscenter/common/lib/constants';
import AppData from '@jsroot/lib/AppData';
import useMobileVersion from '@jsroot/customHooks/useMobileVersion'

export const BTCContainer = (props) => {
    const activedTabList = tabList.filter(x => AppData.tabList.includes(x.key));
    const isMobileView = useMobileVersion();
    const className = isMobileView ?  "mobile-container" : "";
    return (
        <div className={className}>
            <Tabs>
                {
                    activedTabList.map(item => <Tab key={item.label} label={item.label} url={item.url} />)
                }
                <Tab isActive={true} key={LangHelper.getSingleResource("Exchange")} label={LangHelper.getSingleResource("Exchange")}
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