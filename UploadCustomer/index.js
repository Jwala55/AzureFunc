const {
    CosmosClient
} = require("@azure/cosmos");

const endpoint = "https://cosmos-ingage.documents.azure.com:443/";
const key = "DI96w7N4PlVBw3ytnP7lCP6umh8Ck4Q4H9NRYJHilm8gPXV7JPWIkxm7cQKUAR2hyEqlbpralM4grUokHJRdXw==";

const cosmosClient = new CosmosClient({ endpoint, key });
const db = cosmosClient.database('ingage').container('logs');
module.exports = async function (context, req) {
    // const cities = [
    //     { id: "1", name: "Olympia", state: "WA", isCapitol: true },
    //     { id: "2", name: "Redmond", state: "WA", isCapitol: false },
    //     { id: "3", name: "Chicago", state: "IL", isCapitol: false }
    // ];
    // for (const city of cities) {
    //     db.items.create(city);
    // }

    // const { resources } = await db.items
    //     .query("SELECT * from c WHERE c.isCapitol = true")
    //     .fetchAll();
    // for (const city of resources) {
    //     context.log(`${city.name}, ${city.state} is a capitol `);
    // }

    const cus = {
        "customer": {
            "customerDetails": {
                "mobile": "91999999999",
                "name": "firstName",
                "email": "m@m.co"
            }
        },
        "bill": {
            "billNumber": "SC01010101010109428357056",
            "billAmt": 66.67,
            "billGrossAmount": 70,
            "billDiscount": 0,
            "cashierId": "100979",
            "companyCode": "",
            "notes": "",
            "returnBillNum": "",
            "billType": "Regular",
            "storeID": "",
            "storeTerminalID": "",
            "currency": "AED"
        },
        "billLineItems": {
            "lineItems": [{
                "stockNo": "ITEM ID 001",
                "description": "Description of the item",
                "markdownFlag": "N",
                "quantity": 1,
                "rate": 30,
                "value": 30,
                "discount": 0,
                "amount": 28.57,
                "grossAmount": 30,
                "billNumber": "091000000000001"
            }]
        },
        "paymentMode": {
            "paymentModeDetails": [{
                "payModeType": "Cash (SAR)",
                "value": 50
            },
            {
                "payModeType": "Card payment Credit",
                "value": 17
            }
            ]
        },
        "coupon": {
            "couponDetails": {
                "couponCode": "",
                "couponValue": "",
                "couponType": ""
            }
        },
        "transDate": "2018-11-29T08:27:02.541Z",
        "receiptId": "R7298869783",
        "totalTrans": 50,
        "totalTransValue": 5050
    }
    context.log(cus);
    db.items.create(cus);

}