import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useEffect } from "react";

function AvailableMeals() {
  const [meals, setmeals] = useState([]);
  const [loading, setloading] = useState(true);
  const [err, seterr] = useState();

  useEffect(() => {
    const fectchData = async () => {
      const response = await fetch(
        "https://react-http-afbd9-default-rtdb.firebaseio.com/meals.json"
      );
      if(!response.ok)
      {
        throw new Error("Something went wrong")
      }
      const data = await response.json();
      const Meals = [];
      for (var key in data) {
        Meals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setmeals(Meals);
      setloading(false);
    };

      fectchData().catch((error)=>{
        setloading(false)
        seterr(error)
      })
    },[])
  

  if (loading) {
    return <p>Loading...</p>;
  }

 if (err!= null) {
    return <p  >{err.message}</p>;
  }
  const mealsList = meals.map((meals) => (
      <MealItem
        key={meals.id}
        name={meals.name}
        description={meals.description}
        price={meals.price}
        id={meals.id}
      />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
