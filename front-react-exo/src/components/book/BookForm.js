import React from "react"
import { Formik, Field, Form, FieldArray } from "formik"
import { FormField, ComicButton } from "../generic/Form"
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function BookForm({ initialValues = {}, handleSubmit, categories }) {
    // Ensure `initialValues` has the necessary structure for both creation and updates.
    const defaultValues = {
        title: "",
        author: "",
        editor: "",
        categories: [], // Start with an empty array for dynamic slots
        description: "",
        stock: 0,
        price: 0,
        isbn: "",
        pagenumber: 0,
        publishingyear: new Date().getFullYear(),
        librarianreview: "",
        image: "",
    }

    const [imagePreview, setImagePreview] = useState(initialValues.image || null)

    // Merge the default values with any provided initialValues (useful for updates).
    const formInitialValues = { ...defaultValues, ...initialValues }

    const handleImageChange = (event, formikSetFieldValue) => {
        const file = event.currentTarget.files[0]
        if (!file) return

        // Generate unique filename
        const fileExtension = file.name.split(".").pop()
        const fileName = `${uuidv4()}.${fileExtension}`
        const imagePath = `/images/books/${fileName}`

        const previewUrl = URL.createObjectURL(file)
        setImagePreview(previewUrl)
        formikSetFieldValue("image", imagePath)
    }

    return (
        <Formik initialValues={formInitialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
                <Form className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField name="title" label="Titre" />
                    <FormField name="author" label="Auteur" />
                    <FormField name="editor" label="Éditeur" />

                    {/* Dynamic Category Slots Using FieldArray */}
                    <div className="col-span-2">
                        <label className="flex flex-col font-comic">
                            <span className="mb-1 text-lg">Categories:</span>
                            <FieldArray name="categories">
                                {({ push, remove }) => (
                                    <div>
                                        {Array.isArray(values.categories) &&
                                        values.categories.length > 0 ? (
                                            values.categories.map((_, index) => (
                                                <div key={index} className="flex items-center mb-2">
                                                    <Field
                                                        as="select"
                                                        name={`categories.${index}`}
                                                        className="flex-grow mr-2 border rounded"
                                                    >
                                                        <option
                                                            value=""
                                                            label="Sélectionner une catégorie"
                                                        />
                                                        {Array.isArray(categories) &&
                                                        categories.length > 0 ? (
                                                            categories.map((category) => (
                                                                <option
                                                                    key={category._id}
                                                                    value={category.name}
                                                                >
                                                                    {category.name}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option value="" disabled>
                                                                Aucune catégorie disponible
                                                            </option>
                                                        )}
                                                    </Field>
                                                    <ComicButton
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="px-2 py-1 text-sm"
                                                    >
                                                        Supprimer
                                                    </ComicButton>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Aucune catégorie ajoutée pour ce livre.</p>
                                        )}
                                        <ComicButton
                                            type="button"
                                            onClick={() => push("")}
                                            className="mt-2"
                                        >
                                            Ajouter une catégorie
                                        </ComicButton>
                                    </div>
                                )}
                            </FieldArray>
                        </label>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-lg font-comic">Image de couverture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, setFieldValue)}
                            className="w-full p-2 border-4 border-black rounded-lg shadow-comic font-comic
                                     file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black
                                     file:rounded-lg file:font-comic file:bg-white hover:file:bg-gray-100"
                        />
                        {imagePreview && (
                            <div className="mt-4 border-4 border-black rounded-lg shadow-comic p-4">
                                <img
                                    src={imagePreview}
                                    alt="Book cover preview"
                                    className="max-h-48 mx-auto object-contain"
                                />
                            </div>
                        )}
                    </div>

                    <FormField name="description" label="Description" as="textarea" />
                    <FormField name="stock" label="Stock" type="number" />
                    <FormField name="price" label="Prix" type="number" />
                    <FormField name="isbn" label="ISBN" />
                    <FormField name="pagenumber" label="Nombre de Pages" type="number" />
                    <FormField name="publishingyear" label="Année de Publication" type="number" />
                    <FormField name="librarianreview" label="Avis du Libraire" as="textarea" />

                    <ComicButton type="submit" className="col-span-2 mt-4">
                        {initialValues._id ? "Mettre à jour" : "Créer"}
                    </ComicButton>
                </Form>
            )}
        </Formik>
    )
}
