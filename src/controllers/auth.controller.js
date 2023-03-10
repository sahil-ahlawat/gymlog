const User = require('../models/user.model');
const customcrud = require('../models/customcrud');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode: decode } = require('../utils/token');
const uploadFile = require("../middlewares/upload");
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

exports.signup = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword);

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.email);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.email);
                res.status(200).send({
                    status: 'success',
                    data: {
                        token: token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

}
exports.forgotpassword = (req, res) => {
    const { email } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            
                let userdata = {};
                const password = Math.random().toString(16).slice(2);
                const useremail = data.email;
                const hashedPassword = hashPassword(password.trim());
                userdata.email = useremail;
                userdata.password = hashedPassword;
                User.updatepassword(userdata, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            status: "error",
                            message: err.message
                        });
                    } else {
                        // send this password in a secure email to the user
                        res.status(201).send({
                            status: "success",
                            data: {
                                message: "Password "+password+" Email sent to "+data.email
                            }
                        });
                    }
                });
                return;
        }
    });
}

exports.resetpassword = (req, res) => {
    const { email, oldpassword, newpassword } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(oldpassword.trim(), data.password)) {
                let userdata = {};
                const hashedPassword = hashPassword(newpassword.trim());
                userdata.email = data.email;
                userdata.password = hashedPassword;
                User.updatepassword(userdata, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            status: "error",
                            message: err.message
                        });
                    } else {
                        // send this password in a secure email to the user
                        res.status(201).send({
                            status: "success",
                            data: {
                                message: "Password updated successfully!"
                            }
                        });
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
                return;
        }
    });
}

//  exports.updateUserInfo = (req, res) => {
//     return;
//  };
exports.updateuserinfo = (req, res) => {

    const { email, firstname, lastname,bio,gender,profilepic,gym, sportscategory, country, address, state, city, location } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            let userdata = {};
            userdata.email = (email)?email:data.email;
            userdata.firstname = (firstname)?firstname:data.firstname;
            userdata.lastname = (lastname)?lastname:data.lastname;
            userdata.bio = (bio)?bio:data.bio;
            userdata.gender = (gender)?gender:data.gender;
            userdata.profilepic = (profilepic)?profilepic:data.profilepic;
            userdata.gym = (gym)?gym:data.gym;
            userdata.sportscat = (sportscategory)?sportscategory:data.sportscat;
            userdata.country = (country)?country:data.country;
            userdata.address = (address)?address:data.address;
            userdata.state = (state)?state:data.state;
            userdata.city = (city)?city:data.city;
            userdata.location = (location)?location:data.location;
       
                User.updateuserdata(userdata, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            status: "error",
                            message: err.message
                        });
                    } else {
                        // send this password in a secure email to the user
                        res.status(201).send({
                            status: "success",
                            data: {
                                message: "Data updated successfully!"
                            }
                        });
                    }
                });
                return;
            
        }
    });
}


exports.getloggedinuserdata = (req, res) => {
    try{
        if(req.headers.email){
            User.findByEmail(req.headers.email.trim(), (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            status: 'error',
                            message: `User with email ${req.headers.email} was not found`
                        });
                        return;
                    }
                    res.status(500).send({
                        status: 'error',
                        message: err.message
                    });
                    return;
                }
                if (data) {
                res.status(200).send({
                status: "success",
                data: data
                    });
                }
            });
        }
        else{
            res.status(400).send({
                status: "error",
                message: "Not logged in."
            });
        }
        
    }
    catch(err){
        res.status(err.statusCode || 500).send({
            status: "error",
            message: err.message
        });
    }
    return;
};

exports.upload = async (req,res) =>{
    try {
        await uploadFile(req, res,function (err) {
            if (err) {
                res.status(500).send({
                    message: `Could not upload the file 1 . ${err}`,
                  });
        }
        res.status(200).send({
            message: `Uploaded the file successfully ${req.file.path}`,
          });
    })
        
      } catch (err) {
        res.status(500).send({
          message: `Could not upload the file: ${err}`,
        });
      }
      return;
}

exports.getcsrf = (req, res) => {
    try {
        let uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
        let ip = req.socket.remoteAddress;
        let proxyip = req.headers['x-forwarded-for'];
        let userAgent = req.get('User-Agent');
        // add data to app table
        appcrud = customcrud("app");
        appcrud.create({'uip' : ip, 'uproxyip' : proxyip, 'useragent' : userAgent, 'appid' : uid, "status":"active"}, function (err, vals) {
            //mysql callback
            if(err){
                res.status(500).send({
                    message: `Could not get csrf : . ${err}`,
                  });  
            }
            const csrf = generateToken(vals.insertId);
            res.status(200).send({
                status: 'success',
                data: {
                    csrf: csrf,
                    vals:vals.insertId
                }
            });
        });
        
      } catch (err) {
        res.status(500).send({
          message: `Could not get csrf : . ${err}`,
        });
      }
    return;
}

exports.updateapplocation = (req,res) =>{
    try{
        const {location} = req.body;
        if(req.headers.csrf && location){
           let decodecsrf = decode(req.headers.csrf);
           let appid = decodecsrf.id;
           appcrud = customcrud("app");
           appcrud.update( {"id": appid}, {"location": location},function (err, vals) {
            //mysql callback
            if(err){
                res.status(500).send({
                    message: `Could update data : . ${err}`,
                  });  
            }
            
            res.status(200).send({
                status: 'success',
                data: {
                    message:`Data updated`,
                    obj: vals
                }
            });
        })
        }
        else{
            res.status(400).send({
                status: "error",
                message: "Not logged in."
            });
        }
    } catch (err) {
        res.status(500).send({
          message: `Could not update data : . ${err}`,
        });
      }
    return;
}

