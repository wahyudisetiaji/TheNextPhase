const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

module.exports = {

  registerUser: function (req, res) {

    const salt = bcryptjs.genSaltSync(8);
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

    User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })
      .then(user => {

        const userToken = jwt.sign(
          {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          },
          process.env.JWT_SECRET_KEY
        );

        let data = {
          token: userToken,
          userId: user._id,
          name: user.name,
          username: user.username,
          email: user.email
        };
  
        res.status(200).json({
          message: "user successfully registered",
          data
        });

      })
      .catch(err => {

        res.status(400).json({
          message: err.message
        });

      });
  },

  loginUser: function (req, res) {
    console.log(req.body)
    User.findOne({ email: req.body.user })
      .then(user => {

        if (!user) {

          User.findOne({ username: req.body.user })
            .then((user) => {
              
              const checkPassword = bcryptjs.compareSync(
                req.body.password,
                user.password
              );
      
              if (checkPassword) {
      
                const userToken = jwt.sign(
                  {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                  },
                  process.env.JWT_SECRET_KEY
                );
      
                let data = {
                  token: userToken,
                  userId: user._id,
                  name: user.name,
                  username: user.username,
                  email: user.email
                };
      
                res.status(200).json({
                  message: "sign in success",
                  data
                });
      
              } else {
      
                res.status(400).json({
                  message: "password wrong"
                });
      
              }

            })
            .catch((err) => {
              
              res.status(400).json({
                message: err.message,
              });

            });

        } else {

          const checkPassword = bcryptjs.compareSync(
            req.body.password,
            user.password
          );
  
          if (checkPassword) {
  
            const userToken = jwt.sign(
              {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
              },
              process.env.JWT_SECRET_KEY
            );
  
            let data = {
              token: userToken,
              userId: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            };
  
            res.status(200).json({
              message: "sign in success",
              data
            });
  
          } else {
  
            res.status(400).json({
              message: "password wrong"
            });
  
          }

        }
        
      })
      .catch(err => {

        res.status(400).json({
          message: err.message,
        });

      });
  },

  findUser: function (req, res) {

    User.findOne({_id: req.user._id})
      .then(data => {

        res.status(200).json({
          message: "data users",
          data
        });

      })
      .catch(err => {

        res.status(400).json({
          message: err.message
        });

      });
  }

}
  
