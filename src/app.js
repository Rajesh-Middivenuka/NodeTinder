// const express = require("express");
// const app = express();
// // it will match get api calls
// // app.get("/user", (req, res) => {
// //   res.send({ firstName: "rajesh", lastName: "Middivenuka" });
// // });
// // app.post("/user", (req, res) => {
// //   //save data to db db logic over here
// //   res.send({ firstName: "rajesh", lastName: "Middivenuka" });
// // });
// // app.use("/test", (req, res) => {
// //   res.send("it is test route");
// // });

// // app.use(
// //   "/sending",
// //   (req, res, next) => {
// //     // res.send("sending sending");
// //     next();
// //     res.send("sending today");
// //   },
// //   (req, res) => {
// //     res.send("seding form second");
// //   }
// // );
// // app.use("/hello/2", (req, res) => {

// //   res.send("hello hello hello2 2222");
// // });
// // app.use("/hello", (req, res) => {
// //   res.send("hello hello hello r");
// // });

// // app.use("/", (req, res) => {
// //   res.send("hello from the the slash slash");
// // });
// // console.log("middleware");
// // // why do we use middleware

// // app.use("/admin", adminAuth);
// // //app.use("/user", userAuth);
// // app.get("/user", userAuth, (req, res, next) => {
// //   res.send("user auth");
// // });
// // app.get("/admin/getAllData", (req, res) => {
// //   res.send("all data send");
// // });
// // app.get("/admin/deleteUser", (req, res) => {
// //   res.send("all data deleted");
// // });
// const connectDb = require("./config/database");
// const User = require("./models/user");
// app.use(express.json());
// app.post("/signup", async (req, res) => {
//   console.log(req.body);
//   // const user = new User({
//   //   firstName: "Rajesh",
//   //   lastName: "Middivenuka",
//   //   emailId: "rajesh@gmail.com",
//   //   password: "rajesh123",
//   // });
//   const user = new User(req.body);
//   await user.save();
//   res.send("data added");
// });
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   console.log(userEmail);
//   try {
//   } catch (err) {
//     res.status;
//   }
//   res.send("recived data");
// });
// connectDb()
//   .then(() => {
//     console.log("connection established");
//     app.listen(3000, () => {
//       console.log("server is successfully listening on the port");
//     });
//   })
//   .catch(() => {
//     console.log("error");
//   });
// app.get("/user", (req, res) => {
//   res.send({ firstName: "rajesh", lastName: "middivenuka" });
// });
// app.use("/hello", (req, res) => {
//   res.send("hello from the hello ");
// });
// app.use("/test", (req, res) => {
//   res.send("hello from the test ");
// });
// app.use("/", (req, res) => {
//   res.send("hello from the dash board ");
// });

const express = require("express");
const app = express();
const User = require("./models/user");
const connectDb = require("./config/database");
const { validateSignUpData } = require("./utils/validator");
const bcrypt = require("bcrypt");
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    //encrypt password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("data addeded succesfully");
  } catch (err) {
    res.status(404).send("data is not valid:" + " " + err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    console.log(user);
    if (!user) {
      throw new Error("email id is not present in db");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("user login successfull");
    } else {
      throw new Error("passowrd is not valid");
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});
app.get("/getUser", async (req, res) => {
  const email = req.body.emailId;
  try {
    const user = await User.find({ emailId: email });
    if (user.length === 0) {
      res.status(404).send("some thing went wrong");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});
// finding all docments
app.get("/feed", async (req, res) => {
  try {
    let feed = await User.find({});
    if (feed.length === 0) {
      res.status(404).send("some thing went worng");
    } else {
      res.send(feed);
    }
  } catch (err) {
    res.status(404).send("some thing went wrong");
  }
});
app.get("/findOne", async (req, res) => {
  let email = req.body.emailId;
  try {
    let one = await User.findOne({ emailId: email });
    if (!one) {
      res.status(404).send("something went wrong");
    } else {
    }
    res.send(one);
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  let id = req.body.id;
  try {
    let userid = await User.findByIdAndDelete({ _id: id });
    res.send("user deleted");
  } catch (err) {
    res.status(404).send("some thing went wrong");
  }
});
app.patch("/user", async (req, res) => {
  let id = req.body.id;
  try {
    await User.findByIdAndUpdate(id, { firstName: "fuck you mother fucker" });
    res.send("updated susccessfully");
  } catch (err) {
    res.status(404).send("some thing weng wrong");
  }
});
app.patch("/update", async (req, res) => {
  let email = req.body.email;

  try {
    await User.findOneAndUpdate(
      { emailId: email },
      { emailId: "virat.kohli@gmail.com" }
    );
    res.send("updaed with email");
  } catch (err) {
    res.status(404).send("some thing went wrong");
  }
});
connectDb()
  .then(() => {
    console.log("connection established");
    app.listen(3000, () => {
      console.log("server is successfully listening on the port");
    });
  })
  .catch(() => {
    console.log("error");
  });
