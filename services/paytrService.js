import crypto from 'crypto';
import fetch from 'node-fetch'; // Eğer fetch kullanıyorsanız

export const getPaytrToken = async (paymentData) => {
    try {
        const merchant_id = process.env.MERCHANT_ID;
        const merchant_key = process.env.MERCHANT_KEY;
        const merchant_salt = process.env.MERCHANT_SALT;
        const test_mode = process.env.TEST_MODE || '0';

        const {
            email,
            payment_amount,
            user_name,
            user_address,
            user_phone,
            user_ip,
            user_basket
        } = paymentData;

        const merchant_oid = "IN" + Date.now(); // Sipariş numarası
        const max_installment = '0';
        const no_installment = '0';
        const currency = 'TL';
        const merchant_ok_url = process.env.MERCHANT_OK_URL;
        const merchant_fail_url = process.env.MERCHANT_FAIL_URL;
        const timeout_limit = 30;
        const debug_on = 1;
        const lang = 'tr';

        // Hash string oluşturuluyor
        const hashSTR = `${merchant_id}${user_ip}${merchant_oid}${email}${payment_amount}${user_basket}${no_installment}${max_installment}${currency}${test_mode}`;
        const paytr_token = hashSTR + merchant_salt;

        // HMAC SHA256 ile token oluşturuluyor
        const token = crypto.createHmac('sha256', merchant_key).update(paytr_token).digest('base64');

        // API'ye POST isteği atılıyor
        const formData = {
            merchant_id,
            merchant_key,
            merchant_salt,
            email,
            payment_amount,
            merchant_oid,
            user_name,
            user_address,
            user_phone,
            merchant_ok_url,
            merchant_fail_url,
            user_basket,
            user_ip,
            timeout_limit,
            debug_on,
            test_mode,
            lang,
            no_installment,
            max_installment,
            currency,
            paytr_token: token
        };

        const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
        });

        const data = await response.json();
        return data; // PayTR'den gelen yanıtı döndür

    } catch (error) {
        throw new Error(error.message);
    }
};

// Callback verisi için hash doğrulama fonksiyonu
export const validatePaytrCallback = (callbackData) => {
    const { merchant_oid, status, total_amount, hash } = callbackData;

    const merchant_id = process.env.MERCHANT_ID;
    const merchant_key = process.env.MERCHANT_KEY;
    const merchant_salt = process.env.MERCHANT_SALT;

    const paytr_token = `${merchant_oid}${merchant_salt}${status}${total_amount}`;
    const calculatedToken = crypto
        .createHmac('sha256', merchant_key)
        .update(paytr_token)
        .digest('base64');

    console.log("Callback Data:", callbackData);
    console.log("Calculated Token:", calculatedToken);
    console.log("PayTR Provided Hash:", hash);

    // Hesaplanan token ile gelen hash'i karşılaştırıyoruz
    if (calculatedToken !== hash) {
        throw new Error("Hash mismatch! PayTR notification might be tampered.");
    }

    return true; // Hash doğrulandıysa true döner
};
