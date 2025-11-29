import React, { useState, useEffect } from 'react'

export default function DebouncedInput({ value, onChange, placeholder = '' }: any) {
  const [internal, setInternal] = useState(value)
  useEffect(() => setInternal(value), [value])
  useEffect(() => {
    const id = setTimeout(() => onChange(internal), 400)
    return () => clearTimeout(id)
  }, [internal, onChange])

  return (
    <input
        className={"w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 hover:border-gray-400"}
        placeholder={placeholder}
        value={internal || ''}
        onChange={e => setInternal(e.target.value)}
      /> )
}
