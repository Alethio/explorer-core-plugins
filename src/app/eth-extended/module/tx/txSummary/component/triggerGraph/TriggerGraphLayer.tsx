import * as React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { Label } from "@alethio/ui/lib/data/Label";
import { Layer } from "@alethio/ui/lib/overlay/Layer";
import { Mask } from "@alethio/ui/lib/overlay/Mask";
import { CloseIcon } from "@alethio/ui/lib/icon/CloseIcon";
import { ToolbarIconButton } from "@alethio/ui/lib/layout/toolbar/ToolbarIconButton";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { ITranslation } from "plugin-api/ITranslation";
import { ILogger } from "plugin-api/ILogger";
import { TxGraphStore } from "app/eth-extended/data/tx/graph/TxGraphStore";
import { SelectGraph } from "./SelectGraph";
import { SelectFields } from "./SelectFields";
import { TriggerGraphLayerContent } from "./TriggerGraphLayerContent";

const StyledLayer = styled(Layer)`
    width: 90vw;
    height: 80vh;
    min-height: 400px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.colors.overlayToolbarBorder};
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
    padding: 8px;
`;

const CloseIconContainer = styled.div`
    padding: 14px;
`;
const TypeContainer = styled.div`
    display: flex;
    padding: 12px;
    align-items: center;
`;

const Content = styled.div`
    flex-grow: 1;
    position: relative;
`;

export interface ITriggerGraphLayerProps {
    open: boolean;
    txHash: string;
    txGraphStore: TxGraphStore;
    translation: ITranslation;
    logger: ILogger;
    onRequestClose?(): void;
}
@observer
export class TriggerGraphLayer extends React.Component<ITriggerGraphLayerProps> {
    private selectFields: SelectFields;

    constructor(props: ITriggerGraphLayerProps) {
       super(props);
       this.selectFields = new SelectFields(props.translation);
    }

    componentDidUpdate(prevProps: ITriggerGraphLayerProps) {
        if (this.props.translation !== prevProps.translation) {
            let oldSelectedField = this.selectFields.getSelectedField();
            this.selectFields = new SelectFields(this.props.translation);
            this.selectFields.setSelectedField(oldSelectedField.key);
        }
    }

    render() {
        let { open } = this.props;

        return ( open ?
            ReactDOM.createPortal(<>
                <Mask />
                <StyledLayer>
                    <Header>
                        <TypeContainer>
                            <Label>
                                {this.props.translation.get("txView.content.txSummary.graphSelect.type.label")}
                            </Label>
                            <SelectGraph fields={this.selectFields}/>
                        </TypeContainer>
                        <CloseIconContainer>
                            <ToolbarIconButton Icon={CloseIcon} onClick={this.props.onRequestClose} />
                        </CloseIconContainer>
                    </Header>
                    <Content>
                        <TriggerGraphLayerContent
                            txHash={this.props.txHash}
                            txGraphStore={this.props.txGraphStore}
                            graphType={this.selectFields.getSelectedField().key}
                            translation={this.props.translation}
                            logger={this.props.logger}
                        />
                    </Content>
                </StyledLayer>
            </>, document.body) :
            null
        );
    }
}
