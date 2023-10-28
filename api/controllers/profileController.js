import User from "../models/user.js";
import bcrypt from "bcryptjs";

// ////////////////////////         Get Profile       ///////////////////////////

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {...other  } = user._doc;
    res.status(200).send({
      status: "Success",
      message: "Show user profile",
      data: other,
    });
  } catch (error) {
    console.log(error, "<<==Error");
    res.status(500).send({
      status: "Failed",
      message: error.message,
    });
  }
};


// ////////////////////////         Update Profile       ///////////////////////////


export const updateProfile = async (req, res) => {
    if(req.body.id === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                console.log(error, 'passwaord hash nahi hoa')
                res.status(404).send({
                    status : "Failed",
                    message: error.message
                })
                
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,{
                ...req.body
            })
            res.status(200).send({
                status: "Success",
                message:"Profile has been updated"
            })
            
        } catch (error) {
            console.log(error, ">> Profile update me issue agaya hy ");
            res.status(404).send({
                status: "Failed",
                message: error.message,
            });
        }



    }
    else {
        return res.status(403).send({
            status: "Failed",
            message: "You can update only your profile",
        });
    }

  
};

// ////////////////////////         delete Profile       ///////////////////////////


export const deleteProfile =async (req, res) => {
    if(req.body.id === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            console.log(user);
            res.status(200).send({
                status: "Success",
                message: "Account has been deleted",
            })
        } catch (error) {
            console.log(error, "<<==Error");
            res.status(500).send({
                status: "Failed",
                message: error.message,
            });
            
        }

    }
    else {
        return res.status(403).send({
            status: "Failed",
            message: "You can delete only your profile",
        });
    }
  
};

// ////////////////////////         follow Profile       ///////////////////////////


export const followProfile = async(req, res) => {
    console.log(req.params.id)
    if (req.body.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
    console.log(user)

            const currentUser = await User.findById(req.body.id)
    console.log(currentUser)

            if(!user.followers.includes(req.body.id)){
                await user.updateOne({$push: {followers:req.body.id}})
                await currentUser.updateOne({$push: {followings:req.params.id}})
                res.status(200).send({
                    status: "Success",
                    message: "User has been followed",
                })
            }
            else {
                return res.status(403).send({
                    status: "Failed",
                    message: "you already follow this user",
                });
            }
        } catch (error) {
            console.log(error, "<<==Error");
            res.status(500).send({
                status: "Failed",
                message: error.message,
            });
            
        }


    }
    else {
        return res.status(403).send({
            status: "Failed",
            message: "You can't follow yourself",
        });
    }
  
};

// ////////////////////////         unFollow Profile       ///////////////////////////


export const unFollowProfile = async(req, res) => {
    console.log(req.params);
    if (req.body.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            console.log(user);
            const currentUser = await User.findById(req.body.id);
            console.log(currentUser);
            if (user.followers.includes(req.body.id)) {
                await user.updateOne({ $pull: { followers: req.body.id } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).send({
                    status: "Success",
                    message: "User has been unfollowed",
                })
            } else {
                return res.status(404).send({
                    status: "Failed",
                    message: "you can't follow this user",
                });
            }
        } catch (error) {
            console.log(error, "<<==Error");
            res.status(500).send({
                status: "Failed",
                message: error.message,
            });
        }
    } else {
        return res.status(403).send({
            status: "Failed",
            message: "You can't unfollow yourself",
        });
    }
};
