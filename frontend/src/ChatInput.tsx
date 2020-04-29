import React, {Component} from "react";

type ChatInputProps = {
    onSendMessage: any
};

type ChatInputState = {
    message: string
};

class ChatInput extends Component<ChatInputProps, ChatInputState> {

    state = {
        message: ''
    };

    render() {
        return (
            <form
                onSubmit={ e => {
                    e.preventDefault();
                    this.props.onSendMessage(this.state.message);
                    this.setState({message: ''});
                }}
            >
                <input
                    type="text"
                    placeholder="Introduce mensaje..."
                    value={this.state.message}
                    onChange={ e => this.setState({message: e.target.value})}
                />
                <input type="submit" value="Enviar"/>
            </form>
        );
    }
} export default ChatInput;