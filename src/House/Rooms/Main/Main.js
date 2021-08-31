import React from 'react'
import Form from "../../Things/Form/Form";

function Main() {
  const defaultValues = {
    test: [
      {
        name: "Form Container 1",
        nestedArray: [{ title: "title", decsription: "decription" }]
      },
      {
        name: "Form Container 2",
        nestedArray: [{ title: "title", decsription: "decription", point: "0" }]
      }
    ]
  };

  return (
    <div>
      <Form defaultValues={defaultValues} />
    </div>
  )
}

export default Main
