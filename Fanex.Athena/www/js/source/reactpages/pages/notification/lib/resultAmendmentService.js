import LangHelper from '../../../lib/langHelper'
import Site from '../../../lib/site'
import DataService from '@jsroot/lib/DataService';

const headerText = {
    index: "#",
    ticketList: LangHelper.getSingleResource("TicketList"),
    dateTime: LangHelper.getSingleResource("EventDate"),
    content: LangHelper.getSingleResource("Content")
}

export default class Service {
    static getReportTitle(dateRange) {
        const fromDate = Site.convertDateToString(dateRange.fromDate);
        const toDate = Site.convertDateToString(dateRange.toDate);
        return `${LangHelper.getSingleResource("Amendment")}, ${fromDate} - ${toDate}`;
    }

    static getHeaderText() {
        return headerText;
    }

    static async fetchTicketListing(sessionId) {
        try {

            const response = await DataService.postData('NotificationReport/GetAmendmentTicketListing', { sessionId });
            if(response.status === 200) {
                return response.data;
            }
        }
        catch(e) {
            alert(LangHelper.getSingleResource('ErrorProcessingMsg'))
        }
        return {};
    }

    static async exportTicketListing(sessionId) {
        const response = await DataService.getFile('NotificationReport/ExportAmendmentTicketListing', { sessionId })
        const noContentStatusCode = 204;
        if (response.status === noContentStatusCode) {
            alert(LangHelper.getSingleResource("NoInfo"));
        } else {
            Site.downloadFile(response.data, 'TicketList.xls');
        };
    }

    static async exportAllTicketListing(params) {
        const response = await DataService.getFile('NotificationReport/ExportAllAmendmentTicketListing', params)
        const noContentStatusCode = 204;
        if (response.status === noContentStatusCode) {
            alert(LangHelper.getSingleResource("NoInfo"));
        } else {
            Site.downloadFile(response.data, 'TicketList.xls');
        };
    }
}