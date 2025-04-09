type Meal = {
  title: string;
  foods: Food[];
};

type Food = {
  name: string;
  calories: number;
  protein: number;
};

type LogFoodEntry = {
  date: string;
  meals: Meal[];
};
