'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createWeight, updateWeight } from '../actions/weight-actions'
import { Card } from '@/components/ui/card'

interface WeightFormProps {
  initialData?: {
    id: string
    type: string
    kg: number
  }
}

export function WeightForm({ initialData }: WeightFormProps) {
  const [type, setType] = useState(initialData?.type || '')
  const [kg, setKg] = useState(initialData?.kg.toString() || '')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (initialData) {
      await updateWeight(initialData.id, { type, kg: parseFloat(kg) })
    } else {
      await createWeight({ type, kg: parseFloat(kg) })
    }
    setType('')
    setKg('')
    router.refresh()
  }

  return (
    <Card className="p-5 m-2 shadow-xl shadow-green-500/20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="type">Weight Type</Label>
          <Input
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="kg">Weight (kg)</Label>
          <Input
            id="kg"
            type="number"
            step="0.01"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            required
          />
        </div>
        <Button variant="outline" type="submit">{initialData ? 'Update' : 'Add'} Weight</Button>
      </form>
    </Card>
  )
}

