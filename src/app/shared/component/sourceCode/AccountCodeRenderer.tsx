import React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { SourceCodeAsyncRenderer } from "./SourceCodeAsyncRenderer";
import { evmLanguage } from "./evmLanguage";
import { evmDisasm } from "./evmDisasm";
import { removeSwarmSourceFromByteCode } from "./extractSwarmSourceFromByteCode";
import { CreationCodeSection } from "./CreationCodeSection";

export class AccountCodeRenderer {
    constructor(private sourceCodeAsyncRenderer: SourceCodeAsyncRenderer) {

    }
    /**
     * @param accountCodeLoader we pass a thunk instead of the account code so we can load it in parallel
     */
    async render(accountCodeLoader: () => Promise<string>, translation: ITranslation) {
        let [accountCode, monaco] = await Promise.all([
            accountCodeLoader(),
            import("monaco-editor/esm/vs/editor/editor.api"),
            this.sourceCodeAsyncRenderer.load()
        ]);

        // Setup syntax highlighting for op codes view
        monaco.languages.register({ id: "evm"});
        monaco.languages.setMonarchTokensProvider("evm", evmLanguage);
        let byteCodeEl = this.sourceCodeAsyncRenderer.render(
            accountCode,
            "",
            { wordWrap: "on", lineNumbers: "off" }
        );

        let opCode = evmDisasm(removeSwarmSourceFromByteCode(accountCode));
        let opCodeEl = this.sourceCodeAsyncRenderer.render(opCode, "evm");

        return <CreationCodeSection
            opCode={opCode}
            opCodeElement={opCodeEl}
            byteCode={accountCode}
            byteCodeElement={byteCodeEl}
            translation={translation}
        />;
    }
}
