const db = require('../../config/database')

module.exports = class RecipesRecipes {
    constructor(name, description, preparation_time, difficulty){
        this.name = name,
        this.description = description,
        this.preparation_time = preparation_time,
        this.difficulty = difficulty
    }
    static getAll() {
        return db.execute('SELECT * FROM Recipes')
    }
    create() {
        return db.execute(`INSERT INTO Recipes (name, description, preparation_time, difficulty) VALUES ('${this.name}', '${this.description}', '${this.preparation_time}', '${this.difficulty}')`)
    }

    static getById(id) {
        return db.execute(`SELECT * FROM Recipes WHERE recipe_id = ${id}`)

    }

    static delete(id) {
        return db.execute(`DELETE FROM Recipes WHERE recipe_id = ${id}`)
    }

    update(id) {
        return db.execute(`UPDATE Recipes SET Recipes.name = '${this.name}', Recipes.description = '${this.description}', Recipes.preparation_time = '${this.preparation_time}', Recipes.difficulty = '${this.difficulty}' WHERE recipe_id = ${id}`)
    }


}