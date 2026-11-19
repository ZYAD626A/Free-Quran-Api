// const { readFileSync } = require("fs");
// const path = require("path");
// const { fail, success } = require("../utils/JsendCodes");

//   const { search } = req.query;
// if (search) {
//   const data = JSON.parse(
//     readFileSync(
//       path.join(__dirname, "../assets/asma_ul_husna_detailed.json"),
//       "utf-8",
//     ),
//   );

//   if (typeof Number(search) === "number") {
//     let idNumber = Number(search);
//     idNumber = idNumber > 99 ? 99 : idNumber < 1 ? 1 : idNumber;
//     const result = data.data.find((name) => name.id === idNumber);

//     return res.status(200).json(success(result));
//   } else {
//     const result = data.data.find((name) => name.name === search);
//     console.log(result);
//   }
// }
