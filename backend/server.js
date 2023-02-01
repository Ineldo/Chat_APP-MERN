const express= require('express');
const dotenv= require('dotenv');
const connectDB= require('./config/db');
const userRoutes = require('./routes/userRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const app = express();
dotenv.config({ path:'.env'})
connectDB();
app.use(express.json());//to accept json data

const PORT= process.env.PORT||5050;

app.get('/', (req, res) => {
    res.send("API running")
})

app.use('/api/user', userRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{console.log(`Server running on http://localhost:${PORT}`)} )
