const {
    CosmosClient
} = require("@azure/cosmos");



const endpoint = "https://cosmos-ingage.documents.azure.com:443/";
const key = "DI96w7N4PlVBw3ytnP7lCP6umh8Ck4Q4H9NRYJHilm8gPXV7JPWIkxm7cQKUAR2hyEqlbpralM4grUokHJRdXw==";

const cosmosClient = new CosmosClient({ endpoint, key });
const database = cosmosClient.database('ingage').container('transactions');

module.exports = async function (context, req) {
    context.log("JavaScript HTTP trigger function processed a request.");

    const querycus = {
        query: 'SELECT * FROM c WHERE c.customer.customerDetails.mobile = @mobile ORDER BY c._ts DESC',
        parameters: [{
            name: '@mobile',
            value: req.body.customer.customerDetails.mobile
        }
        ]
    };

    const {
        resources: result
    } = await database.items.query(querycus).fetchAll();
    // context.log(result);

    if (Object.keys(result).length != 0) {   //checks if the customer is present, creates a doc for customer
        let flag = 0;
        for (let i = 0; i < result.length; i++) {
            if (result[i].bill.billNumber === req.body.bill.billNumber) {
                flag++;
            }
        }

        if (flag === 0) {
            const increTotalTrans = result[0].totalTrans + 1;
            const increTransVal = result[0].totalTransValue + req.body.bill.billAmt;

            context.log(increTotalTrans + " " + increTransVal);

            database.items.create({
                ...(req.body || {}),
                client: 'customer',
                totalTrans: increTotalTrans,
                totalTransValue: increTransVal
            });

            context.res = {
                body: "Updated Customer data"

            };
        }
        else {
            context.res = {
                body: "Cant use duplicate billNumber"
            }
        }

    }

    else {

        database.items.create({
            ...(req.body || {}),
            totalTrans: 1,
            totalTransValue: req.body.bill.billAmt
        });
        context.res = {
            body: "Customer Added"
        }
    }

}