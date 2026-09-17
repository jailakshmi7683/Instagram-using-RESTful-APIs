const express=require("express");
const app = express();

const path=require("path");
const methodOveride = require("method-override");
const { v4 : uuidv4 } = require('uuid');


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

app.use(methodOveride('_method'));

const port =8080;


//We dont have data, variable data
let posts=[
    {   
        id:uuidv4(),
        username: "apna college",
        content: "RESTful API Coding",
    },
    {
        id:uuidv4(),
        username: "JAI",
        content: "Final Year Sucks",
    },
    {
        id:uuidv4(),
        username: "Navya",
        content: "Startup idea loading",
    },
];


//To get all posts
app.get("/posts",(req,res)=>{
    //res.send("Welcome to QUORA");
    res.render("home.ejs",{posts});
});

//to create new posts
app.get("/posts/new",( req,res)=>{
    res.render("new.ejs");
});

//to create new posts - to send data 
app.post("/posts",( req,res)=>{
    //console.log(req.body);
    let {username, content}=req.body;
    let id = uuidv4();
    posts.push({ id,username, content });
    //res.send("POST request working");
    res.redirect("/posts");
});

//to display individual post
app.get("/posts/:id",(req, res) => {
    let {id} = req.params;
    let post=posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
});

//to update posts
app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let{content}= req.body;

    let post = posts.find ((p)=> id===p.id);
    post.content = content;

    console.log(post);    
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let { id }=req.params;
    let post = posts.find ((p)=> id===p.id);

    res.render("update.ejs",{post});
})

app.delete("/posts/:id",( req,res) =>{
    let { id }= req.params;
    posts = posts.filter ((p)=> id!==p.id);
    console.log("Post deleted successfully");
    res.redirect("/posts");

})


app.listen(port,()=>{
    console.log(`Server started at ${port}`);
});