import * as express from "express";
import * as path from "path";
import * as morgan from "morgan";
import opn = require("opn");
import { AddressInfo } from "net";
import * as bodyParser from "body-parser";

let app = express();

app.use(morgan("dev"));

// tslint:disable:no-string-literal
// tslint:disable-next-line:no-var-requires
let blockDetailsMock = require(path.resolve("./mocks/sample-block.json"));
app.get("/api/block/:id", (req, res) => {
    if (Number(req.params.id) > 7000000) {
        res.send({
            status: 200,
            data: []
        });
        return;
    }
    res.send({
        ...blockDetailsMock,
        data: [{
            ...blockDetailsMock["data"][0],
            number: Number(req.params.id)
        }]
    });
});

// tslint:disable-next-line:no-var-requires
let uncleDetailsMock = require(path.resolve("./mocks/sample-uncle.json"));
app.get("/api/uncle/:hash", (req, res) => {
    res.send({
        ...uncleDetailsMock,
        data: [{
            ...uncleDetailsMock["data"][0],
            blockHash: req.params.hash
        }]
    });
});

// tslint:disable:no-string-literal
// tslint:disable-next-line:no-var-requires
let txDetailsMock = require(path.resolve("./mocks/sample-tx.json"));
app.get("/api/tx/:txHash", (req, res) => {
    res.send({
        ...txDetailsMock,
        data: [{
            ...txDetailsMock["data"][0],
            txHash: req.params.txHash
        }]
    });
});

// tslint:disable-next-line:no-var-requires
let cmDetailsMock = require(path.resolve("./mocks/sample-cm.json"));
app.get("/api/cm/:txHash/:validationIndex", (req, res) => {
    res.send({
        ...cmDetailsMock,
        data: [{
            ...cmDetailsMock["data"][0],
            txHash: req.params.txHash,
            txMsgValidationIndex: req.params.txMsgValidationIndex
        }]
    });
});

// tslint:disable-next-line:no-var-requires
let txLogEvents = require(path.resolve("./mocks/sample-tx-log-events.json"));
app.get("/api/tx/:txHash/log-events", (req, res) => {
    res.send({
        ...txLogEvents,
        data: txLogEvents.data.map((evL: any) => ({
            ...evL,
            txHash: req.params.txHash
        }))
    });
});

// tslint:disable-next-line:no-var-requires
let cmLogEvents = require(path.resolve("./mocks/sample-cm-log-events.json"));
app.get("/api/tx/:txHash/cm/:validationIndex/log-events", (req, res) => {
    res.send({
        ...cmLogEvents,
        data: cmLogEvents.data.map((evL: any) => ({
            ...evL,
            txHash: req.params.txHash,
            txMsgValidationIndex: req.params.txMsgValidationIndex
        }))
    });
});

// tslint:disable-next-line:no-var-requires
let accountDetailsMock = require(path.resolve("./mocks/sample-account.json"));
app.get("/api/account/:accountHash", (req, res) => {
    if (req.params.accountHash.match(/^0+$/)) {
        res.send({
            status: 200,
            data: []
        });
        return;
    }
    res.send({
        ...accountDetailsMock,
        data: [{
            ...accountDetailsMock["data"][0],
            address: req.params.accountHash.replace(/^0x/, "")
        }]
    });
});

// tslint:disable-next-line:no-var-requires
let balanceMock = require(path.resolve("./mocks/sample-balance.json"));
app.post("/api/balance", bodyParser.json(), (req, res) => {
    let tokens: string[] = req.body.tokens;
    let blockNumber: number = req.body.blockNumber;
    let days: number = req.body.days;

    let sampleEthBalance = balanceMock[0];

    let resultAccountBalance = [];
    let ethResult = {
        ...sampleEthBalance,
        chart: reduceChartForNumberOfDays(sampleEthBalance.chart, blockNumber, days)
    };
    resultAccountBalance.push(ethResult);

    let sampleTokenBalance = balanceMock[1];
    let tokenResult = {
        ...sampleTokenBalance,
        chart: reduceChartForNumberOfDays(sampleTokenBalance.chart, blockNumber, days)
    };
    tokens.reduce((tokenResultArray: any, token: string, idx: number) => {
        tokenResultArray.push({
            ...tokenResult,
            currency: {
                ...tokenResult.currency,
                address: token
            },
            token
        });
        return tokenResultArray;
    }, resultAccountBalance);

    res.send(resultAccountBalance);
});
function reduceChartForNumberOfDays(chart: any, blockNumber: number, days: number) {
    return chart.reduce((acc: any, item: any, idx: number) => {
        if (idx < days) {
            acc.push({
                ...item,
                block: blockNumber - (idx * 5700)
            });
        }
        return acc;
    }, []);
}

