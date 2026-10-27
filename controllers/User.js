const User = require("../models/user");

module.exports.renderSignupForm=(req, res) => {
    res.render("users/singup.ejs");
};


module.exports.signup=async (req, res) => {
    try{
    let {username, email, password} = req.body;
   const newuser = new User({username, email});
   const registeredUser = await User.register(newuser,password);
   console.log(registeredUser);
   req.login(registeredUser, (err) => {
    if(err){
        return next(err);
    }
    req.flash("success", "Successfully Signed Up");
   res.redirect("/listings");
   });
  
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    };
   
};

module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.login=(req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout= (req, res,next) =>{ 
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Successfully Logged Out");
        res.redirect("/listings");
    })
};