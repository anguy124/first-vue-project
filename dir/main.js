Vue.config.devtools = true

Vue.component('product', {
    props: {
        shipping: {
            type: String,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
        </div>
        <div class="product-info">
            <h2>{{ title }}</h2>
        <p>ITEM {{ productID }}</p>
        <p>{{ productDetail }}</p>
        <p>{{ productPrice }}</p>
        <p>{{ shipping }}
        <p v-if="inStock">In Stock</p>
        <p v-else v-bind:disabled="!inStock" 
        v-bind:class="{ disabledButton: !inStock }">Out of Stock</p>

        <div v-for="(variant,index) in variants" v-bind:key="variant.variantID">
            <p>{{ variant.variantName }}</p>
            <p v-on:mouseover="updateProduct(index)"
                class="buttonStyle">{{ variant.variantSize }}</p>
        </div>

        <button v-on:click="addToCart">Add to Cart</button>
        <button v-on:click="removeFromCart">Remove Item</button>
        <div class="cart">
            <p>Cart({{ cart }})</p>
        </div>
        </div>
    </div>`,
    data() {
        return {
        product: 'FIRST AID BEAUTY',
        product_desc: 'Ultra Repair® Cream Intense Hydration',
        selectedVariant: 0,
        cart: 0,
        sizes: ["Standard Size","Mini Size","Value Size"],
        variants: [
            {
                variantID: 1217744,
                variantName: "Standard Size",
                variantSize: "6 oz/170 g",
                variantImage: '/6oz.png',
                variantDetail: "SIZE: 6 oz/ 170 g",
                variantPrice: "$34.00",
                variantQuantity: 100
            },
            {
                variantID: 1309590,
                variantName: "Mini Size",
                variantSize: "2 oz/56.7 g",
                variantImage: '/2oz.png',
                variantDetail: "SIZE: 2 oz/ 56.7 g",
                variantPrice: "$14.00",
                variantQuantity: 100
            },
            {
                variantID: 2339489,
                variantName: "Value Size",
                variantSize: "8 oz/ 226 g",
                variantImage: '/8oz.png',
                variantDetail: "SIZE: 8 oz/ 226 g Limited Edition FAB AID",
                variantPrice: "$42.00",
                variantQuantity: 0
            },
        ]
        }
    },
    methods: {
        addToCart(){
            this.cart += 1
        },
        updateProduct(index){
            this.selectedVariant = index
            console.log(index)
        },
        removeFromCart(){
            this.cart -= 1
        }
        
    },
    computed: {
        title(){
            return this.product + " " + this.product_desc
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        productID(){
            return this.variants[this.selectedVariant].variantID
        },
        productDetail(){
            return this.variants[this.selectedVariant].variantDetail
        },
        productPrice(){
            return this.variants[this.selectedVariant].variantPrice
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        shipping: "SPEND $50 FOR FREE SHIPPING"
    }
})