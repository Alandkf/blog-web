const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const data = require('./data.js');
const app = express();
const _ = require('lodash');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()); 

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const posts = [];


app.get('/', (req, res) => {
    const content = data.getStringForRoute('home')
    console.log(posts)
    res.render('home',{
        content:content,
        title:"home",
        posts : posts
    });
})

app.get('/about', (req, res) => {
    const content = data.getStringForRoute('about');
    res.render('about',{content:content,title:"about"})
})

app.get('/contact', (req, res) => {
    const content = data.getStringForRoute('contact');
    res.render('contact',{content:content,title:"contact"})
})

app.get('/compose', (req, res) => {
    const content = data.getStringForRoute('compose');
    res.render('compose',{content:content,title:"compose"})
})

app.post('/compose', (req, res) => {
    const post ={ 
        title : req.body.postTitle,
        content : req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
})

app.get('/posts/:postName', (req, res) => {

    const requestedTitle = _.lowerCase(req.params.postName);
    let title;
    posts.forEach((post) => {
        const storedData = _.lowerCase(post.title);
        if( requestedTitle === storedData){
            res.render('posts',{
                title: storedData,
                content: post.content
            })
        } 
    })

})

// app.get('/posts',(req,res)=> {
//     res.render('/posts',{
//         title: "Posts"
//     })
// })


app.listen(3000,(req, res) =>{
    console.log('listening on port 3000');
})