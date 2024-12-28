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
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const MultipleTextInput = ({ label, name, values, setFieldValue }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setFieldValue(name, [...values, inputValue]);
      setInputValue("");
    }
  };

  const handleRemove = (index) => {
    const newValues = values.filter((_, i) => i !== index);
    setFieldValue(name, newValues);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 ">
      <Card>
        <CardHeader>
          <CardTitle> {label} ?</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
          </label>
          <div className="flex items-center mb-2 space-x-4">
            <Input
              type="text"
              // className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              type="button"
              // className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
        </CardContent>
        <CardFooter className="">
          <div className=" p-4 rounded-lg mt-4 w-full">
            <h2 className="text-lg font-semibold mb-2">Input Preview:</h2>
            <div className="p-2 border rounded">
              {inputValue.trim() !== "" ? (
                <p className="text-gray-700">{inputValue}</p>
              ) : (
                <p className="text-gray-500">No input to preview</p>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-md py-1 px-2 bg-muted rounded-sm"
              >
                {value}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-transparent bg-red-200 p-1 border rounded-full ml-2"
                  onClick={() => handleRemove(index)}
                >
                  <X className=" text-red-800 " />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultipleTextInput;
