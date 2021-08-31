import React from "react";
import { useFieldArray } from "react-hook-form";
import NestedArray from "./nestedFieldArray";

let renderCount = 0;

export default function Fields({ control, register, setValue, getValues,defaultValues }) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: "test"
  });


  renderCount++;

  const handleAppend = () => {
    console.log(defaultValues)
    const newValues = {...defaultValues}
    setValue("test", [
      ...(getValues().test || []),
      {
        ...newValues.test[0]
      }
    ]);
  }
  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input {...register(`test.${index}.name`)} />
              {/* <h4>{item/}</h4>               */}
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({ name: "append" });
          }}
        >
          append
        </button>

        <button
          type="button"
          onClick={() => {
            setValue("test", [
              ...(getValues().test || []),
              {
                name: "append",
                nestedArray: [{ field1: "append", field2: "append" }]
              }
            ]);
          }}
        >
          Append Nested
        </button>
        <button
          type="button"
          onClick={handleAppend}
        >
          Append Version 1 
        </button>
        <button
          type="button"
          onClick={() => {
            prepend({ name: "append" });
          }}
        >
          prepend
        </button>

        <button
          type="button"
          onClick={() => {
            setValue("test", [
              {
                name: "append",
                nestedArray: [{ field1: "Prepend", field2: "Prepend" }]
              },
              ...(getValues().test || [])
            ]);
          }}
        >
          prepend Nested
        </button>
      </section>

      <span className="counter">Render Count: {renderCount}</span>
    </>
  );
}
