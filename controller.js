const { queryInflux } = require("./model");

const getAllData = (requestCallback) => {
  const query = `from(bucket: "sample") 
                  |> range(start: -12h)
                  |> limit(n: 10)`;
  queryInflux(query, (data) => requestCallback(data));
};

const getAllDataByRange = (range, requestCallback) => {
  const query = `from(bucket: "sample") |> range(start: -${range})`;
  queryInflux(query, (data) => requestCallback(data));
};

const getFieldData = (field, requestCallback) => {
  const query = `option v = {timeRangeStart: -10m, timeRangeStop: now()}

  from(bucket: "sample")
  |> range(start: -10m )
  |> filter(fn: (r) => r["_measurement"] == "internet_speed")
  |> filter(fn: (r) => r["_field"] == "${field}")
  |> sort(columns: ["_time"], desc: true)
  |> limit(n: 10)`;

  queryInflux(query, (data) => requestCallback(data));
};

module.exports = { getAllData, getAllDataByRange, getFieldData };
