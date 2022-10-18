import { PlusCircleIcon } from '@heroicons/react/24/outline'
import update from 'immutability-helper'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

import Button from '../components/reuseable_components/Button'
import RemoveModal from '../components/reuseable_components/RemoveModal'
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

  const [todos, setTodos] = useState<toDo[]>([])
  const [todo, setTodo] = useState<string>()
  const [open, setOpen] = useState(false)
  const [todoItems, setTodoItems] = useState<any>([])
  const [priority, setPriority] = useState(colourOptions[1].label)
  const [status, setStatus] = useState(ColourOptionsStatus[0].label)

  console.log(todos)

  const inputVale = useRef<HTMLInputElement>(null)

  const updateStatus = (id: string, status: string) => {
    const newTodo = clone(todos)
    const todo = newTodo.find((todo: any) => todo.id === id)
    todo.status = status
    setTodos(newTodo)
  }

  const updatePriority = (id: string, priority: string) => {
    const newTodo = clone(todos)
    const todo = newTodo.find((todo: any) => todo.id === id)
    if (todo) {
      todo.priority = priority
    }
    setTodos(newTodo)
  }

  // addtodo
  const addTodo = useCallback(
    (e: any) => {
      e.preventDefault()
      if (todo) {
        const newTodo = {
          id: id,
          input: todo,
          priority: priority,
          status: status,
        }
        setTodos([...todos, newTodo])
        inputVale.current!.value = ''
      }
    },
    [todo, priority, status, todos, id]
  )

  const addTodoToApi = async () => {
    const response = await fetch('http://localhost:3000/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todos),
    })
    const data = await response.json()
    console.log(data)
  }

  // Removes a todo item
  const removeTodo = (id: string) => {
    const newValues = todos.filter((i) => i.id !== id)
    setTodos(newValues)
    setOpen(false)
  }

  // Drag and drop code
  const findTodo = useCallback(
    (id: string) => {
      const card = todos.filter((c) => `${c.id}` === id)[0] as toDo
      return {
        card,
        index: todos.indexOf(card),
      }
    },
    [todos]
  )

  const moveTodo = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findTodo(id)
      setTodos(
        update(todos, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      )
    },
    [findTodo, todos, setTodos]
  )

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }))

  return (
    <div>
      <div className="border-b-2 border-gray-300 border-dashed m-10  flex flex-row justify-between">
        <div className="flex flex-row">
          <input
            className="border-b-2 border-gray-300 mr-2 p-2  mb-2  w-100"
            type="text"
            placeholder="Add a todo item"
            onChange={(e) => setTodo(e.target.value)}
            ref={inputVale}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTodo(e)
              }
            }}
          />
          <Button
            text="Add Todo"
            className="btn-green_text"
            RightImage={PlusCircleIcon}
            onClick={addTodo}
          />
        </div>

        <Button
          text="Save todo list"
          className="btn-blue mb-1 p-3"
          RightImage={PlusCircleIcon}
          onClick={addTodo}
        />
      </div>
      <div ref={drop}>
        {todos.map((item) => (
          <PrioritySelect
            id={`${item.id}`}
            key={item.id}
            item={item}
            setOpen={setOpen}
            colourOptions={colourOptions}
            ColourOptionsStatus={ColourOptionsStatus}
            todo={todos}
            moveTodo={moveTodo}
            findTodo={findTodo}
            setTodoItems={setTodoItems}
            input={item.input}
            updatePriority={updatePriority}
            updateStatus={updateStatus}
            onChange={(e) => {
              // Clone so you don't mutate state.
              const newTodos = clone(todos)
              // Attempt to find the item
              const val = newTodos.find((v: any) => v.id === item.id)
              // Make sure it exists
              if (!val) return
              // Update

              val.input = e.target.value

              setTodos(newTodos)
            }}
          />
        ))}
      </div>

      <RemoveModal
        title="Remove Todo Item"
        description={
          todoItems.input
            ? 'Are you sure you want to remove the todo item labeled'
            : 'Are you sure you want to remove the todo item?'
        }
        description_two="This action cannot be undone."
        open={open}
        setOpen={setOpen}
        removeTodo={removeTodo}
        todoItems={todoItems}
      />
    </div>
  )
}
