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
            <p v-else v-bind:class="{ outOfStock: !inStock }">Out of Stock</p>

            <div v-for="(variant,index) in variants" v-bind:key="variant.variantID">
                <p>{{ variant.variantName }}</p>
                <p v-on:mouseover="updateProduct(index)"
                    class="buttonStyle">{{ variant.variantSize }}</p>
            </div>

            <button v-on:click="addToCart" 
                v-bind:disabled="!inStock" 
                v-bind:class="{ disabledButton: !inStock }">Add to Cart</button>
            
            <button v-on:click="removeFromCart">Remove Item</button>

            <div>
                <h2> Reviews </h2>
                <p v-if="reviews.length == 0"> There are no reviews yet! </p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>Review: {{ review.review }}</p>
                    </li>
                </ul>
            </div>

            <product-review v-on:review-submitted="addReview"></product-review>
            
        </div>
    </div>`,
    data() {
        return {
        product: 'FIRST AID BEAUTY',
        product_desc: 'Ultra Repair® Cream Intense Hydration',
        selectedVariant: 0,
        sizes: ["Standard Size","Mini Size","Value Size"],
        reviews: [],
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
                variantQuantity: 5
            },
            {
                variantID: 2339489,
                variantName: "Value Size",
                variantSize: "8 oz/ 226 g",
                variantImage: '/8oz.png',
                variantDetail: "SIZE: 8 oz/ 226 g Limited Edition FAB AID",
                variantPrice: "$42.00",
                variantQuantity: 30
            }
        ]
        }
    },
    methods: {
        addToCart(){
            this.$emit('add-to-cart',this.variants[this.selectedVariant].variantID)
        },
        updateProduct(index){
            this.selectedVariant = index
        },
        removeFromCart(){
            this.$emit('remove-from-cart',this.variants[this.selectedVariant].variantID)
        },
        addReview(productReview){
            this.reviews.push(productReview)
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
            if (this.variants[this.selectedVariant].variantQuantity <= 100 && this.variants[this.selectedVariant].variantQuantity >= 5) return true
            else return false
            
        }
    }
})

Vue.component('product-review', {
    template: 
    `<form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please correct the following error(s)</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>`,
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if (this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null, 
                this.review = null, 
                this.rating = null
                this.errors = []
            } 
            else {
                if (!this.name)this.errors.push("Name required!")
                if (!this.review)this.errors.push("Review required!")
                if (!this.rating)this.errors.push("Rating required!")
            }

        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        shipping: "SPEND $50 FOR FREE SHIPPING",
        cart: []
    },
    methods: {
        updateCart(id){
            this.cart.push(id)
        },
        removeItem(id){
            for(var i = this.cart.length; i >= 0; i--){
                if (this.cart[i] === id){
                    this.cart.splice(i,1);
                }
            }
        }
    }
})