import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const IngredientsInput = ({ ingredients, setFieldValue }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (title.trim() !== "" && description.trim() !== "") {
      const newIngredient = { title, description };
      setFieldValue("ingredients", [...ingredients, newIngredient]);
      setTitle("");
      setDescription("");
    }
  };

  const handleRemove = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setFieldValue("ingredients", newIngredients);
  };

  return (
    <>
      <div className="">
        <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col mb-2 space-y-4">
                <Input
                  type="text"
                  placeholder="Ingredient Name"
                  // className="border rounded w-full py-2 px-3 text-gray-700 mb-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Ingredient Description"
                  // className="border rounded w-full py-2 px-3 text-gray-700 mb-2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="button"
                variant="outline"
                className="my-1 w-40"
                onClick={handleAdd}
              >
                Add Ingredient
              </Button>
            </CardFooter>
          </Card>

          <div>
          <Card className="">
            <CardHeader>
              <CardTitle>Priview Of ingredients</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[225px] overflow-auto">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="bg-background p-2 mb-2 rounded">
                <h4 className="font-bold">{ingredient.title}</h4>
                <p>{ingredient.description}</p>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 mt-1"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            </CardContent>
            <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientsInput;
