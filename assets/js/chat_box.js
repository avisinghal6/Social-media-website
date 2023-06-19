let chat_box=function(id){
    return $(
    `<div id="chat-${id}">
        <div id="user-chat-box">
            <ul id="chat-messages-list">
                <li class="other-message">
                    <span>Other Message</span>
                </li>
                <li class="self-message">
                    <span>
                        Self Message
                    </span>
                    
                </li>

            </ul>
            <div id="chat-message-input-container">
                <input id="chat-message-input" name="chat-message-input" placeholder="Type message here"> </input>
                <button id="send-message">Send</button>
            </div>

        </div>
    </div>
 `
)
}