import Calamity from '../schemas/Calamity';

class CalamityController {
  async index(req, res) {
    try {
      const calamities = await Calamity.find();
      return res.send({ calamities });
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async create(req, res) {
    try {
      const { ip, type, latitude, longitude, city } = req.body;
      const calamity = await Calamity.create({
        ip,
        type,
        latitude,
        longitude,
        city,
      });
      return res.status(201).send(calamity);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const calamity = await Calamity.findById(id);
      return res.send(calamity);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      const calamity = await Calamity.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.send(calamity);
    } catch (e) {
      return res.status(400).send(e);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      const calamity = await Calamity.findByIdAndDelete(id);
      return res.send(calamity);
    } catch (e) {
      return res.status(400).send(e);
    }
  }
}

export default new CalamityController();
