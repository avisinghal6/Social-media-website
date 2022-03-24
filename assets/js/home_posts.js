{ //method to submit the form data for new post using AJAX
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url: '/posts/create',
                data: newPostForm.serialize(),//converts the form data to JSON
                success: function(data){ // the data parameter used here is different from the above one
                    
                    if(data.data.redirect){
                        try{window.location.replace(data.data.redirect);}
                        catch{
                            console.log(err);
                        }
                    }
                    
                    let newPost=newPostDom(data.data.post);
                    // console.log(newPost);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost)); //' .delete-post-button', there is a space at the beginning
                    
                    // call the create comment class
                    new PostComments(data.data.post._id);
                    
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();


                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }


    //method to display post in DOM
    let newPostDom= function(post){
        return $(`<li id="post-${ post._id }">
                    <p>
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id }"> X </a>
                        </small>
                        
                        ${ post.content }
                        <br>
                        ${ post.user.name }
                    </p>
                
                    <div class="post-comments">
                            <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="type comment here.." required>
                                <input type="hidden" name="post" value="${post._id }" >
                                <input type="submit" value="add comment" > 
                            </form>
                
                            
                            <div class="post-comments-list">
                                <ul id="post-comments-${post._id }">
                                </ul>
                            </div>
                        </div>
                    </li>`)
    }

    //function to delete the post from DOM
    let deletePost= function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'), //to get the value of href from the <a> tag
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }



    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        // console.log($('#posts-list-container>ul>li'));
        $('#posts-list-container>ul>li').each(function(){
            // console.log(this);
            // console.log($(this));
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
    
}