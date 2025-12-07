import React, { useEffect, useState } from 'react'

type Item = { id?: number; title: string; description?: string }

const API = 'http://localhost:8080/api/items'

export default function App() {
  const [items, setItems] = useState<Item[]>([])
  const [form, setForm] = useState<Item>({ title: '', description: '' })
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    try {
      const res = await fetch(API)
      if (!res.ok) throw new Error(`GET failed ${res.status}`)
      const data = await res.json()
      setItems(data)
    } catch (err) {
      console.error('fetchItems error', err)
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingId !== null) {
        const res = await fetch(`${API}/${editingId}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        })
        if (!res.ok) throw new Error(`PUT failed ${res.status}`)
        setEditingId(null)
      } else {
        const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (!res.ok) throw new Error(`POST failed ${res.status}`)
      }
      setForm({ title: '', description: '' })
      await fetchItems()
    } catch (err) {
      console.error('submit error', err)
      alert('Request failed — check console for details')
    }
  }

  function edit(item: Item) {
    setEditingId(item.id ?? null)
    setForm({ title: item.title, description: item.description ?? '' })
  }

  async function remove(id?: number) {
    if (id === undefined || id === null) return
    try {
      const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
      if (!res.ok && res.status !== 204) throw new Error(`DELETE failed ${res.status}`)
      await fetchItems()
    } catch (err) {
      console.error('delete error', err)
      alert('Delete failed — check console')
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Items</h1>
      <form onSubmit={submit} style={{ marginBottom: 20 }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ marginLeft: 8 }} />
        <button type="submit" style={{ marginLeft: 8 }}>{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '' }) }} style={{ marginLeft: 8 }}>Cancel</button>}
      </form>

      <ul>
        {items.map(it => (
          <li key={it.id} style={{ marginBottom: 8 }}>
            <strong>{it.title}</strong> — {it.description}
            <button onClick={() => edit(it)} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={() => remove(it.id)} style={{ marginLeft: 6 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
