package com.javainuse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = { "com.javainuse.controller" })
public class SpringBootWebsocketChatApplication {
    public static void main(String[] args) {

        SpringApplication.run(SpringBootWebsocketChatApplication.class, args);
    }
}
