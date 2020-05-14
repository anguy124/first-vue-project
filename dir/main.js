var app = new Vue({
    el: '#app',
    data: {
        name: 'Face Cleanser',
        brand: 'Drunk Elephant',
        image: '/drunk-elephant.png', 
        onSale: true,
        variants: [
            {variantName: 'Drunk Elephant', variantID: 'ITEM 2331841', variantQuantity: 10, variantPrice: 59.99}
        ]
    },
    computed: {
        title(){
            return this.variants.variantName
        }
    }
})