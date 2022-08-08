const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcrypt');
const users = require("../users")



async function findUser(username) {
  for(x in users){
      if (users[x]["username"].toLowerCase() == username.toLowerCase()){
        return users[x]
      }
  }

  return 0;
}
router.get('/',async(req,res) => {
  if (!req.session.user) {
    return res.render('users/login');
  } 
  if (req.session.user) {
    return res.redirect('/private');
  } else {
    req.method = 'POST';
  }
});



router.post('/login', async (req, res) => {
	try{

  let foundUser = await findUser(req.body.username)
  if(foundUser == 0)throw "Username or password is incorrect";
  let match = await bcrypt.compare(req.body.password, foundUser['hashedPassword'])
 
  if(match){
    req.session.user = {  id: foundUser["_id"], username: foundUser["username"], firstName: foundUser["firstName"] , lastName: foundUser["lastName"], profession: foundUser["profession"], bio: foundUser["bio"]};
    return res.redirect("/")
  }

  else throw "Username or password is incorrect";

    }catch(e){
        res.status(401).render('users/login',{error: "Username or password is incorrect" });
    }

  
});


router.get('/private',async(req,res)=>{
	res.render('users/private',{info: req.session.user})
});

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.redirect('/')
});

module.exports = router;
