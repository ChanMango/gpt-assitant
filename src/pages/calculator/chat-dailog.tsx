import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import "./index.scss";
export interface Message {
    user?: string
    text?: string
}
export interface MessageData {
    messages: Message[]
    currentUser: string
}
const ChatBubble = ({ user, message }) => {
    const isCurrentUser = user === message.user;
    // {
    //     Alert.alert('Alert Title', 'is current user= ' + String(isCurrentUser), [
    //         {
    //             text: 'Cancel',
    //             onPress: () => console.log('Cancel Pressed'),
    //             style: 'cancel',
    //         },
    //         { text: 'OK', onPress: () => console.log('OK Pressed') },
    //     ]);
    // }
    return (
        <View style={[styles.chatBubble, isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble]}>
            {/* <View  style={[styles.chatBubble, isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble]}> */}
            <Text style={[styles.chatText, isCurrentUser ? styles.currentUserText : styles.otherUserText]}>{message.text}</Text>
        </View>
    );
};
const ChatDialog = (props: MessageData) => {
    const { currentUser, messages } = props;

    return (
        <View className="chat_container">
            {messages.map((msg, index) => {
                return (
                    <ChatBubble key={index} message={msg} user={currentUser} />
                );
            })}
        </View>
    );
};
const styles = StyleSheet.create({

    chatBubble: {
        alignSelf: 'flex-start',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        // backgroundColor: '#ccc',
    },
    otherUserBubble: {
        backgroundColor: '#00ffff',
        alignSelf: 'flex-start',
    },
    currentUserBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#0080ff',
    },
    chatText: {
        fontSize: 16,
        color: '#000',
    },
    otherUserText: {
        // with: '100%',
        color: '#000',
    },
    currentUserText: {
        color: '#fff',
    },
});
export default ChatDialog;