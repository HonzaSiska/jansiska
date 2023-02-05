const express = require('express')
const session = require('express-session')
const path = require('path')
const fs = require('fs')
const { IncrementWrapStencilOp } = require('three')
const { send } = require('process')
const app = express()
var FileStore = require('session-file-store')(session);
const MemoryStore = require('memorystore')(session)
// app.use(cors({credentials: true, origin: origin}));

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

var fileStoreOptions = {};
app.set('trust proxy', 1)
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     name: process.env.SESSION_NAME,
//     cookie: { 
//         secure: true,         
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24 * 7 ,
//         sameSite: true, //= strict
//         secure: process.env.NODE_ENV === 'production' // sets to tru if in production mode
//      }
// }))

// app.use(session({
//     store: new FileStore(fileStoreOptions),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     name: process.env.SESSION_NAME,
//     cookie: { 
//         secure: true,
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24 * 7 ,
//         sameSite: 'strict', //= strict
//         secure: process.env.NODE_ENV === 'production' // sets to tru if in production mode
//      }
// }))

app.use(session({
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    name: process.env.SESSION_NAME,
    saveUninitialized: false,
    cookie: { 
        maxAge: 8640000000 ,
    }
}))



//ADD ROUTE TO COMPARE PASSWORDS



// FUNCTION TO WRITE DATA FROM DB

const writeData = (data) => {
    const savedFile =  fs.writeFileSync("./frontend/static/data/data.json", data) 
    return savedFile  
}

//FUNCTION TO READ DATA FROM DB

const readData =  (url) => {
    const json =  fs.readFileSync(url, 'utf8')
    return json
}


app.post('/login', async (req, res) => {
    const body = req.body 
    let error = {}
    
    if(process.env.USER!== body.username && process.env.PASS !== body.password){
        error.error = 'Enter valid credentials !'
        return res.redirect('/')
    }else{
        req.session.username = body.username
        
        return res.redirect('/admin')
        //return res.send({})
    }
   
})

app.post('/delete/:index', async(req,res) => {
    const param = req.params.index
    
    let db = readData('./frontend/static/data/data.json')
    db = JSON.parse(db)

    db.cz.splice(param,1)
    db.en.splice(param,1)
    db.es.splice(param,1)

    db = JSON.stringify(db)

    writeData(db)

    

    try{
        const updatedDb = writeData(db)
        return res.redirect('/admin')

    }catch(e){
        return res.redirect('/')
    }


})


app.post('/update/:index', async (req,res) => {
    const body = req.body
    const param = req.params.index


    let db =  readData('./frontend/static/data/data.json')
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
        const result = readData('./frontend/static/data/data.json')
        return res.send(result)

    }catch(e){
        return res.send(e)
    }
    
})


app.get('/data', (req, res) => {
    try{
        let data = readData('./frontend/static/data/data.json')
        let desc = readData('./frontend/static/data/description.json')

        data = JSON.parse(data)
        desc = JSON.parse(desc)
        
        let result = {}
        result.data = data
        result.desc = desc
        result =JSON.stringify(result)
        return res.send(result)

    }catch(e){
        return res.json(e)
    }
})

app.post('/add', async (req, res) => {
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
    
    

    //UPDATE OBJECT RETRIEVED FROM JSON DB
    const czech = {}
    czech.year = year
    czech.title = title_cz
    czech.desc = desc_cz


    const esp = {}
    esp.year = year
    esp.title = title_es
    esp.desc = desc_es

   

    const eng = {}
    eng.year = year
    eng.title = title_en
    eng.desc = desc_en


    parsedData.cz.push(czech)
    parsedData.es.push(esp)
    parsedData.en.push(eng)


    const updatedFile = JSON.stringify(parsedData)
     
    writeData(updatedFile)

    try{
        const data = readData()
        return res.send(data)

    }catch(e){
        return res.json(e)
    }

})     

app.get('/education', async (req, res) => {
    if(req.session.username){
        return res.sendFile(path.resolve(__dirname,'frontend','education.html'))
    }else{
        return res.redirect('/')
    }
})  