// tslint:disable-next-line:no-var-requires
let txTokensMock = require(path.resolve("./mocks/sample-tokens.json"));
app.get("/api/tx-tokens/:txHash", (req, res) => {
    res.send(txTokensMock);
});

// tslint:disable-next-line:no-var-requires
let txCmMock = require(path.resolve("./mocks/sample-tx-cm.json"));
app.get("/api/tx-cm/*", (req, res) => {
    res.send(txCmMock);
});

app.get("/api/cm/cm/*", (req, res) => {
    res.send(txCmMock);
});

app.get("/api/cm-tokens/*", (req, res) => {
    res.send(txTokensMock);
});

app.get("/api/block-range/:start/:end", (req, res) => {
    let start = parseInt(req.params.start, 10);
    let end = Math.min(5000001, Math.max(start, parseInt(req.params.end, 10)));
    let response = {
        status: 200,
        data: [] as any[]
    };

    for (let i = 0; i < end - start; ++i) {
        let x = start + i;
        let scaleFactor = 3;
        let value = 1 / 3 * (1 + Math.abs(Math.sin(x / (10 * scaleFactor) * Math.PI)) + Math.cos(x / scaleFactor));
        response.data.push({
            blockNumber: start + i,
            txCount: Math.floor(value * 299) + 1,
            txValue: Math.floor(value * 15 * Math.pow(10, 18)) + Math.pow(10, 18)
        });
    }
    res.send(response);
});

// tslint:disable-next-line:no-var-requires
let pricesMock = require(path.resolve("./mocks/sample-prices.json"));
app.post("/api/prices", bodyParser.json(), (req, res) => {
    let tokens: string[] = req.body.tokens;
    let blocks: number[] = req.body.blocks;
    let result: any = {};

    function getBlockPriceByIndex(data: any, idx: number) {
        let keys = Object.keys(data);
        let keyIndex = idx % keys.length;
        return data[keys[keyIndex]];
    }

    let sampleTokenData: any = pricesMock["result"]["0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d"];
    tokens.forEach(token => {
        let prices: any = {};
        blocks.forEach((block, idx) => {
            prices[block] = getBlockPriceByIndex(sampleTokenData["prices"], idx);
        });
        result[token] = {
            ...sampleTokenData,
            prices
        };
    });

    let ethMock = pricesMock["result"]["ETH"];
    let ethPrices: any = {};
    blocks.forEach((block, idx) => {
        ethPrices[block] = getBlockPriceByIndex(ethMock["prices"], idx);
    });
    result["ETH"] = {
        ...ethMock,
        prices: ethPrices
    };

    res.send({
        code: 200,
        result
    });
});

// tslint:disable-next-line:no-var-requires
let triggerGraph = require(path.resolve("./mocks/triggerGraph.json"));
// tslint:disable-next-line:no-var-requires
let accountInteractionGraph = require(path.resolve("./mocks/accountInteractionGraph.json"));
// tslint:disable-next-line:no-var-requires
let messageGraph = require(path.resolve("./mocks/messageGraph.json"));
app.get("/api/tx-graphs/:txHash/:graphType", (req, res) => {
    if (req.params.graphType === "trigger") {
        res.send(triggerGraph);
    } else if (req.params.graphType === "account-interaction") {
        res.send(accountInteractionGraph);
    } else if (req.params.graphType === "message") {
        res.send(messageGraph);
    } else {
        res.send();
    }
});

app.get("/api/search/:hash", (req, res) => {
    setTimeout(() => {
        res.send({
            status: 200,
            data: {
                entity: "tx"
            }
        });
    }, 2000);
});

let server = app.listen(Number(process.env.PORT) || 3000, process.env.HOST || "127.0.0.1", () => {
    let address = server.address() as AddressInfo;
    process.stdout.write(`Listening on ${address.address + ":" + address.port}\n`);

    opn(`http://localhost:${address.port}`);
});
