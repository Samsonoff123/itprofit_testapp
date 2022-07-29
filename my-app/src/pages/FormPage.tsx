import axios from 'axios'
import React from 'react'
import Input from '../components/Input'

//@ts-ignore
interface HTMLEterableFormElement extends HTMLFormElement { 
    elements: {
        forEach: (callbackfn: (value: any, index: number, array: any[]) => void, thisArg?: any) => void
    }
}

interface FormDataType {
    [key: string]: string | number | undefined,
    name?: string,
    email?: string,
    tel?: string,
    date?: string,
    message?: string
}

export default function FormPage() {

    const [isLoading, setIsLoading] = React.useState(false)

    const [obj, setObj] = React.useState('')

    const sendForm = async(e: React.FormEvent<HTMLFormElement>) => {
        // @ts-ignore-start
        const form: HTMLEterableFormElement = e.target
        e.preventDefault()

        setIsLoading(false)
        const formData: FormDataType = {}

        form.elements.forEach = new Array().forEach
        form.elements.forEach(el => {
            if (el.name) {
                formData[el.name] = el.value
            }
            
            
        })

        if (localStorage.getItem('valid') === 'true') {
            await axios.post('https://62e270fd3891dd9ba8e852c5.mockapi.io/test_form', formData)
        }
        getData()
        
        // @ts-ignore-end
    }

    React.useEffect(()=>{
        getData()
    }, [])

    const getData = async() => {
        const { data } = await axios.get('https://62e270fd3891dd9ba8e852c5.mockapi.io/test_form')
        
        setIsLoading(true)
        setObj(JSON.stringify(data, null, 4))
    }


  return (
    <form onSubmit={(event)=>sendForm(event)} className="container">
        <div className="input__flex">
            <Input 
                name='name'
                type='name'
                label='Имя Фамилия'
                textarea={false}
            />
            <Input 
                name='email'
                type='email'
                label='E-mail'
                textarea={false}
            />
        </div>
        <div className="input__flex">
            <Input 
                name='number'
                type='text'
                label='Номер телфона'
                textarea={false}
                maxLength={14}
            />
            <Input 
                name='date'
                type='date'
                label='Дата рождения'
                textarea={false}
            />
        </div>
            <Input 
                name='message'
                type='message'
                label='Сообщение'
                textarea={true}
            />
        <button>send</button>

        {
            isLoading 
                ?<div>{obj}</div>
                : <div>Loading...</div>
        }
    </form>
  )
}
