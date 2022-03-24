const express = require('express')

const path = require('path')

const app = express()
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')))

app.get('/*', (req,res) => {
    res.sendFile(path.resolve(__dirname,'frontend','index.html'))
})

const PORT = process.env.PORT|| 3000

app.listen(PORT , () => {
    console.log(`server is running on port ${PORT} `)
})