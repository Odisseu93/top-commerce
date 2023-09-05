const Category = require('../../models/ProductCategory');

class Validate {

	static async isUniqueName(name) {
		const nameAlreadyExists = await Category.findOne({ where: { name: name } });
		return !(nameAlreadyExists && nameAlreadyExists);
	}

	static async isValidParent(parentId) {
		const parentCategory = await Category.findOne({ where: { id: parentId } });

		return parentCategory || parentId === null;
	}

	static async isValidSubcategory(parentId) {
		const parentCategory = await Category.findOne({ where: { id: parentId } });
		return parentCategory && parentCategory.level < 3;
	}

	static async acceptableLevel(level) {
		return level >= 1 && level <= 3;
	}

	static async isValidName(name) {
		if (!name || name === '') return false;
		return true;
	}
}

module.exports = Validate;