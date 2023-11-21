import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from './action.js'
import AppLayout from '@jsroot/layouts/AppLayout';
import BetListLayout from '@jsroot/layouts/betlist/BetListLayout';
import { Tabs, Tab } from '@9softstudio/react-simple-tab';
import LangHelper from '@jsroot/lib/langHelper';
import Site from '@jsroot/lib/site';
import { tabList } from '../lib/constants';
import AppData from '@jsroot/lib/AppData';

export const PageLayout = (props) => {
    const dispatch = useDispatch();
    const { toggleLoader } = ActionCreators;
    const [isConvertAll, selectedBaseCurrency, hasExchange] = useSelector(state => [state.isConvertAll, state.selectedBaseCurrency, state.hasExchange])
    const { selectedTabIndex, children } = props;

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
        dispatch(toggleLoader(true));
    }

    const afterShow = () => {
        dispatch(toggleLoader(false));
    }

    const activedTabList = tabList.filter(x => AppData.tabList.includes(x.key));

    return (
        <div className={props.className}>
            <AppLayout >
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
                        {
                            activedTabList.map(item =>
                                <Tab key={item.url} isActive={selectedTabIndex == item.displayOrder} label={item.label} url={item.url} />)
                        }
                        {
                            hasExchange &&
                            <Tab key={Site.resolveClientUrl("ExchangeVoided")} isActive={selectedTabIndex == 4} label={LangHelper.getSingleResource("Exchange")}
                                url={Site.resolveClientUrl("ExchangeVoided")}>
                            </Tab>
                        }
                    </Tabs>
                    <div>
                        {children}
                    </div>
                </BetListLayout>
            </AppLayout>
        </div>

    );
}

export default PageLayout;