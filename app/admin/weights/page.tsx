import { authConfig, authMiddleware } from '@/lib/auth';
import { WeightForm } from '../.././components/weight-form'
import { WeightTable } from '../../components/weight-table'
import { getWeights } from '../../actions/weight-actions'

export default async function WeightsPage() {
  await authMiddleware();
  const weights = await getWeights()

  return (
    <div className="container mx-auto py-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <WeightForm />
        </div>
        <div>
          <WeightTable weights={weights} />
        </div>
      </div>
    </div>
  )
}

