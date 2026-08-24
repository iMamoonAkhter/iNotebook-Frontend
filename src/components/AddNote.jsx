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
    <div className="card-padded animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-surface-900">Add a Note</h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-5">
            <div>
              <label htmlFor="title" className="label">Title</label>
              <Field
                type="text"
                className="input"
                id="title"
                name="title"
              />
              <ErrorMessage name="title" component="div" className="mt-1.5 text-sm text-red-500" />
            </div>

            <div>
              <label htmlFor="description" className="label">Description</label>
              <Field
                as="textarea"
                className="input resize-y min-h-[120px]"
                id="description"
                name="description"
                placeholder="Write a description..."
                onChange={(e) => {
                  setFieldValue('description', e.target.value);
                  handleDescriptionChange(e);
                }}
                value={values.description}
              />
              <ErrorMessage name="description" component="div" className="mt-1.5 text-sm text-red-500" />
            </div>

            <div>
              <label htmlFor="tag" className="label">Tag</label>
              <Field
                type="text"
                className="input"
                id="tag"
                name="tag"
                placeholder="Tag (e.g., Work, Personal, Ideas)"
              />
            </div>

            <div className="pt-2">
              <button type="submit" className="btn-primary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Note
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNote;