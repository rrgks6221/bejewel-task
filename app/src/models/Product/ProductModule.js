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

  static getToSaveOptions(productId, saveOptions) {
    return saveOptions.map((option) => {
      return [productId, option.name, option.addPrice];
    });
  }

  static getToSaveImages(productId, saveImages) {
    return saveImages.map((image) => [productId, image]);
  }
}

module.exports = ProductModule;
