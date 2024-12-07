package com.cjc.test.service;

import java.util.List;
import java.util.Optional;

import com.cjc.test.entity.Product;

public interface ProductServiceInterface {

	public List<Product> getAllProducts();
	
    public Product addProduct(Product product);
    
    public Optional<Product> getProductById(Long id);
    
    public Product updateProduct(Long id, Product product);
   
    public boolean deleteProduct(Long id);


}
