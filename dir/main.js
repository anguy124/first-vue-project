Vue.config.devtools = true

var eventBus = new Vue()

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

            <product-tabs v-bind:reviews="reviews"></product-tabs>

            
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
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
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
                eventBus.$emit('review-submitted', productReview)
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

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: 
    `<div>
        <span class="tabs" 
        v-bind:class="{ activeTab: selectedTab === tab }"
        v-for="(tab,index) in tabs" 
        v-bind:key="index"
        v-on:click="selectedTab = tab">{{ tab }}</span>

        <div v-show="selectedTab === 'Reviews'" class="review-section">
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

        <product-review v-show="selectedTab === 'Make a Review'"></product-review>

        <div v-show="selectedTab === 'Details'">
            <p> 
            <b>What it is</b>: A fast-absorbing, rich moisturizer that provides instant and long-term hydration for dry, distressed skin and eczema.
            <br>
            <b>Skin Type:</b> Normal, Dry, and Combination
            <br>
            <b>Skincare Concerns:</b> Dryness, Fine Lines and Wrinkles, and Redness
            <br>
            <b>Formulation:</b> Rich Cream
            <br>
            <b>What Else You Need to Know:</b> Award-winning Ultra Repair Cream is instantly absorbed for immediate relief for parched skin. Suitable for all skin types, even sensitive, and the whole family. Formulated with colloidal oatmeal, this soothing moisturizer leaves your skin feeling smooth, hydrated, and comfortable after just a single use.
            <br>
            <b>Clinical Results: In an independent clinical study:</b>
            - 169% immediate improvement in skin hydration
            <br>
            <b>In a consumer perception study:</b>
            - 100% reported a lasting improvement in skin dryness
            - 100% reported the product helped soothe, moisturize, and condition skin
            <br>
            <b>Clean at Sephora</b>
            When you spot our Clean seal, you can be sure we’ve checked that this brand’s product is made without the ingredients you told us you’d most like to avoid.
            <br>
            <b>Clean at Sephora™ is formulated without:</b>
            Sulfates SLS and SLES, parabens, formaldehydes, formaldehyde-releasing agents, phthalates, mineral oil, retinyl palmitate, oxybenzone, coal tar, hydroquinone, triclosan, triclocarban. All skincare, hair, and makeup brands with the Clean Seal have less than one percent of synthetic fragrances. </p>
        </div>

        <div v-show="selectedTab === 'How to Use'">
            <p><b>Suggested Usage:</b><br>
            -Apply to face and/or body at least twice daily or as needed to restore and soothe dry, uncomfortable skin.</p>
        </div>

        <div v-show="selectedTab === 'Ingredients'">
        <p> 
        <ul>
            <li>
                Colloidal Oatmeal (OTC): FDA-designated skin protectant that relieves itching and minor irritation caused by eczema, rashes, and other skin conditions.
            </li>
            <li>
                Shea Butter: Moisturizes and protects the skin barrier with vitamins, minerals, and essential fatty acids.
            </li>
            <li>
                Allantoin: Calms and soothes skin.
            </li>
        </ul>
        Water/Aqua/Eau, Stearic Acid, Glycerin, C12-15 Alkyl Benzoate, Caprylic/Capric Triglyceride, Glyceryl Stearate, Glyceryl Stearate SE, Cetearyl Alcohol, Dimethicone, Butyrospermum Parkii (Shea) Butter, Squalane, Phenoxyethanol, Caprylyl Glycol, Allantoin, Xanthan Gum, Sodium Hydroxide, Disodium EDTA, Chrysanthemum Parthenium (Feverfew) Extract, Camellia Sinensis (White Tea) Leaf Extract, Glycyrrhiza Glabra (Licorice) Root Extract, Ceramide-3, Eucalyptus Globulus Leaf Extract.</p>
        </div>

    </div>

    `, 
    data(){
        return {
            tabs: ['Details', 'How to Use', 'Ingredients','Make a Review', 'Reviews'],
            selectedTab: 'Details'
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