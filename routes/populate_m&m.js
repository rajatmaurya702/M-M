const express = require("express")
const router = express.Router()

const token_gen = require("../token_gen");

const User = require("../userModel")

router.post("/", (req, res)=>{
    const current_role = req.body.role;

    User.find({role: current_role}, (err, docs)=>{
        if(err){
            console.error("error router populate m&m");
            res.send(JSON.stringify({status:"error"}));
        }
        
        if(docs){
            let current_user_tags = req.body.tags.split(" ")
            docs = docs.filter((doc)=>{
                if(!doc.tags) return false;
                let other_user_tags = doc.tags.split(" ")
                if(other_user_tags.length === 0) return false;
                for(let i = 0; i< current_user_tags.length; i++){
                    for(let j = 0; j< other_user_tags.length; j++){
                        if(current_user_tags[i] === other_user_tags[j]){
                            return true;
                        }
                    }
                }
                return false;
            })


            res.send(JSON.stringify({status:"success", data: docs}));
        }
        else{
            res.send(JSON.stringify({status:"success", data: []}));
        }
    })
})



module.exports = router;