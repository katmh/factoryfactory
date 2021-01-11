<template>
  <div>
    Product Displayed: {{ product }}
  </div>
</template>

<script>
const products = [
  {
    path: "example-product-1",
    product: {name: "Product 1", price: 500}
  },
  {
    path: "example-product-2",
    product: {name: "Product 2", price: 1000}
  },
  {
    path: "example-product-3",
    product: {name: "Product 3", price: 1500}
  }
]
export default {
  props: ["productPath"],
  data () {
    return {
      product: {}
    }
  },
  created () {
   // look up the product
   const foundProduct = products.filter(product => {
     return product.path === this.productPath
   });
    // if it exists, proceed
    if (foundProduct.length > 0) {
      this.product = foundProduct;
    } else {
      // otherwise, go to the 404 page
      this.$router.push("/404");
    }
  }
}
</script>