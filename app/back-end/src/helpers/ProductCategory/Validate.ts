import Category from '../../models/ProductCategory.js';

class Validate {

	static async isUniqueName(name: string) {
		const nameAlreadyExists = await Category.findOne({ where: { name: name } });
		return !(nameAlreadyExists && nameAlreadyExists);
	}


	static active(active: string | number | boolean) {

		if (typeof active === 'boolean') return true;

		return active === 'true' ||
			active === 'false' ||
			active === 0 ||
			active === 1 ;
	}


	static async isValidParent(parentId: string | null) {
		if (!parentId) return true;

		const parentCategory = await Category.findOne({ where: { id: parentId } });

		if (parentCategory) return true;
		else return false;
	}


	static async isValidLevel(parentId: string | null) {

		const validLevel = async () => {

			if (parentId) {
				return await Category.findByPk(parentId).then(parentCategory => {

					if (!parentCategory) return false;
					const parentLevel = parentCategory.get('level');

					return Number(parentLevel) < 3;
				});

			}
			return true;
		};

		return await validLevel();
	}

	static async isValidName(name: string) {
		if (!name || name === '') return false;
		return true;
	}
}

export default Validate;
