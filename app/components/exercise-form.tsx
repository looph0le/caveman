'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { createExercise, updateExercise } from '../actions/exercise-actions'

interface ExerciseFormProps {
  initialData?: {
    id: number
    name: string
  }
}

export function ExerciseForm({ initialData }: ExerciseFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (initialData) {
      await updateExercise(initialData.id, { name })
    } else {
      await createExercise({ name })
    }
    router.refresh();
  }

  return (
    <Card className="p-5 m-2 shadow-xl shadow-green-500/20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Exercise Name</Label>
          <Input
            id="name"
            type="string"
            step="0.01"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <Button variant="outline" type="submit">{initialData ? 'Update' : 'Add'} Exercise</Button>
      </form>
    </Card>
  )
}
