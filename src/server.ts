import 'dotenv/config';
import app from './app'
import { ErrorMiddleware } from './middlewares/error.middleware'


const PORT = process.env.PORT || 3000
app.use(ErrorMiddleware)

app.listen(PORT, () => {
    console.log('servidor encendido en el puerto: '+PORT)
})