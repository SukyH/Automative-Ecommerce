package com.ecommerce.Ecommerce.service.interf;

import com.ecommerce.Ecommerce.entity.Category;
import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();
    Category createCategory(Category category);
    Category getCategoryById(Long id);
}