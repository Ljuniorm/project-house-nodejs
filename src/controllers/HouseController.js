import House from '../models/House'
import User from '../models/User'
class HouseController{

  async index (req, res) {
    const { status } = req.query
    let houses = await House.find({ status })
    console.log('houses')
    return res.json(houses)
  }

  async store(req, res){
    const { user_id } = req.headers
    const { filename } = req.file
    let houseRequest = { ...req.body, thumbnail: filename, user: user_id}
    let house = await House.create(houseRequest)
    return res.json(house)
  }

  async update(req, res){
    const { user_id } = req.headers
    const { filename } = req.file
    const { house_id } = req.params
    let houseRequest = { ...req.body, thumbnail: filename, user: user_id}
    
    const user = await User.findById(user_id)
    const houses = await House.findById(house_id)

    if (String(user.id) !== String(houses.user)) {
      return res.status(401).json({ error: 'Não autorizado.'})
    }

    await House.updateOne({ _id: house_id }, houseRequest)

    return res.send()
  }

  async destroy (req, res) {
    const { user_id } = req.headers
    const { house_id } = req.body
    const user = await User.findById(user_id)
    const houses = await House.findById(house_id)

    if (String(user.id) !== String(houses.user)) {
      return res.status(401).json({ error: 'Não autorizado.'})
    }

    await House.findByIdAndDelete({_id: house_id})

    return res.json({message: 'removido com sucesso'})
  }

}

export default new HouseController()