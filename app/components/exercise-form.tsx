'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { createExercise, updateExercise } from '../actions/exercise-actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ExerciseFormProps {
  initialData?: {
    id: number
    name: string
    type: string
  }
}

const types = [
  'STRENGTH',
  'CARDIO',
  'MOBILITY',
  'PLYOMETRIC',
  'CALISTHENICS'
]

export function ExerciseForm({ initialData }: ExerciseFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [type, setType] = useState(initialData?.type || '')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (initialData) {
      await updateExercise(initialData.id, { name, type })
    } else {
      await createExercise({ name, type })
    }
    router.refresh();
  }

  return (
    <Card className="p-5 m-2 shadow-xl shadow-green-500/20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <Input
              id="name"
              type="string"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Exercise Name"
              required
            />
          </div>
          <Select onValueChange={(value) => setType(value)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select Exercise Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((e, index) => (
                <SelectItem key={index} value={e}>{e}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" type="submit">{initialData ? 'Update' : 'Add'} Exercise</Button>
      </form >
    </Card >
  )
}
