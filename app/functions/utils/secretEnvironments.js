const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

const getSecretVariableName = (name, version = 'latest') =>
  `projects/690829888489/secrets/${name}/versions/${version}`;

const accessSecretVersion = async (name) => {
  const fullName = getSecretVariableName(name);
  const [version] = await client.accessSecretVersion({
    name: fullName,
  });

  const payload = version.payload.data.toString();
  return payload;
};

module.exports = {
  getSecretVariableName,
  accessSecretVersion,
};
