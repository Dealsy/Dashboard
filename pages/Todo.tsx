import { PlusCircleIcon } from '@heroicons/react/24/outline'
import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

import Button from '../components/reuseable_components/Button'
import { PrioritySelect } from '../components/todo/PrioritySelect'
import { clone } from '../helpers/clone'
import { ItemTypes } from '../types/itemTypes'

type toDo = {
  id: string
  input: string
  priority: string
  status: string
}

export default function Todo() {
  const id = uuidv4()

  const [todo, setTodo] = useState<toDo[]>([])
  const [input, setInput] = useState('')

  console.log(todo)

  // Creates a new todo item
  const addTodo = () => {
    setTodo([
      ...todo,
      {
        id,
        input: '',
        priority: '',
        status: '',
      },
    ])
  }
  //  adds todo data to api
  const addTodoToApi = async () => {
    const response = await fetch('http://localhost:3000/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    const data = await response.json()
    console.log(data)
  }

  // Removes a todo item
  const removeTodo = (id: string) => {
    const newValues = todo.filter((i) => i.id !== id)
    setTodo(newValues)
  }

  const findTodo = useCallback(
    (id: string) => {
      const card = todo.filter((c) => `${c.id}` === id)[0] as toDo
      return {
        card,
        index: todo.indexOf(card),
      }
    },
    [todo]
  )

  const moveTodo = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findTodo(id)
      setTodo(
        update(todo, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      )
    },
    [findTodo, todo, setTodo]
  )

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }))

  return (
    <div>
      <div className="border-b-2 border-gray-300 border-dashed m-10  flex flex-row justify-between">
        <Button
          text="Add Todo"
          className="btn-green_text"
          RightImage={PlusCircleIcon}
          onClick={addTodo}
        />
      </div>
      <div ref={drop}>
        {todo.map((item) => (
          <PrioritySelect
            id={`${item.id}`}
            key={item.id}
            moveTodo={moveTodo}
            findTodo={findTodo}
            removeTodo={() => removeTodo(item.id)}
            input={item.input}
            onChange={(e) => {
              // Clone so you don't mutate state.
              const newTodos = clone(todo)
              // Attempt to find the item
              const val = newTodos.find((v: any) => v.id === item.id)
              // Make sure it exists
              if (!val) return
              // Update
              val.input = e.target.value
              console.log('New TODO', newTodos)
              console.log('vale', val)
              console.log('vale res', val.response)
              setTodo(newTodos)
            }}
          />
        ))}
      </div>
    </div>
  )
}
