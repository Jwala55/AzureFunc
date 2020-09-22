const {
    CosmosClient
} = require("@azure/cosmos");

// const endpoint = "https://cosmos-ingage.documents.azure.com:443/";
// const key = "DI96w7N4PlVBw3ytnP7lCP6umh8Ck4Q4H9NRYJHilm8gPXV7JPWIkxm7cQKUAR2hyEqlbpralM4grUokHJRdXw==";

// const cosmosClient = new CosmosClient({ endpoint, key });
// const database = cosmosClient.database('ingage').container('logs');

module.exports = async function (context, req) {
    if (req.body) {
        context.res = {
            body: req.body
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass a name in the request body"
        };
    }
}

