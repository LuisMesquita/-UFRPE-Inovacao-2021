import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      latitude: Yup.string()
        .required()
        .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/),
      longitude: Yup.string()
        .required()
        .matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/),
      city: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
