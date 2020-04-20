package com.javainuse.controller;

import com.javainuse.domain.WebSocketChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Controller
public class WebSocketChatController {
    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public WebSocketChatMessage sendMessage(@Payload WebSocketChatMessage webSocketChatMessage) {

        return webSocketChatMessage;
    }

    @MessageMapping("/chat.register")
    @SendTo("/topic/public")
    public WebSocketChatMessage newUser(@Payload WebSocketChatMessage webSocketChatMessage,
                                        SimpMessageHeaderAccessor headerAccessor) {

        headerAccessor.getSessionAttributes().put("username", webSocketChatMessage.getSender());
        headerAccessor.getSessionId();
        Map<String,String> map=new HashMap<>();
        map.put(headerAccessor.getDestination(),webSocketChatMessage.toString());
        return webSocketChatMessage;
    }
}
