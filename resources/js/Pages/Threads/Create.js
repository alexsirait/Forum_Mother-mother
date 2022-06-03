import Button from '@/Components/Button'
import FormThread from '@/Components/FormThread'
import Input from '@/Components/Input'
import Forum from '@/Layouts/Forum'
import { useForm } from '@inertiajs/inertia-react'
import React from 'react'

export default function Create({category}) {
    const { data, setData, post, reset } = useForm({
        title: '',
        body: '',
        category_id: '',
    })
    
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault()
        post(route('threads.store'))
    }

  return (
    <div>
        <FormThread {...{ data, category, submitHandler, handleChange, submit: 'Update' }} />
    </div>
  )
}

Create.layout = page => <Forum children={page} title="New Thread"/>
