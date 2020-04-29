import React, {Component} from "react";
import ChatInput from "./ChatInput";

type ChatProps = {

}

type ChatState = {
    messages: any[];
}

class Chat extends Component<ChatProps, ChatState> {

    state = {
        messages: []
    };

    ws = new WebSocket('ws://127.0.0.1/ws/chat/');

    componentDidMount(): void {
        this.ws.onopen = () => {
            console.log("Conectado al chat");
            //this.ws.send("{target: 1234}")
        };

        this.ws.onmessage = event => {
            console.log(event);
            const message_data = JSON.parse(event.data);


            this.setState(state => ({messages: [...state.messages, message_data]}));
            console.log(this.state);
        };

        this.ws.onclose = () => {
            console.log("Desconectado");
        };
    }

    sendMessage = (msg: string) => {
        this.ws.send(msg);
    };

    render() {
        return (
            <div>
                {this.state.messages.map((m, i) => {
                    return (<div key={i}><b>{m['username']}</b>: {m['message']}</div>);
                    })
                }
                <ChatInput onSendMessage={(msg: string) => this.sendMessage(msg)}/>
            </div>
        );
    }
} export default Chat;