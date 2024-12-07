package com.cjc.test.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.cjc.test.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
