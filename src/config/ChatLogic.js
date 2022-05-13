export const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}

export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
}

export const isSameSenderMargin = (messages, currentMessage, currentMessageIndex, userId) => {
    if (
        currentMessageIndex < messages.length - 1 &&
        messages[currentMessageIndex + 1].sender._id === currentMessage.sender._id &&
        messages[currentMessageIndex].sender._id !== userId
    )
        return 33;
    else if (
        (currentMessageIndex < messages.length - 1 &&
            messages[currentMessageIndex + 1].sender._id !== currentMessage.sender._id &&
            messages[currentMessageIndex].sender._id !== userId) ||
        (currentMessageIndex === messages.length - 1 && messages[currentMessageIndex].sender._id !== userId)
    )
        return 0;
    else return "auto";
};

export const isSameSender = (messages, currentMessage, currentMessageIndex, userId) => {
    return (
        currentMessageIndex < messages.length - 1 &&
        (messages[currentMessageIndex + 1].sender._id !== currentMessage.sender._id ||
            messages[currentMessageIndex + 1].sender._id === undefined) &&
        messages[currentMessageIndex].sender._id !== userId
    );
};

export const isLastMessage = (messages, index, userId) => {
    return (
        index === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
};

export const isSameUser = (messages, currentMessage, currentMessageIndex) => {
    return currentMessageIndex > 0 && messages[currentMessageIndex - 1].sender._id === currentMessage.sender._id;
};
