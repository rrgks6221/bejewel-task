'use strict';

class ProductModule {
  static getNotExistCategories(presentCategories, inputCategories) {
    presentCategories = presentCategories.map((category) => category.id);

    const notExistCategories = inputCategories.filter((inputCategory) => {
      return !presentCategories.includes(inputCategory);
    });

    return notExistCategories;
  }

  static getToSaveCategories(productId, saveCategories) {
    return saveCategories.map((category) => [productId, category]);
  }
}

module.exports = ProductModule;
