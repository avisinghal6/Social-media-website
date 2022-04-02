{
    let addFriend= function(){
        let button= $('#friend-add-button');
        console.log(button);
        button.click(function(e){
            e.preventDefault();
            console.log("request sent")
            console.log(button);
            $.ajax({
                type: 'POST',
                url: button.attr('href'),
            })
            .done(function(data) {
                
                let profileUserId= data.data.toUser;
                console.log("add friend");
                button.after(" <a id='friend-remove-button' href=''> Remove Friend</a> ");
                button.remove();
                let tempbutton= $('#friend-remove-button');
                tempbutton.attr('href',"/friends/remove-friend/"+profileUserId)
                // button.attr('href', "/friends/remove-friend/"+profileUserId);
                // button.attr('id','friend-remove-button');
                // button.html('remove friend');
                removeFriend();
            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
        });
    }


    let removeFriend= function(){
        let button= $('#friend-remove-button');
        console.log(button);
        button.click(function(e){
            e.preventDefault();
            console.log("sending remove request");

            $.ajax({
                type: 'POST',
                url: button.attr('href'),
            })
            .done(function(data) {
                let profileUserId= data.data.toUser;
                console.log("remove friend");
                button.after(" <a id='friend-add-button' href=''> Add Friend</a> ");
                button.remove();
                let tempbutton= $('#friend-add-button');
                tempbutton.attr('href',"/friends/add-friend/"+profileUserId);
                // button.attr('href', "/friends/add-friend/"+profileUserId);
                // button.attr('id','friend-add-button');
                // button.html('add friend');
                addFriend();
            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
        });
    }

    addFriend();
    removeFriend();

}