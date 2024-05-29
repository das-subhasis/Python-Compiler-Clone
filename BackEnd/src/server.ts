import Express from 'express';
import { Compiler } from './Compiler';
import dotenv from 'dotenv'
dotenv.config()

const app = Express()

app.use(Express.json())
const PORT = process.env.PORT || 5000

app.get('/compile', (req, res) => {
    // const response = req.body;
    const python = new Compiler("print('hi')")
    python.compile()
    if (python.error) {
        return res.json({ error: python.error })
    }
    // console.log('success')
    return res.json({ output: python.output })
})

app.listen(PORT, () => {
    console.log(`Server is connected to port ${PORT}`)
})
