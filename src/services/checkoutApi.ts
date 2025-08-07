import axios from "axios"

const API_URL = `${import.meta.env.VITE_API_URL}/payment`;

type PaymentResponse = {
    paymentId: string;}

export const fetchPaymentId = async (): Promise<string> => {
    try {
        const response = await axios.get<PaymentResponse>(`${API_URL}/create-payment`);
        if (!response.data || !response.data.paymentId) {
            console.error("Payment ID not found in response");
            return "";
        }
        return response.data.paymentId;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}