import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Select from 'react-select'

import Button from '../../components/reuseable_components/Button'
import Input from '../../components/reuseable_components/Input'
import {
  colourStatusStyles,
  colourStyles,
  dot,
} from '../../hooks/ColourOptions'
import { ItemTypes } from '../../types/itemTypes'

type PrioritySelectProps = {
  setTodoItems: (todoItems: any) => void
  onChange: (e: any) => void
  input: string
  findTodo: (id: string) => void
  moveTodo: (id: string, atIndex: number) => void
  id: string
  colourOptions: any
  ColourOptionsStatus: any
  item: any
  setOpen: (open: boolean) => void
  handleChange: (colourOptions: any) => void
  todo: any
}

interface Item {
  id: string
  originalIndex: number
}

export function PrioritySelect({
  id,
  setTodoItems,
  input,
  onChange,
  moveTodo,
  findTodo,
  ColourOptionsStatus,
  colourOptions,
  item,
  setOpen,
  handleChange,
  todo,
}: PrioritySelectProps) {
  // @ts-ignore
  const originalIndex: number = findTodo(id).index
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveTodo(droppedId, originalIndex)
        }
      },
    }),
    [id, originalIndex, moveTodo]
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          // @ts-ignore
          const { index: overIndex } = findTodo(id)
          moveTodo(draggedId, overIndex)
        }
      },
    }),
    [findTodo, moveTodo]
  )

  return (
    <>
      <div
        ref={(node) => drag(drop(node))}
        className={clsx(
          'border-b-2 border-gray-300 m-10 p-5 flex flex-row justify-between',
          isDragging ? 'bg-gray-200 p-10 shadow-2xl' : 'bg-white'
        )}
      >
        <Bars3Icon className="w-7 h-7 mt-3 cursor-pointer" />
        <Input
          onChange={onChange}
          value={input}
          className="w-100 border-b-2 border-gray-200"
          placeholder="Write a todo item"
        />
        <Select
          defaultValue={colourOptions[1]}
          options={colourOptions}
          styles={colourStyles}
          onChange={handleChange}
          value={colourOptions.find((obj: any) => obj.value === todo)}
        />

        <Select
          defaultValue={ColourOptionsStatus[0]}
          options={ColourOptionsStatus}
          styles={colourStatusStyles}
        />

        <Button
          text="Remove"
          className="btn-red_text hover:bg-red-100"
          LeftImage={XCircleIcon}
          onClick={() => {
            setTodoItems(item)
            setOpen(true)
          }}
        />
      </div>
    </>
  )
}
