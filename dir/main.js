var app = new Vue({
    el: '#app',
    data: {
        product: 'FIRST AID BEAUTY',
        product_desc: 'Ultra Repair® Cream Intense Hydration',
        productID: '1217744',
        productDetail: 'SIZE: 6 oz/ 170 g',
        productPrice: '$34.00',
        image: '/8oz.png',
        inStock: true,
        cart: 0,
        sizes: ["Standard Size","Mini Size","Value Size"],
        variants: [
            {
                variantID: 1217744,
                variantName: "Standard Size",
                variantSize: "6 oz/170 g",
                variantImage: '/6oz.png',
                variantDetail: "SIZE: 6 oz/ 170 g",
                variantPrice: "$34.00"
            },
            {
                variantID: 1309590,
                variantName: "Mini Size",
                variantSize: "2 oz/56.7 g",
                variantImage: '/2oz.png',
                variantDetail: "SIZE: 2 oz/ 56.7 g",
                variantPrice: "$14.00"
            },
            {
                variantID: 2339489,
                variantName: "Value Size",
                variantSize: "8 oz/ 226 g",
                variantImage: '/8oz.png',
                variantDetail: "SIZE: 8 oz/ 226 g Limited Edition FAB AID",
                variantPrice: "$42.00"
            },
        ]
    },
    methods: {
        addToCart(){
            this.cart += 1
        },
        updateProduct(variantImage,variantID,variantDetail,variantPrice){
            this.image = variantImage
            this.productID = variantID,
            this.productDetail = variantDetail
            this.productPrice = variantPrice
        },
        removeFromCart(){
            this.cart -= 1
        }
        
    }
})