import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import KorisnikRouter from "./routes/Korisnik.routes"
import adminRouter from './routes/Admin.router';
import ucenikRuter from './routes/Ucenik.routes';
import nastavnikRouter from './routes/Nastavnik.router';


const app = express();
//const svgCaptcha = require('svg-captcha');

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/projekat')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router=express.Router()
router.use("/korisnik",KorisnikRouter)
router.use("/admin",adminRouter)
router.use("/ucenik",ucenikRuter)
router.use("/nastavnik",nastavnikRouter)
app.use("/",router)
/**
app.get('/captcha', (req, res) => {
    const captcha = svgCaptcha.create();
    const captchaToken = captcha.text;
  
    res.type('svg');
    res.status(200).json({ captcha: captcha.data, captchaToken });
});
*/

app.post("/proba",(req,res)=>{res.json({"message":"ok"})})
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));