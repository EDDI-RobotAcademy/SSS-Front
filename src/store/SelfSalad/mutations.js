import {
    REQUEST_INGREDIENT_LIST_TO_SPRING,
    REQUEST_INGREDIENT_TO_SPRING,
    REQUEST_INGREDIENT_CATEGORY_TO_SPRING,
    REQUEST_INGREDIENT_INFO_TO_SPRING,
    REQUEST_INGREDIENT_AMOUNT_TO_SPRING,
    
} from './mutation-types'

export default {
    [REQUEST_INGREDIENT_LIST_TO_SPRING] (state, passingData) {
        state.ingredients = passingData
    },
    [REQUEST_INGREDIENT_TO_SPRING] (state, passingData) {
        state.ingredient = passingData
    },
    [REQUEST_INGREDIENT_CATEGORY_TO_SPRING] (state, passingData) {
        state.ingredients = passingData
    },
    [REQUEST_INGREDIENT_INFO_TO_SPRING] (state, passingData) {
        state.ingredientInfo = passingData
    },
    [REQUEST_INGREDIENT_AMOUNT_TO_SPRING] (state, passingData) {
        state.ingredientAmount = passingData
    }

}