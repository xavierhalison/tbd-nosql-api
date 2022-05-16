const { InfluxDB } = require("@influxdata/influxdb-client");

const token =
  process.env.INFLUXDB_TOKEN ||
  "y5GskAGlm66HKuux5OuWUkywkYxDQqS36lLGoFq6VphkSAyr9CifgsFnDlfQYoenhobHBQZ3By3XoT7ycFv1-A==";
const org = "halisonpx@gmail.com";

console.log(token);

const client = new InfluxDB({
  url: "https://us-east-1-1.aws.cloud2.influxdata.com",
  token: token,
});

const queryApi = client.getQueryApi(org);

function queryInflux(query, callback) {
  const data = [];

  queryApi.queryRows(query, {
    next: (row, tableMeta) => {
      const o = tableMeta.toObject(row);
      data.push(o);
    },
    error: (error) => {
      console.error(error);
      data.push(error);
      callback(data);
    },
    complete: () => {
      callback(data);
    },
  });
}

module.exports = { queryInflux };
