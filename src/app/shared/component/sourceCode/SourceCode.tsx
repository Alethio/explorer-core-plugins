import * as React from "react";

let monacoEnvPatched = false;

export interface ISourceCodeProps {
    monaco: typeof import("monaco-editor/esm/vs/editor/editor.api");
    options: import("monaco-editor/esm/vs/editor/editor.api").editor.IStandaloneEditorConstructionOptions;
    height?: number | string;
}

/**
 * Source code component similar to react-monaco-editor, but doesn't import the entire monaco-editor
 *
 * NB: Doesn't support dynamic updates to props
 */
export class SourceCode extends React.Component<ISourceCodeProps> {
    private el: HTMLElement;
    private editor: import("monaco-editor/esm/vs/editor/editor.api").editor.IStandaloneCodeEditor;

    componentDidMount() {
        setTimeout(async () => {
            if (!monacoEnvPatched) {
                monacoEnvPatched = true;
                // Monkey patch the getWorkerUrl method defined by monaco-editor-webpack-plugin
                // to allow cross-origin worker loading
                let oldGetWorkerUrl = (self as any).MonacoEnvironment.getWorkerUrl;
                (self as any).MonacoEnvironment.getWorkerUrl = (moduleId: string, label: string) => {
                    let workerUrl = oldGetWorkerUrl(moduleId, label).replace("\\", "/");
                    return "data:text/javascript;charset=utf-8," + encodeURIComponent(
                        `importScripts('${
                            workerUrl.match(/^https?:/) ? workerUrl : location.origin + "/" + workerUrl
                        }');`
                    );
                };
            }

            this.editor = this.props.monaco.editor.create(this.el, this.props.options);
        });
    }

    componentWillUnmount() {
        this.editor.dispose();
    }

    render() {
        return (
            <div ref={ref => this.el = ref!} style={{height: this.props.height}}></div>
        );
    }
}
