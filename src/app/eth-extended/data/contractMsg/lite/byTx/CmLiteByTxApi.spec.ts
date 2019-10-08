import * as assert from "assert";
import * as TypeMoq from "typemoq";
import { CmLiteByTxApi } from "app/eth-extended/data/contractMsg/lite/byTx/CmLiteByTxApi";
import { CmLiteReader } from "app/eth-extended/data/contractMsg/lite/CmLiteReader";
import { HttpApi } from "app/shared/data/HttpApi";
import { CmType } from "app/eth-extended/data/contractMsg/CmType";
import { BigNumber } from "app/util/BigNumber";

// tslint:disable:object-literal-key-quotes
let mockResult = [
    {
        "blockCreationTime": 1476417575,
        "contractMsgsTriggered": 0,
        "fee": "51088000000824",
        "from": "d8ce0fbcabb206a743917aadf2c409c8eb3c45cf",
        "includedInBlock": 2436554,
        "msgCallDepth": 1,
        "msgError": false,
        "msgErrorString": "",
        "msgGasLimit": "36979",
        "msgGasUsed": "824",
        "parentTxMsgValidationIndex": 0,
        "to": "e51d0677737cc0b6e7706ea35c384454e86b27e9",
        "txGasPrice": "62000000001",
        "txHash": "30f52bee14ea6774ae40c114bd556d3bb2c2786a8b98ac4c8235976deda526c1",
        "txMsgValidationIndex": 1,
        "type": "CreateContractMsg",
        "value": "0"
    }, {
        "blockCreationTime": 1476417575,
        "contractMsgsTriggered": 1,
        "fee": "372000000006",
        "from": "d8ce0fbcabb206a743917aadf2c409c8eb3c45cf",
        "includedInBlock": 2436554,
        "msgCallDepth": 1,
        "msgError": false,
        "msgErrorString": "",
        "msgGasLimit": "6",
        "msgGasUsed": "6",
        "parentTxMsgValidationIndex": 0,
        "to": "e51d0677737cc0b6e7706ea35c384454e86b27e9",
        "txGasPrice": "62000000001",
        "txHash": "30f52bee14ea6774ae40c114bd556d3bb2c2786a8b98ac4c8235976deda526c1",
        "txMsgValidationIndex": 2,
        "type": "CallContractMsg",
        "value": "0"
    }
];

describe("data/" + CmLiteByTxApi.name, () => {
    const createApi = (result: any) => {
        let httpApiMock = TypeMoq.Mock.ofType(HttpApi, TypeMoq.MockBehavior.Strict);
        httpApiMock.setup(x => x.fetchList(TypeMoq.It.isValue("test://url")))
            .returns(() => Promise.resolve(result));
        let contractMsgApi = new CmLiteByTxApi(httpApiMock.object, new CmLiteReader(), "test://url");
        return contractMsgApi;
    };

    it("should fetch", async () => {
        let contractMsgApi = createApi(mockResult);
        let txHash = "0xff";

        let result = await contractMsgApi.fetch(txHash);
        assert.equal(result.length, 2);
        assert.strictEqual(result[0].from, "d8ce0fbcabb206a743917aadf2c409c8eb3c45cf");
        assert.strictEqual(result[0].to, "e51d0677737cc0b6e7706ea35c384454e86b27e9");
        assert.deepEqual(result[0].value, new BigNumber(0));
        assert.strictEqual(result[0].type, CmType.Create);
    });
});
