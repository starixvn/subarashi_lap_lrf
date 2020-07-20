import Site from '@jsroot/lib/site'

export default class ParamHelper {
    static ToAPIParams({ selectedParams, dateRange, custId, baseCurrency }) {
        return {
            ...{"PageSize":50,"PageIndex":1,"FromDate":"06/01/2020","ToDate":"07/20/2020","ProductCodeList":"SB,NG,BA,VS,KN,CO,VS2,LT,TG,I4D","Username":"simo2912","BaseCurrency":"EUR","Status":"112,113,111,102,99,101,103,2","LiveStatus":"0,1,2","Platform":0},
            // ...selectedParams, 
            // ...{
            //     custId,
            //     baseCurrency,
            //     fromDate: Site.convertDateToString(dateRange.fromDate),
            //     toDate: Site.convertDateToString(dateRange.toDate)
            // }
        }
    }
}