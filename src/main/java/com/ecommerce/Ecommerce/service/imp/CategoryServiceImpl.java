package com.ecommerce.Ecommerce.service.imp;

import com.ecommerce.Ecommerce.dto.CategoryDto;
import com.ecommerce.Ecommerce.entity.Category;
import com.ecommerce.Ecommerce.mapper.EntityMapper;
import com.ecommerce.Ecommerce.repository.CategoryRepository;
import com.ecommerce.Ecommerce.service.interf.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

	  private final CategoryRepository categoryRepository;
	    private final EntityMapper entityMapper;

	    @Autowired
	    public CategoryServiceImpl(CategoryRepository categoryRepository, EntityMapper entityMapper) {
	        this.categoryRepository = categoryRepository;
	        this.entityMapper = entityMapper;
	    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category = entityMapper.categoryDtoToCategory(categoryDto);
        Category savedCategory = categoryRepository.save(category);
        return entityMapper.categoryToCategoryDto(savedCategory);
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        existingCategory.setName(category.getName());  // Assuming Category has a 'name' field
        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        categoryRepository.delete(category);
    }
}
