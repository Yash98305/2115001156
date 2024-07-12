const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const User = require("../models/uerModel.js");
const sendToken = require("../jwtToken/jwtToken.js");
const fs = require("fs");
 

exports.userRegisterController = catchAsyncErrors(async (req, res, next) => { 
  const {companyName,clientID, clientSecret, ownerName,ownerEmail,rollNo } = req.body;
    if (companyName||clientID, clientSecret, ownerName,ownerEmail,rollNo) {
      return next(new ErrorHandler("Please Enter Required Field", 400));
    }
    const user= await User.findOne({ email }).select("+password");
    if (user) {
      return next(new ErrorHandler("User already exists", 401));
    }
      const newUser = new User({
        name,phone, email, password
      });
     await newUser.save();
     
      sendToken(newUser, 201, res);
  });
  

exports.userLoginController = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid credentials", 401));
    }
    sendToken(user, 200, res);
  });

  exports.profileController = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  })

  exports.photoController = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user.photo.data) return next(new ErrorHandler("User photo not found", 404));
    if (user.photo.data) {
      res.set("Content-type", user.photo.contentType);
      return res.status(200).send(user.photo.data);
    }
  }) 
  
  
exports.updateProfileController = catchAsyncErrors(async (req, res, next) => {
  
  const { photo } = req.files;
 
  if(photo && photo.size > 1000000)
    return next(new ErrorHandler("Photo should be less then 1mb",500));

    const user = await User.findByIdAndUpdate(
  req.params.id,
  { ...req.fields},
  { new: true,
    runValidators: true,
    useFindAndModify: false, }
);

if (photo) {
  user.photo.data = fs.readFileSync(photo.path);
  user.photo.contentType = photo.type;
}

await user.save();
  res.status(200).json({
    success: true,
    user
  });
});
