import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../config/ChatLogic.js";
import { ChatState } from '../Context/ChatProvider';
import { useEffect, useRef } from 'react'

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    const observer = useRef();

    useEffect(() => {
        observer.current?.scrollIntoView();
    }, [messages])

    return (
        <>
            {messages &&
                messages.map((currentMessage, currentMessageIndex) => (
                    <div style={{ display: "flex" }} key={currentMessage._id}>
                        {(isSameSender(messages, currentMessage, currentMessageIndex, user._id) ||
                            isLastMessage(messages, currentMessageIndex, user._id)) && (
                                <Tooltip label={currentMessage.sender.name} placement="bottom-start" hasArrow>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={currentMessage.sender.name}
                                        src={currentMessage.sender.pic}
                                    />
                                </Tooltip>
                            )}
                        <span
                            style={{
                                backgroundColor: `${currentMessage.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                                    }`,
                                marginLeft: isSameSenderMargin(messages, currentMessage, currentMessageIndex, user._id),
                                marginTop: isSameUser(messages, currentMessage, currentMessageIndex, user._id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
                            {currentMessage.content}
                        </span>
                    </div>
                ))}
            <div ref={observer}></div>
        </>
    );
};

export default ScrollableChat;