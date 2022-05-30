import Axios from 'axios'
import Cookies from 'js-cookie'

const useSAP = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_SAP_API_URL,
    headers: {
        Authorization: `Bearer ${Cookies.get('SAP-TOKEN')}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'true',
    },
    withCredentials: false,
})

export default useSAP
