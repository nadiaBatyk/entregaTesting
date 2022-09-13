const http = require("http");

const req = http.get("http://localhost:8080/", (res) => {
  let data = "";
  res.on("data", (d) => {
    data+=d
  });
  res.on("end", () => console.log(data));
});
req.on("error", (err) => console.error(err));
req.end();
