import { StandardProps } from '@tarojs/components/types/common';
import Taro from '@tarojs/taro';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import "./index.scss";

export interface Message {
    user?: string
    text?: string
}
export interface MessageData extends StandardProps {
    messages: Message[]
    currentUser: string
}
const ChatBubble = ({ user, message }) => {
    const isCurrentUser = user === message.user;
    return (
        <View style={[styles.chatBubble, isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble]}>
            <TouchableOpacity onLongPress={
                (event) => {
                    Taro.setClipboardData({
                        data: message.text,
                        success(res) {
                            console.log('copy data', res) // data
                        }
                    })
                }}>
                <View >
                    <Text style={[styles.chatText, isCurrentUser ? styles.currentUserText : styles.otherUserText]}>{message.text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
const ChatDialog = (props: MessageData) => {
    const { currentUser, messages } = props;

    return (
        <View className='chat_container' {...props}>
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
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-start',
    },
    currentUserBubble: {
        alignSelf: 'flex-end',
        // backgroundColor: '#0080ff',
        backgroundColor: '#33CC66'
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