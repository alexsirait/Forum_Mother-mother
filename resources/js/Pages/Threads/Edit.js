import Button from '@/Components/Button'
import FormThread from '@/Components/FormThread'
import Input from '@/Components/Input'
import Forum from '@/Layouts/Forum'
import { Head, useForm } from '@inertiajs/inertia-react'
import React from 'react'

export default function Edit({ category, thread }) {
    const { data, setData, put } = useForm({
        title: thread.title,
        body: thread.body,
        category_id: thread.category_id,
    })

    const submitHandler = (e) => {
        e.preventDefault()
        put(route('threads.update', thread.slug))
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

  return (
    <div>
        <Head title={thread.title} />
        <FormThread {...{ data, category, submitHandler, handleChange, submit: 'Update' }} />
    </div>
  )
}

Edit.layout = page => <Forum children={page} />
