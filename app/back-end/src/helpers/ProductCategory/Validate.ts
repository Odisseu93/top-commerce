import Category from '../../models/ProductCategory.js';

class Validate {

	static async isUniqueName(name: string) {
		const nameAlreadyExists = await Category.findOne({ where: { name: name } });
		return !(nameAlreadyExists && nameAlreadyExists);
	}

	static async isValidParent(parentId: string) {
		const parentCategory = await Category.findOne({ where: { id: parentId } });

		return parentCategory || parentId === null;
	}

	static async isValidSubcategory(parentId: string) {
		const parentCategory = await Category.findOne({ where: { id: parentId } });
		return parentCategory && parentCategory.level < 3;
	}

	static async acceptableLevel(level: number) {
		return level >= 1 && level <= 3;
	}

	static async isValidName(name: string) {
		if (!name || name === '') return false;
		return true;
	}
}

export default Validate;
