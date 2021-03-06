'use strict';
document.querySelector('#welcomeForm').addEventListener('submit', connect, true)
document.querySelector('#dialogueForm').addEventListener('submit', sendMessage, true)
var stompClient = null;
var name = null;
var receiver = null;
var listOfActiveUsers = [];
var selectedUser = '';
const url = 'http://localhost:8080';
function connect(event) {

    name = document.querySelector('#name').value.trim();
	$.get(url + "/registration/" + name, function (response) {
            connectToChat(name);
        }).fail(function (error) {
            if (error.status === 400) {
                alert("Login is already busy!")
            }
     })

	event.preventDefault();
}


function connectToChat(name){
	if (name) {
		document.querySelector('#welcome-page').classList.add('hidden');
		document.querySelector('#dialogue-page').classList.remove('hidden');
		var socket = new SockJS('/javatechie');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, connectionSuccess);
	}
}
function connectionSuccess() {
	//stompClient.subscribe('/topic/public/user', onMessageReceived);
    stompClient.subscribe("/topic/messages/" + name, function (response) {
                let data = JSON.parse(response.body);
//                if (selectedUser === data.fromLogin) {
//                    render(data.message, data.fromLogin);
            var usernameElement = document.createElement('span');
                var usernameText = document.createTextNode(data.fromLogin + ':' +  data.message);
                usernameElement.appendChild(usernameText);
                var messageElement = document.createElement('li');
                messageElement.appendChild(usernameElement);
                //var messageElement = document.createElement('li');
                document.querySelector('#messageList').appendChild(messageElement);

     });

//	stompClient.send("/app/chat.register", {}, JSON.stringify({
//		sender : name,
//		type : 'newUser'
//	}))

//	stompClient.subscribe('/topic/public/user', onMessageReceived);
}




//function onChatRegistered(data){
//        debugger;
//    }


function sendMessage(event) {
	var messageContent = document.querySelector('#chatMessage').value.trim();
	if (messageContent && stompClient) {
		var chatMessage = {
			sender : name,
			content : document.querySelector('#chatMessage').value,
			type : 'CHAT',
	};

	stompClient.send("/app/chat/" + selectedUser, {}, JSON.stringify({
            fromLogin: name,
            message: document.querySelector('#chatMessage').value
        }));
//	stompClient.send("/app/chat.send", {}, JSON
//	.stringify(chatMessage));
	document.querySelector('#chatMessage').value = '';
	}
event.preventDefault();
}
function onMessageReceived(payload) {
    listOfActiveUsers.push({msg: payload.headers["message-id"],sender:message.sender});
    console.log(listOfActiveUsers);
	var message = JSON.parse(payload.body);
	var messageElement = document.createElement('li');
	if (message.type === 'newUser') {
		messageElement.classList.add('event-data');
		message.content = message.sender + 'has joined the chat';
	} else if (message.type === 'Leave') {
		messageElement.classList.add('event-data');
		message.content = message.sender + 'has left the chat';
	} else {
		messageElement.classList.add('message-data');
	var element = document.createElement('i');
	var text = document.createTextNode(message.sender[0]);
	element.appendChild(text);
	messageElement.appendChild(element);
	var usernameElement = document.createElement('span');
	var usernameText = document.createTextNode(message.sender);
	usernameElement.appendChild(usernameText);
	messageElement.appendChild(usernameElement);
	}
	var textElement = document.createElement('p');
	var messageText = document.createTextNode(message.content);
	textElement.appendChild(messageText);
	messageElement.appendChild(textElement);
	document.querySelector('#messageList').appendChild(messageElement);
	document.querySelector('#messageList').scrollTop = document
	.querySelector('#messageList').scrollHeight;
}


function selectUser(userName) {
    console.log("selecting users: " + userName);
    selectedUser = userName;
//    let isNew = document.getElementById("newMessage_" + userName) !== null;
//    if (isNew) {
//        let element = document.getElementById("newMessage_" + userName);
//        element.parentNode.removeChild(element);
//        render(newMessages.get(userName), userName);
//    }

    $('#selectedUserId').html('');
    $('#selectedUserId').append('Chat with ' + userName);
}



    function fetchAll() {
        $.get(url + "/fetchAllUsers", function (response) {
            let users = response;
            let usersTemplateHTML = "";
            for (let i = 0; i < users.length; i++) {
                usersTemplateHTML = usersTemplateHTML + '<a href="#" onclick="selectUser(\'' + users[i] + '\')"><li class="clearfix">\n' +
                    '                <img src="https://rtfm.co.ua/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png" width="55px" height="55px" alt="avatar" />\n' +
                    '                <div class="about">\n' +
                    '                    <div id="userNameAppender_' + users[i] + '" class="name">' + users[i] + '</div>\n' +
                    '                    <div class="status">\n' +
                    '                        <i class="fa fa-circle offline"></i>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </li></a>';
            }
            $('#usersList').html(usersTemplateHTML);
        });

}