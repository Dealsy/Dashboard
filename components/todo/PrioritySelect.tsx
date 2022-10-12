import { XCircleIcon } from '@heroicons/react/24/outline'
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
import { ColourOption } from '../../types/types'

type PrioritySelectProps = {
  removeTodo: () => void
  onChange: (e: any) => void
  input: string
  findTodo: (id: string) => void
  moveTodo: (id: string, atIndex: number) => void
  id: string
}

interface Item {
  id: string
  originalIndex: number
}

export function PrioritySelect({
  id,
  removeTodo,
  input,
  onChange,
  moveTodo,
  findTodo,
}: PrioritySelectProps) {
  const originalIndex: Item = findTodo(id).index
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
          const { index: overIndex } = findTodo(id)
          moveTodo(draggedId, overIndex)
        }
      },
    }),
    [findTodo, moveTodo]
  )

  const opacity = isDragging ? 0 : 1

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

  return (
    <>
      <div
        ref={(node) => drag(drop(node))}
        style={{ opacity }}
        className={clsx(
          'border-b-2 border-gray-300 m-10 p-5 flex flex-row justify-between'
        )}
      >
        <Input
          onChange={onChange}
          value={input}
          className="w-100 border-b-2 border-gray-200"
          placeholder="Write a todo item"
        />
        <Select
          defaultValue={colourOptions[2]}
          options={colourOptions}
          styles={colourStyles}
        />

        <Select
          defaultValue={ColourOptionsStatus[2]}
          options={ColourOptionsStatus}
          styles={colourStatusStyles}
        />

        <Button
          text="Remove"
          className="btn-red_text hover:bg-red-100"
          LeftImage={XCircleIcon}
          onClick={removeTodo}
        />
      </div>
    </>
  )
}
