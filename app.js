const express = require('express')
const path = require('path')
const app = express()
const userModel = require('./model/user')
const cookieParser = require('cookie-parser')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())



app.get('/', (req, res) => {
    res.render('index')
})
app.get('/test', (req, res) => {
    res.render('multer')
})
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.body);
    res.redirect('test')
})


app.get('/read', async (req, res) => {
    let users = await userModel.find()
    res.render('read', { users })
})
app.post('/create', async (req, res) => {
    let { name, email, image } = req.body
    let createdUser = await userModel.create({
        name: name,
        email: email,
        image: image
    })
    res.redirect('/')
})
app.get('/delete/:userid', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.userid })
    res.redirect('/read')
})
app.get('/edit/:id', async (req, res) => {
    let editUser = await userModel.findOne({ _id: req.params.id })
    res.render('edit', { editUser })
})
app.post('/update/:id', async (req, res) => {
    let { name, email, image } = req.body
    await userModel.findOneAndUpdate({ _id: req.params.id }, { name, email, image })
    res.redirect('/read')
})

app.listen(3000)