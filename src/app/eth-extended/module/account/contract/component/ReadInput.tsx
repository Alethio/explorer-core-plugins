import React from "react";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { observer } from "mobx-react";
import { observable } from "mobx";

interface IReadInputProps {
    value: string;
    name: string;
    placeholder: React.ReactNode;
    onChange?(value: string): void;
}

const InputFieldWrapper = styled.div`
    position: relative;
    font-family: "Roboto Mono", monospace;
`;
const InputField = styled.input`
    border: 1px solid ${({theme}) => theme.colors.readInputBoxBorder };
    background-color: ${({theme}) => theme.colors.readInputBoxBg };
    color: ${({theme}) => theme.colors.readInputBoxText };
    outline: none;
    width: 468px;
    padding: 9px 15px;
    border-radius: 4px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.04);
`;
const InputFieldPlaceholder = styled.div`
    position: absolute;
    pointer-events: none;
    font-size: 14px;
    left: 15px;
    top: 11px;
`;

@observer
export class ReadInput extends React.Component<IReadInputProps> {
    @observable
    private inputFocus: boolean;

    render() {
        let { value, placeholder } = this.props;
        return (
            <InputFieldWrapper>
                { (!value && !this.inputFocus) ?
                <InputFieldPlaceholder>
                    { placeholder }
                </InputFieldPlaceholder>
                : null }
                <InputField
                    type="text"
                    value={value}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    onFocus={() => { this.inputFocus = true; }}
                    onBlur={() => { this.inputFocus = false; }}
                    onChange={(event) => {
                        if (this.props.onChange) {
                            this.props.onChange(event.target.value);
                        }
                    }}
                />
            </InputFieldWrapper>
        );
    }
}
