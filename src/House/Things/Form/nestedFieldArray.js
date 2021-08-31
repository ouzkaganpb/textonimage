import React from "react";
import { useFieldArray } from "react-hook-form";

const NestedField = ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `test.${nestIndex}.nestedArray`
  });

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id + k} style={{ marginLeft: 20 }}>
            <label>Nested Array:</label>
            {Object.keys(item).map((key,index) => {
              if(key === "id") return null
              return (
                <div key={key + item[key]}>
                <label>{key}</label>
                <input
                  {...register(`test.${nestIndex}.nestedArray.${k}.${key}`, {
                    required: true
                  })}
                  style={{ marginRight: "25px" }}
                />
                    </div>
                  )
            })}
            <button type="button" onClick={() => remove(k)}>
              Delete Nested
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() =>
          append({
            ...fields[0]
          })
        }
      >
        Append Nested
      </button>

      <hr />
    </div>
  );
};
export default NestedField