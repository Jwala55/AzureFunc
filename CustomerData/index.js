const {
    CosmosClient
} = require("@azure/cosmos");

const endpoint = "https://cosmos-ingage.documents.azure.com:443/";
const key = "DI96w7N4PlVBw3ytnP7lCP6umh8Ck4Q4H9NRYJHilm8gPXV7JPWIkxm7cQKUAR2hyEqlbpralM4grUokHJRdXw==";

const cosmosClient = new CosmosClient({ endpoint, key });
const database = cosmosClient.database('ingage').container('logs');

module.exports = async function (context, req) {
    context.log("JavaScript HTTP trigger function processed a request.");
    console.log(req.body);

    const querycus = {
        query: 'SELECT c.customer.customerDetails.mobile FROM c WHERE c.customer.customerDetails.mobile = @mobile',
        parameters: [{
            name: '@mobile',
            value: '91999999999'
        }
            // {
            //     name: '@name',
            //     value: req.body.customer.customerDetails.name
            // },
            // {
            //     name: '@email',
            //     value: req.body.customer.customerDetails.email
            // }
        ]
    };

    const {
        resources: result
    } = await database.items.query(querycus).fetchAll();

    context.log(result);

    const customerData = req.body;
    context.log(customerData);

    if (Object.keys(result).length != 0) {   //checks if the customer is present, creates a doc for customer

        database.items.create({
            ...(req.body || {}),
            client: 'customer'
        });

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "customer is there"

        };

    }

    else {
        // context.res = {
        //     body: "Check customer"
        // }
        database.items.create({
            ...(req.body.customer || {}),
            client: 'customer'
        });
    }

}