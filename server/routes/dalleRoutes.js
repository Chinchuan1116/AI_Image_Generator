import express  from "express";
import * as dotenv from 'dotenv'
import OpenAI from 'openai';

dotenv.config()

const router = express.Router()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


router.route('/').get((req,res)=>{
  res.send('Hello from DaLL-E')
})

router.route('/').post(async (req,res)=>{
  try {
    const {prompt} = req.body

    const AIResponse = await openai.images.generate({
      prompt,
      n:1,
      size:'1024x1024',
      response_format:'b64_json'
    })

    const image = AIResponse.data.data[0].b64_json;

    res.status(200).json({photo:image})
  } catch (error) {
    console.log(error)
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
    } else {
        console.log(error.message);
    }
  }

}
)
export default router