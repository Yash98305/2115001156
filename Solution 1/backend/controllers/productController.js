const catchAsyncError = require("../middlewares/catchAsyncError");
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.topnproduct = catchAsyncError(async(req,res)=>{
    const products = await Product.find().sort({rating:-1}).limit(parseInt(req.params.n));
    res.status(200).json({success:true, data:products});
})
exports.getProduct = catchAsyncError(async (category, company) => {
    const url = `http://20.244.56.144/test/companies/${companyname}/categories/:categoryname/products?top=${n}&minPrice=${p}&maxPrice=${q}`;
  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });
  
    const products = response.data.products.map(product => ({
      ...product,
      id: uuidv4(),
    }));
  
    setCache(url, products);
    return products;
  })
  