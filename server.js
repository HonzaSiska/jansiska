const express = require('express')

const path = require('path')
const fs = require('fs')

const app = express()
const session = require('express-session')
// app.use(cors({credentials: true, origin: origin}));
// const { LogLuvEncoding } = require('three')
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')))

//THREE JS STATIC ROUTES
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))
app.use('/img', express.static(path.resolve(__dirname, 'frontend', 'static','img')))
// app.use('/img', express.static(path.resolve(__dirname, 'frontend', 'static','data')))
app.use('/shaders/', express.static(path.resolve(__dirname, 'frontend', 'static','shaders')))

const dotenv = require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: process.env.SESSION_NAME,
    cookie: { 
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 ,
        sameSite: true, //= strict
        secure: process.env.NODE_ENV === 'production' // sets to tru if in production mode
     }
}))
app.set('trust proxy', 1)

//ADD ROUTE TO COMPARE PASSWORDS







// FUNCTION TO WRITE DATA FROM DB

const writeData = (data) => {
    const savedFile =  fs.writeFileSync("./frontend/static/data/data.json", data) 
    return savedFile  
}

//FUNCTION TO READ DATA FROM DB

const readData =  () => {
    const json =  fs.readFileSync('./frontend/static/data/data.json', 'utf8')
    return json
}


app.post('/login', async (req, res) => {
    const body = req.body 
    console.log(body)
    console.log('env pass', process.env.PASS)
    console.log('env user', process.env.USER)
    console.log('process.env',process.env)
    let error = {}
    
    if(process.env.USER!== body.username && process.env.PASS !== body.password){
        error.error = 'Enter valid credentials !'
            return res.send(error)
    }else{
        req.session.username = body.username
        console.log('session set', req.session.username)
        // res.redirect('/admin')
        return res.send({})
    }
   
})


app.post('/update/:index', async (req,res) => {
    const body = req.body
    const param = req.params.index


    let db =  readData()
    db = JSON.parse(db)
   
    
    const cz = db.cz[param]
    const es = db.es[param]
    const en = db.en[param]
    
    cz.desc = body.desc_cz
    cz.title = body.title_cz
    cz.year = body.year

    es.desc = body.desc_es
    es.title = body.title_es
    es.year = body.year

    en.desc = body.desc_en
    en.title = body.title_en
    en.year = body.year

    db.cz[param]= cz
    db.es[param]= es
    db.en[param]= en
    db = JSON.stringify(db)
    
    try{
        const updatedDb = writeData(db)
        const result = readData()
        return res.send(result)

    }catch(e){
        return res.send(e)
    }
    
})


app.get('/data', (req, res) => {
    try{
        const data = readData()
        console.log('received', typeof data)
        return res.send(data)

    }catch(e){
        return res.json(e)
    }
})

app.post('/add', async (req, res) => {
    console.log('body', req.body)
    const {
        year, 
        title_cz, 
        title_es,
        title_en,
        desc_cz,
        desc_es,
        desc_en
    } = req.body

   
    //GET DATA FROM JSON DB
    const fetchedData =  fs.readFileSync('./frontend/static/data/data.json', 'utf8')
    
    let parsedData;
    if(fetchedData){
        parsedData = JSON.parse(fetchedData)
    }else{
        parsedData = { cz:[], es: [], en: [] }
    }
    console.log('dfata from DB', parsedData)
    

    //UPDATE OBJECT RETRIEVED FROM JSON DB
    const czech = {}
    czech.year = year
    czech.title = title_cz
    czech.desc = desc_cz

    console.log('czech', czech)

    const esp = {}
    esp.year = year
    esp.title = title_es
    esp.desc = desc_es

    console.log('esp', esp)

    const eng = {}
    eng.year = year
    eng.title = title_en
    eng.desc = desc_en

    console.log('eng', eng)

    parsedData.cz.push(czech)
    parsedData.es.push(esp)
    parsedData.en.push(eng)

    console.log('appendedDAta',parsedData)

    const updatedFile = JSON.stringify(parsedData)
     
    writeData(updatedFile)

    try{
        const data = readData()
        return res.send(data)

    }catch(e){
        return res.json(e)
    }

     

    

    //UPDATE THE JSON FILE

    
})
app.get('/admin', async (req, res) => {
    console.log('session username',req.session.username)
    console.log('session ',req.session)
    if(req.session.username){
        return res.sendFile(path.resolve(__dirname,'frontend','admin.html'))
    }else{
        return res.redirect('/')
    }
    
    
    // console.log(req.session)
    // res.sendFile(path.resolve(__dirname,'frontend','admin.html'))
    
})





app.get('/*', (req,res) => {
    // req.session.destroy()
    res.sendFile(path.resolve(__dirname,'frontend','index.html'))
})



const PORT = process.env.PORT|| 3000

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT} `)
})