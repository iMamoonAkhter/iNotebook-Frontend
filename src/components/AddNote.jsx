import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NoteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote, getNotes, host } = context;

  const [misspelledWords, setMisspelledWords] = useState([]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters long")
      .required("Title is required"),
    description: Yup.string()
      .min(5, "Description must be at least 5 characters long")
      .required("Description is required"),
    tag: Yup.string().required("Tag is required"),
  });

  const initialValues = {
    title: "",
    description: "",
    tag: "General",
  };

  const handleSubmit = async (values, { resetForm }) => {
    await addNote(values.title, values.description, values.tag);
    resetForm();
    getNotes();
  };

  const handleDescriptionChange = async (event) => {
    const text = event.target.value;
    try {
      const response = await fetch(`${host}/api/spellcheck`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setMisspelledWords(data.misspelledWords);
      } else {
        const errorData = await response.json();
        console.error('Error fetching misspelled words:', errorData.error);
      }
    } catch (error) {
      console.error('Error fetching misspelled words:', error);
    }
  };

  const highlightText = (text) => {
    let highlightedText = '';
    let lastIndex = 0;

    misspelledWords.forEach(({ word, start, end }, index) => {
      highlightedText += text.slice(lastIndex, start);
      highlightedText += `<span style="color: red;">${text.slice(start, end)}</span>`;
      lastIndex = end;
    });

    highlightedText += text.slice(lastIndex);
    return highlightedText;
  };

  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="my-3">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <Field
                type="text"
                className="form-control"
                id="title"
                name="title"
              />
              <ErrorMessage name="title" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <Field
                as="textarea"
                className="form-control"
                id="description"
                name="description"
                placeholder="Write a description"
                onChange={(e) => {
                  setFieldValue('description', e.target.value);
                  handleDescriptionChange(e);
                }}
                value={values.description}
              />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <Field
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                placeholder="Tag"
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">Add Note</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNote;
