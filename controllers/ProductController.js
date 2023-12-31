const ProductModel = require('../models/Product')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dax7jurba',
    api_key: '879468916817865',
    api_secret: 'lOPE_ryneU8HXV40qbPNj-wqxl0'
});

class ProductController {
    static getallproduct = async (req, res) => {
        try {
            const product = await ProductModel.find()
            // console.log(category);
            res.status(201).json({
                status: 'success',
                message: 'successfull',
                product,
            })
        } catch (error) {
            console.log(error);
        }
    }
    //admin
    static createproduct = async (req, res) => {
        try {
            const { name, description, price, image, category, stock } = req.body
            const file = req.files.image
            const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'productimageApi'
            })
            const result = new ProductModel({
                name: name,
                description: description,
                price: price,
                category: category,
                stock: stock,
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url
                }
            })
            await result.save()
            res.status(201).json({
                status: "success",
                message: "Product Inserted Successfully 😃🍻",
            });

        } catch (error) {
            console.log(error);
        }
    }
    static getallproductdetail = async (req, res) => {
        try {
            //    console.log(req.params.id);
            const product = await ProductModel.findById(req.params.id)
            res.status(201).json({
                status: 'success',
                message: 'successfull',
                product,
            })
        } catch (error) {
            console.log(error);
        }
    }
    static updateproduct = async (req, res) => {
        try {
            // console.log(req.params.id);
            const { name, description, price, image, category, stock } = req.body
            if (req.files) {
                // console.log(req.params.id);
                const product = await ProductModel.findById(req.params.id)
                // console.log(product);
                const imageid = product.image.public_id
                // console.log(imageid);
                await cloudinary.uploader.destroy(imageid)
                const file = req.files.image
                const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'productimageApi'
                })
                var data = {
                    name: name,
                    description: description,
                    price: price,
                    category: category,
                    stock: stock,
                    image: {
                        public_id: image_upload.public_id,
                        url: image_upload.secure_url

                    }

                }

            } else {
                var data = {
                    name: name,
                    description: description,
                    price: price,
                    category: category,
                    stock: stock
                }
            }
            const update = await ProductModel.findByIdAndUpdate(req.params.id, data)
            res.status(201).json({
                status: 'success',
                message: 'successfull',
                update,
            })
        } catch (error) {
            console.log(error);
        }
    }
    static deleteproduct = async (req, res) => {
        try {
            await ProductModel.findByIdAndDelete(req.params.id)
            res.status(201).json({
                status: 'success',
                message: 'Delete Successfully',
            })
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = ProductController