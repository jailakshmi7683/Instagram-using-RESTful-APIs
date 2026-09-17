const express=require("express");
const app = express();

const path=require("path");

const { v4 : uuidv4 } = require('uuid');


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

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



app.get("/posts",(req,res)=>{
    //res.send("Welcome to QUORA");
    res.render("home.ejs",{posts});
});

app.get("/posts/new",( req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",( req,res)=>{
    //console.log(req.body);
    let {username, content}=req.body;
    let id = uuidv4();
    posts.push({ id,username, content });
    //res.send("POST request working");
    res.redirect("/posts");
});

app.get("/posts/:id",(req, res) => {
    let {id} = req.params;
    let post=posts.find((p)=>id === p.id);
    res.render("show.ejs",{post});
})

app.listen(port,()=>{
    console.log(`Server started at ${port}`);
});