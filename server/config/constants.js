const devConfig = {
  MONGO_URL: 'mongodb://localhost/makeanodejsapi-dev',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/makeanodejsapi-test',
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/makeanodejsapi-prod',
};

const defaultConfig = {
  PORT: process.env.PORT || 3005,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

// ES5
// module.exports = {
//   ...defaultConfig,
//   ...envConfig(process.env.NODE_ENV),
// };

// ES6
export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
