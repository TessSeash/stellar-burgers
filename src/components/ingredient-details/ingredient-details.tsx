import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ingredientsSelector } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  // Получаем id ингредиента из параметров маршрута
  const { id } = useParams<{ id: string }>();
  // Получаем массив ингредиентов из стора
  const ingredients = useSelector(ingredientsSelector);
  // Ищем ингредиент с нужным id
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  // Если ингредиент не найден — показываем прелоадер
  if (!ingredientData) {
    return <Preloader />;
  }

  // Если найден — отображаем детали ингредиента
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
