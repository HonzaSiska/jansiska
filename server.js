const express = require('express')

const path = require('path')
const fs = require('fs')
const dataDB = require('./data.json')
const app = express()
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')))

//THREE JS STATIC ROUTES
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))
app.use('/img', express.static(path.resolve(__dirname, 'frontend', 'static','img')))
app.use('/shaders/', express.static(path.resolve(__dirname, 'frontend', 'static','shaders')))





// FUNCTION TO WRITE DATA FROM DB

const writeData = (data) => {
    const jsonData = JSON.stringify(data)
    console.log(data)
    console.log(jsonData)
}

//FUNCTION TO READ DATA FROM DB

const readData =  () => {
    const json =  fs.readFileSync('./data.json', 'utf8')
    return json
}


app.get('/data', (req, res) => {
    try{
        const data = readData()
        console.log('received', typeof data)
        return res.send(data)

    }catch(e){
        return res.json(e)
    }
})



app.get('/*', (req,res) => {
    res.sendFile(path.resolve(__dirname,'frontend','index.html'))
})



const PORT = process.env.PORT|| 3000

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT} `)
})