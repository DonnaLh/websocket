export default {
    //  获取客户预约记录
    getCustomerAppointmentRecords (params) {
        return restApi({ url: `/yuan-center/api/v1/appointment/record/${params.customerId}`, method: 'get' })
    }
}