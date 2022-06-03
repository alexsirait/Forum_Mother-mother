import React from 'react'
import Button from './Button'
import Input from './Input'
import Label from './Label'

export default function FormThread({ data, category, submitHandler, handleChange, submit }) {
  return (
    <div>
        <form onSubmit={submitHandler}>
            <div className="mb-4">
                <Label value={`Title`}/>
                <Input placeholder='The title of the thread . . .' type='text' value={data.title} name='title' handleChange={handleChange} />
            </div>
            <div className="mb-4">
                <Label value={`Content`}/>
                <textarea rows={`5`} placeholder='Your thread content . . .' className='resize-none transitio w-full duration-200 border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 rounded-md shadow-sm' name="body" value={data.body} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <Label value={`Category`}/>
                <select name="category_id" onChange={handleChange}>
                    <option>Choose Category</option>
                    {category.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
                </select>
            </div>
            <div className="mb-4">
                <Button children={submit} />
            </div>
        </form>
    </div>
  )
}
