import  { ChangeEvent } from 'react'

 interface InputForm{
    lable:string , 
    placeholder:string ,
    type?: string,
    onChange:(e:ChangeEvent<HTMLInputElement>)=> void;

}

const InputForm = ({lable , placeholder ,onChange ,type}:InputForm) => {
  return (
    <div className="w-full max-w-sm min-w-[200px]">
        <div className='font-semibold'>{lable}</div>
  <input  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={placeholder} onChange={onChange} type={type} />
</div>
  )
}

export default InputForm