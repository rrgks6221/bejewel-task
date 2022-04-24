'use strict';

class ProductModule {
  static getNotExistCategories(presentCategories, inputCategories) {
    presentCategories = presentCategories.map((category) => category.id);

    const notExistCategories = inputCategories.filter((inputCategory) => {
      return !presentCategories.includes(inputCategory);
    });

    return notExistCategories;
  }
}

module.exports = ProductModule;
