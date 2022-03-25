const User= require('../models/user');
const fs= require('fs'); //for performing file operations
const path= require('path');

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            title:'users',
            profile_user: user
        });
    })
    
};

module.exports.update= async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
    //         return res.redirect('back');
    //     });

    // }else{
    //     return res.status(401).send("unauthorized");
    // }


    if(req.user.id==req.params.id){
        try{

            let user= await User.findById(req.params.id); 
            // the parser cannot parse it because the form contains "multipart", so req.body cannot be accessed directly
            
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('****multer error', err);
                }
                // console.log(req.file);
                user.name= req.body.name;
                user.email=req.body.email;
                if(req.file){
                    
                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                       
                    }
                    //saving the path of the uploaded file into the avatr field in the user
                    user.avatar= User.avatarPath+'/'+req.file.filename;
                }

                user.save();
                return res.redirect('back');
            });
        
        
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        req.flash('error','ERROR');
        return res.status(401).send("unauthorized");
    }

}


module.exports.signUp= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile'+req.user.id);
    }

    res.render('user_sign_up', {
        title: "Codial sign up"
    });
};

module.exports.signIn= function(req,res){
    // console.log("inside");
    if(req.isAuthenticated()){
        return res.redirect('/users/profile/'+ req.user.id);
    }

    res.render('user_sign_in', {
        title: "Codial sign in"
    });
};

//get the sign up data
module.exports.create= function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return;}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return;}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

//create session key and sign in
module.exports.createSession= function(req,res){
    // console.log(req.user);
    req.flash('success','Logged in successfully');
    return res.redirect('/');
    
}

module.exports.destroySession =function(req,res){
    req.logout();
    req.flash('success', 'logged out successfully');
    return res.redirect('/');
}

