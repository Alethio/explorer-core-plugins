import * as assert from "assert";
import * as TypeMoq from "typemoq";
import { Decoder } from "./Decoder";
import { ILogger } from "plugin-api/ILogger";

describe("data/" + Decoder.name, () => {
    let loggerMock = TypeMoq.Mock.ofType<ILogger>();
    let payload =
        "a9059cbb00000000000000000000000005585460dc690ca3e1944f3093d46404906a" +
        "a347000000000000000000000000000000000000000000000058b00f9419bb100000";
    let decodeRules = {
        methodID: "0xa9059cbb",
        method: "function transfer(address to, uint256 value) public returns (bool)",
        inputs: [{
            name: "to",
            type: "address",
            value: "00000000000000000000000005585460dc690ca3e1944f3093d46404906aa347"
        }, {
            name: "value",
            type: "uint256",
            value: "000000000000000000000000000000000000000000000058b00f9419bb100000"
        }]
    };

    it("should return undefined for empty payload or empty rules", () => {
        let decoder = new Decoder(loggerMock.object);
        let decodedPayload = decoder.decode(void 0, decodeRules);
        assert.equal(decodedPayload, void 0);
        decodedPayload = decoder.decode(payload, void 0);
        assert.equal(decodedPayload, void 0);
        decodedPayload = decoder.decode(void 0, void 0);
        assert.equal(decodedPayload, void 0);
    });

    it("should decode payload", () => {
        let decoder = new Decoder(loggerMock.object);
        let decodedPayload = decoder.decode(payload, decodeRules);

        assert.notEqual(decodedPayload, void 0);
        if (decodedPayload) {
            assert.equal(decodedPayload.method, "function transfer(address to, uint256 value) public returns (bool)");
            assert.equal(decodedPayload.methodID, "0xa9059cbb");
            assert.equal(decodedPayload.inputs instanceof Array, true);

            if (decodedPayload.inputs) {
                assert.equal(
                    decodedPayload.inputs[0].value,
                    "00000000000000000000000005585460dc690ca3e1944f3093d46404906aa347"
                );
                assert.equal(
                    decodedPayload.inputs[1].value,
                    "000000000000000000000000000000000000000000000058b00f9419bb100000"
                );
            }
        }
    });
});
