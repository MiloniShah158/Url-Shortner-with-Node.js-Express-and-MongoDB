const express = require('express')
const app = express()
const ShortUrls = require('./models/shortUrl')

//connect with database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/urlShortner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//for using index.ejs file
app.set('view engine', 'ejs')

//for proper work of url
app.use(express.urlencoded({ extended: false }))

//get index.ejs file 
app.get('/', async(req, res) => {

    //if i write full url then click the shrink button I want to show up 
    //ShortUrls.find() get all of the urls inside of our short url table 
    const shortUrls = await ShortUrls.find()
        //now we have to show this urls  and in index file loop through every single short url
    res.render('index', { shortUrls: shortUrls })

})

app.post('/shortUrls', async(req, res) => {
    //for creating shorturls & this will give access to our form in ejs file there is a form and there name is fullUrl 
    // we will wait until the short url is created 
    await ShortUrls.create({ full: req.body.fullUrl })
        //now redirect the page to the home page which is index.ejs
    res.redirect('/')
})

//when I click on shorturl link the it pass me to the different page
//'/:shorturl'means it will retrun when an http address is like this localhost:5000/flovoki,after this : there is something
app.get('/:shortUrl', async(req, res) => {
    const shortUrl = await ShortUrls.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
        shortUrl.save()
    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);