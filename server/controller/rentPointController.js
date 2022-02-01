import asyncHandler from 'express-async-handler'
import { rawPoints } from '../data/rent2021Q4.js'
import * as turf from '@turf/turf'



//@Desc  get all points
//@route GET /api/points
//@access public
const getAllpoints = asyncHandler(async (req, res) => {

  if (rawPoints) {
    res.json({
      success: true,
      data: rawPoints
    })
  } else {
    res.status(500)
    throw new Error('Cant get data')
  }
})


//@Desc  get points by radius
//@route Post /api/points/radius
//@access public
const getPointsByRadius = asyncHandler(async (req, res) => {

  const { cPoint, radius } = req.body

  const userPoint = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [-93.731687, 32.624766]
    }
  };

  var buffered = turf.buffer(userPoint, radius, { units: 'kilometers' });
  const result = turf.booleanWithin(rawPoints, buffered)

  res.json(result)

})


export {
  getAllpoints,
  getPointsByRadius
}
