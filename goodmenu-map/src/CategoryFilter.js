import React from 'react';

const categories = ['전체', '주차 가능', '무료 주차', '조끼 대여', '음료 구비', '공 대여', '풋살화 대여', '남녀 구분 화장실'];

const CategoryFilter = ({ onCategoryChange }) => {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button key={category} onClick={() => onCategoryChange(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
