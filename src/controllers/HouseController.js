
import House from '../models/House'

class HouseController {

  async store(req, res) {
    const { email } = req.body

    let house = await House.findOne({ email })

    if (!house) house = await House.create({ email })
    
    return res.json(house)
  }

}

export default new HouseController()