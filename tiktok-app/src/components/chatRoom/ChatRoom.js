import ThreadMessage from "../threadMessage/threadMessage";
import {IoIosMore} from "react-icons/io";
import Button from "../button/Button";
import {IoSend} from "react-icons/io5";
import "./chatRoom.scss"
import {useEffect, useState} from "react";
import {Client} from "@stomp/stompjs";
import {useSearchParams} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa6";
import Avatar from "../avatar/avatar";

let stompClient = null;
export default function ChatRoom({title, exitChatRoom}) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [messages, setMessages] = useState([{
        senderName: 'tung',
        message: 'afasddfasdfsdf asdf a sadf ad sf sad f asdf a dsf a d fa ds f as df a sdf as df as dfasa f asad f as f asaf as df s df as fs f sa fsd'
    },
        {
            senderName: '3',
            message: 'afasddfasdfsdf asdf a sadf ad sf sad f asdf a dsf a d fa ds f as df a sdf as df as dfasa f asad f as f asaf as df s df as fs f sa fsd'
        },
    ])
    const currentUser = searchParams.get("user");
    const [userData, setUserData] = useState({
        username: '',
        receiverName: '',
        connected: false,
        message: ''
    });

    useEffect(() => {
        connect()
        setUserData({...userData, username: currentUser})
    }, [])

    const connect = () => {
        stompClient = new Client({
                // brokerURL: "ws://localhost:8080/ws",
                webSocketFactory: () => {
                    return new WebSocket("ws://localhost:8080/ws");
                },
                debug: function (str) {
                    console.log(str);
                },
                reconnectDelay: 50000,
            }
        )

        stompClient.onConnect = (frame) => {
            stompClient.subscribe('/user/' + 'room' + '/private', (message) => {
                const parsedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, parsedMessage]);
            }, {})
        }

        stompClient.activate()
    }


    const sendMessage = (e) => {
        e.preventDefault()

        if (userData.message.trim()) {
            const chatMessage = {
                senderName: userData.username,
                receiverName: 'room',
                message: userData.message,
                status: "MESSAGE"
            };

            stompClient.publish({
                    destination: "/app/private-message",
                    body: JSON.stringify(chatMessage),
                    headers: {}
                }
            );

            setUserData({...userData, message: ''});
        }
    };

    return (<>
        <div className={"chat_room flex flex-col fixed top-0 left-0 right-0 bottom-0 z-30"}>
            <header className={"px-2 flex items-center justify-between bg-second_primary-900"}>
                <div className={"flex items-center justify-between"}>
                    <Button onClick={exitChatRoom} rounded={"rounded-xl"} iconComponent={<FaArrowLeft className={"text-primary-700"}/>}/>
                    <ThreadMessage disabled
                                   image={"data:image/jpeg;base64,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"}
                                   title={title}/>
                </div>
                <Button rounded={"rounded-xl"} iconComponent={<IoIosMore className={"text-primary-700"}/>}/>
            </header>
            <div className={"flex-1 flex flex-col bg-blue-400 px-2 overflow-y-auto"}>
                {messages.map((mess) => {
                    return <>
                        {currentUser === mess.senderName ?
                            <div className={"flex justify-end my-1 w-11/12 self-end"}>
                                <div className={"max-w-full break-words bg-second_primary-700 rounded-2xl px-3 py-2 text-wrap text-second_primary-0 "}>
                                    {mess.message}
                                </div>
                            </div> :
                            <div className={"w-11/12 flex justify-end items-end flex-row-reverse my-1 "}>
                                <div
                                    className={"max-w-full ml-1 chat_message break-words bg-second_primary-700 rounded-2xl px-3 py-2 text-wrap text-second_primary-0 "}>
                                    {mess.message}
                                </div>
                                <Avatar baseBot size={30}>{mess.senderName}</Avatar>
                            </div>}
                    </>
                })}
            </div>
            <footer className={"flex items-center justify-between p-3"}>
                <form className={"flex items-center justify-between flex-1"} onSubmit={sendMessage}>
                    <input
                        value={userData.message}
                        onChange={(e) => {
                            setUserData({...userData, message: e.target.value});
                        }}
                        className={"break-words chat_input max-h-44 outline-none flex-1 rounded-2xl px-3 py-2 resize-none text-second_primary-0 bg-second_primary-700"}></input>
                    <IoSend type={"submit"} className={"text-xl ml-2 text-primary-700"}/>
                </form>
            </footer>
        </div>
    </>)
}