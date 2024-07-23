const db = require('../../config/database');

module.exports = class RecipesRecipes {
    constructor(name, image_path, ingredients, steps) {
        this.name = name;
        this.image_path = image_path;
        this.ingredients = ingredients; // Array of {name, amount}
        this.steps = steps; // Array of {description, step_number}
    }

    static getAll() {
        return db.execute('SELECT * FROM Recipes');
    }

    async create() {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
    
            // Validar valores
            if (this.name === undefined || this.image_path === undefined) {
                throw new Error('Invalid recipe data');
            }
    
            // Insert the recipe
            const [result] = await connection.execute(
                'INSERT INTO Recipes (name, image_path) VALUES (?, ?)',
                [this.name || null, this.image_path || null]
            );
            const recipeId = result.insertId;
    
            // Insert the ingredients and their relationships
            for (const ingredient of this.ingredients) {
                if (!ingredient.name || ingredient.amount === undefined) {
                    throw new Error('Invalid ingredient data');
                }
    
                let [ingredientResult] = await connection.execute(
                    'SELECT ingredient_id FROM Ingredients WHERE name = ?',
                    [ingredient.name]
                );
    
                let ingredientId;
                if (ingredientResult.length === 0) {
                    // Insert the new ingredient
                    const [newIngredientResult] = await connection.execute(
                        'INSERT INTO Ingredients (name) VALUES (?)',
                        [ingredient.name]
                    );
                    ingredientId = newIngredientResult.insertId;
                } else {
                    ingredientId = ingredientResult[0].ingredient_id;
                }
    
                // Insert into Recipe_Ingredients
                await connection.execute(
                    'INSERT INTO Recipe_Ingredients (recipe_id, ingredient_id, amount) VALUES (?, ?, ?)',
                    [recipeId, ingredientId, ingredient.amount || null]
                );
            }
    
            // Insert the steps
            for (const step of this.steps) {
                if (!step.description || step.step_number === undefined) {
                    throw new Error('Invalid step data');
                }
    
                await connection.execute(
                    'INSERT INTO Steps (recipe_id, description, step_number) VALUES (?, ?, ?)',
                    [recipeId, step.description || null, step.step_number || null]
                );
            }
    
            await connection.commit();
            return { recipeId };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
    
    

    static async getById(id) {
        const recipeQuery = 'SELECT * FROM Recipes WHERE recipe_id = ?';
        const ingredientsQuery = `
            SELECT i.name, ri.amount
            FROM Ingredients i
            JOIN Recipe_Ingredients ri ON i.ingredient_id = ri.ingredient_id
            WHERE ri.recipe_id = ?
        `;
        const stepsQuery = 'SELECT description, step_number FROM Steps WHERE recipe_id = ? ORDER BY step_number';

        const [recipeResult] = await db.execute(recipeQuery, [id]);
        const [ingredientsResult] = await db.execute(ingredientsQuery, [id]);
        const [stepsResult] = await db.execute(stepsQuery, [id]);

        if (recipeResult.length === 0) {
            return null; // Recipe not found
        }

        const recipe = recipeResult[0];
        recipe.ingredients = ingredientsResult;
        recipe.steps = stepsResult;

        return recipe;
    }

    static delete(id) {
        return db.execute(`DELETE FROM Recipes WHERE recipe_id = ?`, [id]);
    }

    static async deleteReferences(recipeId) {
        const deleteIngredientsQuery = 'DELETE FROM Recipe_Ingredients WHERE recipe_id = ?';
        const deleteStepsQuery = 'DELETE FROM Steps WHERE recipe_id = ?';

        await db.execute(deleteIngredientsQuery, [recipeId]);
        await db.execute(deleteStepsQuery, [recipeId]);
    }

    update(id) {
        return db.execute(
            `UPDATE Recipes SET name = ?, image_path = ? WHERE recipe_id = ?`,
            [this.name, this.image_path, id]
        );
    }
}
