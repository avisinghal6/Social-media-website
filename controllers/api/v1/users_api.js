const User= require('../../../models/user');
const jwt= require('jsonwebtoken');
const env= require('../../../config/environment')

module.exports.createSession= async function(req,res){
    // console.log(req.user);
    try{
        let user= await User.findOne({email: req.body.email});
        // console.log(req);
        if(!user || user.password!= req.body.password){
            return res.json(422,{
                message:"invalid username and password"
            });
        }

        return res.json(200,{

            message: 'sign in successfull, please save the token',
            data:{
                token: jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'1000000'})// jwttoken is used for creating the toke, we passed 'codeial' as the key to be used for encryption
            }
        })
    }catch(err){
        console.log("******",err);
        return res.json(500,{
            message: "internal server error"
        })
    }
    
    
  
    
}