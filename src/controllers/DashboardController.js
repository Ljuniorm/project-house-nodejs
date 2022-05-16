import House from '../models/House'
// metodos: index, show, update, store, destroy
/* 
  index: listagem de sessoes
  store: criar uma sessao
  show: listar uma unica sessao
  update: alterar uma sesao
  destroy: deletar uma sessao
*/

class DashboardController {

  async show(req, res) {
    const { user_id } = req.headers

    const houses = await House.find({ user: user_id })

    return res.json(houses)
  }

}

export default new DashboardController()