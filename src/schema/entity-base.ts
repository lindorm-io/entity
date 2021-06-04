import Joi from "joi";

export const JOI_EVENTS = Joi.array().items(
  Joi.object({
    date: Joi.date().required(),
    name: Joi.string().required(),
    payload: Joi.object().required(),
  }),
);

export const JOI_ENTITY_BASE = {
  id: Joi.string().guid({ version: "uuidv4", separator: "-" }).required(),
  created: Joi.date().iso().required(),
  events: JOI_EVENTS.required(),
  updated: Joi.date().iso().required(),
  version: Joi.number().integer().min(0).required(),
};