exports.updatepushnotificationtoken = (req,res) =>{
    try{
        const {devicetoken} = req.body;
        if(req.headers.csrf && devicetoken){
           let decodecsrf = decode(req.headers.csrf);
           let appid = decodecsrf.id;
           appcrud = customcrud("app");
           appcrud.update( {"id": appid}, {"devicetoken": devicetoken},function (err, vals) {
            //mysql callback
            if(err){
                res.status(500).send({
                    message: `Could update data : . ${err}`,
                  });  
            }
            
            res.status(200).send({
                status: 'success',
                data: {
                    message:`Data updated`,
                    obj: vals
                }
            });
        })
        }
        else{
            res.status(400).send({
                status: "error",
                message: "Not logged in."
            });
        }
    } catch (err) {
        res.status(500).send({
          message: `Could not update data : . ${err}`,
        });
      }
    return;
}
// to be done
exports.togglenotificationandprivacysettings = (req,res) =>{
    try{
        const {email, receivenotification, privacysetting} = req.body;
        if(email){
            User.findByEmail(email.trim(), (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            status: 'error',
                            message: `User with email ${email} was not found`
                        });
                        return;
                    }
                    res.status(500).send({
                        status: 'error',
                        message: err.message
                    });
                    return;
                }
                if (data) {
                   
                    let user_id = data.id;
                    let user_meta = customcrud("user_meta");
                    // receivenotification, privacysetting
                    user_meta.load({'user_id' : user_id, 'meta_key' : 'privacysetting'}, function(err,vals){
                        if(err){
                            res.status(500).send({
                                status: 'error while getting privacy setting',
                                message: err.message
                            });
                        }
                        
                        if(vals.length > 0){
                            // update
                            user_meta.update( {'user_id' : user_id, 'meta_key' : 'privacysetting'}, {"meta_value": privacysetting},function (err, vals) {
                                //mysql callback
                                if(err){
                                    res.status(500).send({
                                        message: `Could update privacysetting setting : . ${err}`,
                                      });  
                                }
                                
                            })
                        }
                        else{
                            
                            // create
                            user_meta.create({'user_id' : user_id, 'meta_key' : 'privacysetting',"meta_value": privacysetting}, function (err, vals) {
                                //mysql callback
                                if(err){
                                    res.status(500).send({
                                        message: `Could insert privacysetting setting : . ${err}`,
                                      });  
                                }
                            });
                        }
                    });
                    
                    user_meta.load({'user_id' : user_id, 'meta_key' : 'receivenotification'}, function(err,vals){
                        if(err){
                            res.status(500).send({
                                message: `Could update receivenotification setting : . ${err}`,
                              });  
                        }
                        if(vals.length > 0){
                            // update
                            user_meta.update( {'user_id' : user_id, 'meta_key' : 'receivenotification'}, {"meta_value": receivenotification},function (err, vals) {
                                //mysql callback
                                if(err){
                                    res.status(500).send({
                                        message: `Could update receivenotification setting : . ${err}`,
                                      });  
                                }
                                
                            })
                        }
                        else{
                            // create
                            user_meta.create({'user_id' : user_id, 'meta_key' : 'receivenotification',"meta_value": receivenotification}, function (err, vals) {
                                //mysql callback
                                if(err){
                                    res.status(500).send({
                                        message: `Could insert receivenotification setting : . ${err}`,
                                      });  
                                }
                            });
                        }
                    });
                    res.status(200).send({
                        status: 'success',
                        data: {
                            message:"Success"
                        }
                    });
                }
            });
        }
        else{
            res.status(400).send({
                status: "error",
                message: "Not logged in."
            });
        }

        // res.status(200).send({
        //     status: 'success',
        //     data: {
        //         message:"Settings updated"
        //     }
        // });
    } catch (err) {
        res.status(500).send({
          message: `Could not update data : . ${err}`,
        });
      }
    return;
}

exports.addnewexercise = (req,res) =>{
    try{
        res.status(200).send({
            status: 'success',
            data: {
                message:"Success"
            }
        });
    } catch (err) {
        res.status(500).send({
          message: `Could not get csrf : . ${err}`,
        });
      }
    return;
}

exports.updateexercise = (req,res) =>{
    try{
        res.status(200).send({
            status: 'success',
            data: {
                message:"Success"
            }
        });
    } catch (err) {
        res.status(500).send({
          message: `Could not get csrf : . ${err}`,
        });
      }
    return;
}

exports.deleteexercise = (req,res) =>{
    try{
        res.status(200).send({
            status: 'success',
            data: {
                message:"Success"
            }
        });
    } catch (err) {
        res.status(500).send({
          message: `Could not get csrf : . ${err}`,
        });
      }
    return;
}

exports.getallexercise = (req,res) =>{
    try{
        res.status(200).send({
            status: 'success',
            data: {
                message:"Success"
            }
        });
    } catch (err) {
        res.status(500).send({
          message: `Could not get csrf : . ${err}`,
        });
      }
    return;
}

exports.getuserexercises = (req,res) =>{
    try{
        res.status(200).send({
            status: 'success',
            data: {
                message:"Success"
            }
        });
    } catch (err) {
        res.status(500).send({
          message: `Could not get csrf : . ${err}`,
        });
      }
    return;
}

exports.getusersingleexercise = (req,res) =>{
    try{
        res.status(200).send({
            status: 'success',
            data: {
                message:"Success"
            }
        });
    } catch (err) {
        res.status(500).send({
          message: `Could not get csrf : . ${err}`,
        });
      }
    return;
}

exports.getleaderboard = (req,res) =>{
    try{
        res.status(200).send({
            status: 'success',
            data: {
                message:"Success"
            }
        });
    } catch (err) {
        res.status(500).send({
          message: `Could not get csrf : . ${err}`,
        });
      }
    return;
}