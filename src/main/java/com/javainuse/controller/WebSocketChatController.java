package com.javainuse.controller;

import com.javainuse.domain.WebSocketChatMessage;
import com.javainuse.storage.UserStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class WebSocketChatController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{to}")
    public void sendMessage(@DestinationVariable String to, WebSocketChatMessage message) {
        System.out.println("handling send message: " + message + " to: " + to);
        boolean isExists = UserStorage.getInstance().getUsers().contains(to);
        if (isExists) {
            simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
        }
    }
}