app.get('/edudata', async (req, res) => {
    const json = readData('./frontend/static/data/description.json')
    let data = JSON.parse(json)

    let filteredData = {}

    for(item in data){
        filteredData[item] = data[item]
    }
    return res.send(filteredData)

    
})

app.post('/addeducation', async (req, res) => {
    const body = req.body

    if(req.session.username){
        const json = readData('./frontend/static/data/description.json')
        const parsedJson = JSON.parse(json)

        const czech = { title: body.title_cz, desc: body.desc_cz}
        const esp = { title: body.title_es, desc: body.desc_es}
        const eng = { title: body.title_en, desc: body.desc_en}

        parsedJson.cz.education.push(czech)
        parsedJson.es.education.push(esp)
        parsedJson.en.education.push(eng)

        

        const updatedJson = JSON.stringify(parsedJson)

        try {
            fs.writeFileSync("./frontend/static/data/description.json", updatedJson)
            return res.redirect('/education')
        } catch (error) {
            return res.redirect('/education')
        }
    }
    return res.redirect('/')
    
   
})

app.post('/updateeducation/:index', async (req, res) => {
    if(req.session.username){
        const body = req.body
        const param = req.params.index
        
        let db =  readData('./frontend/static/data/description.json')
        db = JSON.parse(db)

        
        const cz = db.cz.education[param]
        const es = db.es.education[param]
        const en = db.en.education[param]
        
        
        cz.title = body.title_cz
        cz.desc = body.desc_cz

        es.title = body.title_es
        es.desc = body.desc_es

        en.title = body.title_en
        en.desc = body.desc_en
    

        db.cz.education[param]= cz
        db.es.education[param]= es
        db.en.education[param]= en
        db = JSON.stringify(db)

        try{
            fs.writeFileSync("./frontend/static/data/description.json", db)
            return res.redirect('/education')
        }catch(e){
            return res.send(e)
        }

    }
    return res.redirect('/')

    
    
})

app.post('/deleteeducation/:index', async (req, res) => {

    if(req.session.username){
        const index = req.params.index

        let db =  readData('./frontend/static/data/description.json')

        db= JSON.parse(db)

        db.cz.education.splice(index, 1)
        db.en.education.splice(index, 1)
        db.es.education.splice(index, 1)

        db = JSON.stringify(db)

        try{
            fs.writeFileSync("./frontend/static/data/description.json", db)
            return res.redirect('/education')
        }catch(e){
            return res.send(e)
        }
    }
    return res.redirect('/')
    



})




app.get('/description', async(req, res) => {
    if(req.session.username){
        return res.sendFile(path.resolve(__dirname,'frontend','description.html'))
    }else{
        return res.redirect('/')
    }
})

app.get('/descriptdata', async(req, res) => {
    if(req.session.username){
        try {
            const data = readData('./frontend/static/data/description.json')
            return res.send(data)
        } catch (error) {
            return res.json({errer: 'Couldnt retrieve the data'})
        }
    }else{
        return res.redirect('/')
    }
})
app.post('/descriptupdate', async(req, res) => {
    if(req.session.username){
        let data = req.body

        const json = readData('./frontend/static/data/description.json')

        const parsedJson = JSON.parse(json)


        parsedJson.cz.intro = data.cz
        parsedJson.es.intro = data.es
        parsedJson.en.intro = data.en

        const updatedData = JSON.stringify(parsedJson) 
        
        try {
            fs.writeFileSync("./frontend/static/data/description.json", updatedData) 

            const updatedFile = readData("./frontend/static/data/description.json")
            
            return res.send(updatedFile)
        } catch (error) {
            return res.json({error:'failed to update !!'})
        }
        
    }else{
        return res.redirect('/')
    }
})
    

app.get('/admin', async (req, res) => {
    
    if(req.session.username){
        return res.sendFile(path.resolve(__dirname,'frontend','admin.html'))
    }else{
        return res.redirect('/')
    }
    
    
})
app.get('/intro', async (req, res) => {
    if(req.session.username){
        return res.sendFile(path.resolve(__dirname,'frontend','intro.html'))
    }else{
        return res.redirect('/')
    }
    
    
    
})

app.get('/introdata', async (req, res) => {
   
    try {
        let data = readData('./frontend/static/data/main.json')
       
        return res.send(data)
    } catch (error) {
        return res.json({error: 'STALA SE CHYBA !!'})
    }
   

})

