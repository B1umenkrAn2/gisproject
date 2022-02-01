import express from 'express'
import { getAllpoints, getPointsByRadius } from '../controller/rentPointController.js'


const router = express.Router()

router.get('/', getAllpoints).post('/', getPointsByRadius)


export default router
