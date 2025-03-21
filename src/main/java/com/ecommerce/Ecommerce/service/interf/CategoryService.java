package com.ecommerce.Ecommerce.service.interf;

import com.ecommerce.Ecommerce.entity.Category;
import com.ecommerce.Ecommerce.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    
    Category getCategoryById(Long id);
    public CategoryDto createCategory(CategoryDto categoryDto);
    Category updateCategory(Long id, Category category);
    void deleteCategory(Long id);
}