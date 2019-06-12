import * as React from "react";

export interface IHashPasteHandlerProps {
    onPaste(hash: string): void;
}

export class HashPasteHandler extends React.Component<IHashPasteHandlerProps> {
    render() {
        return null;
    }

    componentDidMount() {
        document.addEventListener("paste", this.handlePaste);
    }

    componentWillUnmount() {
        document.removeEventListener("paste", this.handlePaste);
    }

    private handlePaste = (e: ClipboardEvent) => {
        let activeEl = document.activeElement;
        if ((activeEl as HTMLInputElement).value !== void 0 || (activeEl as HTMLElement).isContentEditable) {
            // We ignore paste event on form or editable elements
            return;
        }

        let text = e.clipboardData!.getData("text/plain").trim();
        // Should be non-empty string and it should look like a hash or block number
        if (text && text.match(/^(0x)?[a-fA-F0-9]+$/)) {
            this.props.onPaste(text);
        }
    }
}
