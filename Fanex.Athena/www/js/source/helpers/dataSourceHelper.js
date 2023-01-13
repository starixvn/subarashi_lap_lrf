export default class DataSourceHelper {
    static CreateDataSourceFrom(originDataSource, selectedItems) {
        const selectedItemList = selectedItems.split(',').filter(x => x !== '');
        const convertedList = originDataSource.map(item => {
            const { Id, Value } = item;
            return {
                Id,
                Value,
                Status: selectedItemList.find(_ => _ == Id) ? true : false
            }
        })

        return convertedList;
    }
}