package com.example.SpringBootDemo.product;

public class ProductDTO {

    private String oldProductName;
    private ProductEntity newProduct;

    public String getOldProductName() {
        return oldProductName;
    }

    public void setOldProductName(String oldProductName) {
        this.oldProductName = oldProductName;
    }

    public ProductEntity getNewProduct() {
        return newProduct;
    }

    public void setNewProduct(ProductEntity newProduct) {
        this.newProduct = newProduct;
    }
}
