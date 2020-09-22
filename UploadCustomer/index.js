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
                "mobile": "91999999999", // customer mobile number 
                "name": "firstName", // name of customer 
                "email": "m@m.co" // email of customer 
            },
            "totalTrans": "50",
            "totalTransValue": "5050"

        }
    }
    context.log(cus);
    db.items.create(cus);

}