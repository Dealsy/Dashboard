import { PlusCircleIcon } from '@heroicons/react/24/outline'
import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

import Button from '../components/reuseable_components/Button'
import { PrioritySelect } from '../components/todo/PrioritySelect'
import { clone } from '../helpers/clone'
import { ItemTypes } from '../types/itemTypes'
import { ColourOption } from '../types/types'

type toDo = {
  id: string
  input: string
  priority: string
  status: string
}

export default function Todo() {
  const id = uuidv4()

  const [todo, setTodo] = useState<toDo[]>([])

  const colourOptions: readonly ColourOption[] = [
    { value: 'red', label: 'High Priority', color: '#FF5630', isFixed: true },
    { value: 'yellow', label: 'Medium Priority', color: '#FFC400' },
    { value: 'green', label: 'low Priority', color: '#36B37E' },
  ]

  const ColourOptionsStatus: readonly ColourOption[] = [
    { value: 'red', label: 'Not Started', color: '#FF5630', isFixed: true },
    { value: 'blue', label: 'in Progress', color: '#0052CC' },
    { value: 'green', label: 'Completed', color: '#36B37E' },
  ]

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
            colourOptions={colourOptions}
            ColourOptionsStatus={ColourOptionsStatus}
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
              setTodo(newTodos)
            }}
          />
        ))}
      </div>
    </div>
  )
}
