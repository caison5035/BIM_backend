const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

const envSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().default(3000),
    DB_URL: Joi.string().default('localhost'),
    DB_OPTIONS: Joi.any().default({ useNewUrlParser: true }),
    JWT_SECRET: Joi.string().default('A secret string'),
    CLOUDINARY_NAME : Joi.string().default(''),
    CLOUDINARY_API_KEY : Joi.string().default(''),
    CLOUDINARY_API_SECRET : Joi.string().default('')
}).unknown();

dotenv.config({ path: path.join(__dirname, './../../.env') });

const { error, value: envVars } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = envVars;