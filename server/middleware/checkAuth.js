exports.isLoggedIn = (req,res,next) => {
    if(req.user){
        next();
    }
    else{
        res.status(401).render("401",{
            locals: {title: "401 - Unauthorized"},
            btnContent: "Go back and Login",
            url: "/",
            layout: "../views/layouts/error-layout.ejs"
        });
    }
}