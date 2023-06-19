class chatEngine {
  constructor(chatBoxId, userEmail, chatRoomId) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.chatRoomID=chatRoomId;
    this.socket = io.connect("http://localhost:2000", {
      transports: ["websocket"],
    }); //'io' is a global varibale provided because we included socket.io CDN

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("connection established using sockets...!");
      // console.log()
      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatroom: self.chatRoomID,
      });

      self.socket.on("user_joined", function (data) {
        console.log("a user joined!", data);
      });
    });

    
    // CHANGE :: send a message on clicking the send message button
    $(`#chat-${self.chatRoomID} #send-message`).click(function () {
      let msg = $(`#chat-${self.chatRoomID} #chat-message-input`).val();
      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          chatroom: self.chatRoomID,
        });
      }
    });

    self.socket.on("receive_message", function (data) {
      console.log("message received", data.message);

      let newMessage = $("<li>");

      let messageType = "other-message";

      if (data.user_email == self.userEmail) {
        messageType = "self-message";
      }

      newMessage.append(
        $("<span>", {
          html: data.message,
        })
      );

      newMessage.append(
        $("<sub>", {
          html: data.user_email,
        })
      );

      newMessage.addClass(messageType);
      $(`#chat-${self.chatRoomID} #chat-messages-list`).append(newMessage);
    });
  }
}
