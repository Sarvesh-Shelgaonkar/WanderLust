const express=require("express");
const app=express();
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const sessionOption={

    secret:"my secret",
    resave:false,
    saveUninitialized:true
};
app.use(
    session(sessionOption)
);
app.use(flash());
app.use((req,res,next)=>
{
    res.locals.succMsg=req.flash("successful");
    res.locals.errMsg=req.flash("error");
    next();
})
app.get("/register",(req,res)=>
{
    let{name="annonymous"}=req.query;
    req.session.name=name;
    if(name==="annonymous")
    {
        req.flash("error","user not registered");
    }
    else{
        req.flash("successful","user registered succussful");
    }
   
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>
{
    res.render("page.ejs",{name:req.session.name});
})
// app.get("/reqcount",(req,res)=>
// {
//     if(req.session.count)
//     {
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
//     res.send(`you send req for ${req.session.count} times`);
// })
// // app.get("/test",(req,res)=>
// // {
// //     res.send("test successful");
// // })
app.listen(3000,()=>
{
    console.log("listning");
})