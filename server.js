const express = require('express')

const path = require('path')

const app = express()
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')))

//THREE JS STATIC ROUTES
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))
app.use('/img', express.static(path.resolve(__dirname, 'frontend', 'static','img')))
app.use('/shaders/', express.static(path.resolve(__dirname, 'frontend', 'static','shaders')))


app.get('/*', (req,res) => {
    res.sendFile(path.resolve(__dirname,'frontend','index.html'))
})

const PORT = process.env.PORT|| 3000

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT} `)
})