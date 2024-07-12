const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
let productStore={};
const generateUniqueProducts = (products) => {
    return products.map(product => {
        const productId = uuidv4();
        productStore[productId] = product; 
        return { ...product, id: productId };
    });
}


  
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
const sortProducts = (products, sortBy, order) => {
    return products.sort((a, b) => {
        if (order === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });
}

exports.allProducts= async (req, res) => {
    const { categoryname } = req.params;
    const { top = 10, page = 1, sortBy = 'rating', order = 'desc', minPrice, maxPrice } = req.query;
    const companyname = 'SNP'; // Replace with the actual company name if dynamic
    console.log("8888888888888888",categoryname, top, page, sortBy, order, minPrice, maxPrice);
    // Validate input
    if (isNaN(top) || top <= 0 || isNaN(page) || page <= 0) {
        return res.status(400).send('Invalid parameters');
    }

    try {
        const apiUrl = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products`;
       const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzc5NTk4LCJpYXQiOjE3MjA3NzkyOTgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjVlYjE0NzE0LThhZWQtNDNjNS05NmQ3LTVkNmJjZmIwNTgzNyIsInN1YiI6Inlhc2gucGF0ZWxfY3MyMUBnbGEuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjVlYjE0NzE0LThhZWQtNDNjNS05NmQ3LTVkNmJjZmIwNTgzNyIsImNsaWVudFNlY3JldCI6InNnTnREZXhJZWJSUVd1cVgiLCJvd25lck5hbWUiOiJZYXNoIFBhdGVsIiwib3duZXJFbWFpbCI6Inlhc2gucGF0ZWxfY3MyMUBnbGEuYWMuaW4iLCJyb2xsTm8iOiIyMTE1MDAxMTU2In0.4WUrEDPTUbvPmwm6orvm4zE39-VDAPMkZcLj9FiR_aI"
        const response = await axios.get(apiUrl, {
            params: {
                top,
                minPrice,
                maxPrice
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        let products = response.data;

        if (minPrice) {
            products = products.filter(product => product.price >= minPrice);
        }
        if (maxPrice) {
            products = products.filter(product => product.price <= maxPrice);
        }

        products = sortProducts(products, sortBy, order);

        products = generateUniqueProducts(products);

        const totalProducts = products.length;
        const totalPages = Math.ceil(totalProducts / top);
        const startIndex = (page - 1) * top;
        const endIndex = startIndex + top;

        const paginatedProducts = products.slice(startIndex, endIndex);

        res.json({
            totalProducts,
            totalPages,
            currentPage: page,
            pageSize: top,
            products: paginatedProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving products');
    }
};

exports.singleProduct=(req, res) => {
    const { categoryname, productid } = req.params;
    console.log(categoryname, productid);
    console.log("Request for product details:", categoryname, productid);

    const product = productStore[productid];

    if (!product) {
        return res.status(404).send('Product not found');
    }

    res.json(product);
}