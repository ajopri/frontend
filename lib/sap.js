import Axios from 'axios'
import Cookies from 'js-cookie'

const useSAP = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_SAP_API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${Cookies.get('sap_token')}`,
        'Content-Type': 'text/plain;charset=utf-8',
    },
})

export default useSAP