app.post('/introupdate', async (req, res) => {
    
    if(req.session.username){
        const body = req.body
        console.log('introbody', body)     
        let data = {...body}
        data = JSON.stringify(data)
       
        
        try {
            fs.writeFileSync("./frontend/static/data/main.json", data)
            
            let updatedData = readData("./frontend/static/data/main.json")
            console.log('session on intro update',req.session.username)
            return res.json(updatedData)
        } catch (error) {
            return send({error: ' Stata se chyba !!'})
        }
        
        
        

    }else{
        return res.redirect('/')
    }
})

app.get('/print', (req,res) => {
    return res.sendFile(path.resolve(__dirname,'frontend','print.html'))
})

app.get('/printdata', async (req, res) => {
    console.log('works')
    try{
        //GET JSON DATA
        let data = readData('./frontend/static/data/data.json')
        let description = readData('./frontend/static/data/description.json')

        //CONVERT DATA TO OBJECT
        data = JSON.parse(data)
        description = JSON.parse(description)

        //CONSOLIDATE DATA
        let result = { data, description }

        //CONVERT CONSOLIDATED DATA TO JSON
        result = JSON.stringify(result)
        
        //SEND
        return res.send( result)

    }catch(e){
        return res.json(e)
    }
})

app.get('/skills', async (req, res) => {
    if(req.session.username){
        
        return res.sendFile(path.resolve(__dirname,'frontend','skills.html'))
        
    }
    return res.redirect('/')
   

})

app.get('/skillsdata', async (req, res) => {
    if(req.session.username){
        try {
            const db = readData('./frontend/static/data/description.json')

            return res.send(db)
        } catch (error) {
            return res.send(error)
        }    
    }
    return res.redirect('/')
})

app.post('/updateskill/:index', async (req, res) => {

    if(req.session.username){
        const body = req.body
        const param = req.params.index

        try {
            let db = readData('./frontend/static/data/description.json')

            db = JSON.parse(db)

            db.cz.skills[param] = body.skill_cz
            db.es.skills[param] = body.skill_es
            db.en.skills[param] = body.skill_en

            db = JSON.stringify(db)

            fs.writeFileSync("./frontend/static/data/description.json", db)

            return res.redirect('/skills')

        } catch (error) {
            return res.send(error)
        }

    }
    
    return res.redirect('/')
    
})

app.post('/addskill', async (req, res) => {
    
    if(req.session.username){
        const body = req.body

        try {
            let db = readData('./frontend/static/data/description.json')
            db = JSON.parse(db)

            // db.cz.skillsTitle = body.skill_title_cz
            // db.en.skillsTitle = body.skill_title_en
            // db.es.skillsTitle = body.skill_title_es

            db.cz.skills.push(body.skill_cz)
            db.es.skills.push(body.skill_es)
            db.en.skills.push(body.skill_en)
            db = JSON.stringify(db)

            fs.writeFileSync("./frontend/static/data/description.json", db)

            return res.redirect('/skills')
        
        } catch (error) {
            return res.redirect('/')
        }
    }
    return res.redirect('/')
    

})

app.post('/deleteskill/:index', async(req, res) => {
    const param= req.params.index
    if(req.session.username){
        try {
            let db = readData('./frontend/static/data/description.json')
            db = JSON.parse(db)

            db.cz.skills.splice(param, 1)
            db.es.skills.splice(param, 1)
            db.en.skills.splice(param, 1)
            db = JSON.stringify(db)

            fs.writeFileSync("./frontend/static/data/description.json", db)
             return res.redirect('/skills')

        } catch (error) {
            return res.send(error)
        }
    }
    return res.redirect('/')

})

//CONTACT

app.get('/contact', async( req, res ) => {
    try {
        let db = readData("./frontend/static/data/data.json")
        return res.send(db)
    } catch (error) {
        return res.send(error)
    }
})


app.get('/*', (req,res) => {
    // req.session.destroy()
    console.log('home route session', req.session)
    res.sendFile(path.resolve(__dirname,'frontend','index.html'))
})



const PORT = process.env.PORT|| 3000

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT} `)
})