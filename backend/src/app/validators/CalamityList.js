import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      type: Yup.string().optional(),
      startDate: Yup.string().optional(),
      endDate: Yup.string().optional(),
      city: Yup.string().optional(),
    });

    await schema.validate(req.query, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
