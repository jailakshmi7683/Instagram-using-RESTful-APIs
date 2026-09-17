const express=require("express");
const app = express();

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));

const port =8080;


//We dont have data, variable data
let posts=[
    {
        username: "apna college",
        content: "RESTful API Coding",
    },
    {
        username: "JAI",
        content: "Final Year Sucks",
    },
    {
        username: "Navya",
        content: "Startup idea loading",
    },
];



app.get("/posts",(req,res)=>{
    //res.send("Welcome to QUORA");
    res.render("home.ejs",{posts});
})

app.listen(port,()=>{
    console.log(`Server started at ${port}`);
})