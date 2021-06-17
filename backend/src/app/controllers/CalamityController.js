import Calamity from '../schemas/Calamity';

class CalamityController {
  async index(req, res) {
    const { type, city, startDate, endDate } = req.query;
    const types = type ? type.split(';') : null;
    const cities = city ? city.split(';') : null;
    const sDate = startDate ? new Date(startDate) : null;
    const eDate = endDate ? new Date(endDate) : null;
    let createdAt = sDate ? { $gte: sDate } : null;
    createdAt = eDate ? { ...createdAt, $lte: eDate } : createdAt;

    const query = {
      match: {
        ...(createdAt && { createdAt: createdAt }),
        ...(types && { type: types }),
        ...(cities && { city: cities }),
      },
    };

    try {
      const calamities = await Calamity.find(query?.match);
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
