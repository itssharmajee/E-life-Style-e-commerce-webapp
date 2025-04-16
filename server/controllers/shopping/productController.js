import { Product } from '../../models/product.js'

export const fetchFilteredProducts = async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

        let filters = {};

        if (category.length) {
            filters.category = { $in: category.split(",") };
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(",") };
        }

        let sort = {};

        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1;//items should be sorted in ascending order based on price.

                break;
            case "price-hightolow":
                sort.price = -1;//items should be sorted in descending order based on price.

                break;
            case "title-atoz":
                sort.title = 1;//meaning the items should be sorted in ascending order alphabetically by title (A to Z)

                break;

            case "title-ztoa":
                sort.title = -1;

                break;

            default:
                sort.price = 1;
                break;
        }

        const products = await Product.find(filters).sort(sort)
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'having some error while fetching'
        })

    }
}

export const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (e) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};
