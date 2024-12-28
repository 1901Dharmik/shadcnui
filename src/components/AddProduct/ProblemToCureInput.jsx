import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
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

const ProblemToCureInput = ({ problems, setFieldValue }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleAdd = () => {
    if (title && description && images.length > 0) {
      const newProblem = {
        title,
        description,
        images: images.map((img) => ({
          public_id: img.public_id,
          url: img.url,
        })),
      };
      setFieldValue("problem_to_cure", [...problems, newProblem]);
      setTitle("");
      setDescription("");
      setImages([]);
    }
  };

  const handleRemove = (index) => {
    const newProblems = problems.filter((_, i) => i !== index);
    setFieldValue("problem_to_cure", newProblems);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Problems to Cure</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Problem Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Problem Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <ImageUpload setImages={setImages} images={images} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" onClick={handleAdd}>
              Add Problem
            </Button>
          </CardFooter>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Problems List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{problem.title}</h3>
                    <p className="text-sm text-gray-600">
                      {problem.description}
                    </p>
                    {problem.images.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img.url}
                        alt={`Problem ${index + 1} Image ${imgIndex + 1}`}
                        className="mt-2 w-32 h-32 object-cover rounded-md"
                      />
                    ))}
                  
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle>Problems List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3">
                      <div className="col-spans-2">
                        {problem.images.map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img.url}
                            alt={`Problem ${index + 1} Image ${imgIndex + 1}`}
                            className="mt-2 w-32 h-32 object-cover rounded-md"
                          />
                        ))}
                      </div>
                      <div className="col-span-2">
                      <h3 className="font-semibold">{problem.title}</h3>
                      <p className="text-sm text-gray-600">
                        {problem.description}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleRemove(index)}
                        className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProblemToCureInput;
