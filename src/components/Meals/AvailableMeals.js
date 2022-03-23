import { useState, useEffect } from 'react';
import MealItem from './MealsItem/MealItem';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';

const AvailableMeals = () => {
    
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(()=>{
      async function fetchMeals(){
        try{
          const response = await fetch('https://react-meals-2ea12-default-rtdb.firebaseio.com/meals.json');
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
          const data = await response.json();
          let loadedMeals = [];
          for(let key in data){
            loadedMeals.push({
              id:key,
              name:data[key].name,
              description:data[key].description,
              price:data[key].price
            })
          }

          setMeals(loadedMeals);
          setIsLoading(false);
        }
        catch(error){
          setIsLoading(false);
          setHttpError(error.message);
        }
      }
      fetchMeals();
    },[]);


    const mealList = meals.map((meal)=>
    <MealItem
    id={meal.id} 
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
    />
    )

    if(httpError){
      return (
        <section className={classes.mealsError}>
        <p>Failed to fetch</p>
        </section>
      )
    }
    return (
        <section className={classes.meals}>
            <Card>
             {
              isLoading && <p className={classes.mealsLoading}>Loading...</p>
             }
             <ul>
                 {mealList}
             </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;