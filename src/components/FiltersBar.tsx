import React from 'react'
import DebouncedInput from './inputs/DebouncedInput'

export default function FiltersBar({ search, onSearch, status, onStatus, onLimit }: any) {
  return (
    <div className="flex gap-3 items-center mb-4">
      <DebouncedInput value={search} onChange={onSearch} placeholder="Search name or email" />
      <select value={status} onChange={e => onStatus(e.target.value)} className="p-2 border rounded">
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <select onChange={e => onLimit(Number(e.target.value))} className="p-2 border rounded">
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  )
}
