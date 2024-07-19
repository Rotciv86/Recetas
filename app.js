require('dotenv').config()
const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors());
app.use(express.json())
app.use(express.static('client'))
app.use('/uploads', express.static('uploads'))

const port = process.env.PORT || 3300


app.get('/', (request, response) => {
    response.send('<h1>Hola</h1>')
})


app.use('/api/recipes-recipes', require('./routes/recipesRecipes'))

app.listen(port, () => {
    console.log(`Listening localhost: ${port}`)
})