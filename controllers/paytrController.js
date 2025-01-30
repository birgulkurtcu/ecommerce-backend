import { getPaytrToken, validatePaytrCallback } from "../services/paytrService.js";
import {render} from "ejs";

// PayTR Token isteği
export const requestPaytrToken = async (req, res) => {
    try {
        const paymentData = req.body;
        const data = await getPaytrToken(paymentData);

        if (data.status === 'success') {
            res.render('layout', { iframetoken: req.query.token });

        } else {
            res.status(400).json({ success: false, message: data.reason });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// PayTR Callback kontrolü
export const handlePaytrCallback = (req, res) => {
    try {
        const callbackData = req.body;

        // Callback hash doğrulaması
        validatePaytrCallback(callbackData);

        // Callback'in başarılı olduğu durum
        if (callbackData.status === 'success') {
            // Ödeme başarılıysa işlem yapılabilir (örneğin, sipariş onaylama vb.)
            res.send('OK');
        } else {
            // Ödeme başarısızsa yapılacak işlemler
            res.send('FAILED');
        }
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid callback", error: error.message });
    }
};
