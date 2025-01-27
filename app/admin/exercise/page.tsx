import { authMiddleware } from '@/lib/auth';
import { ExerciseTable } from '@/app/components/exercise-table';
import { getExercise } from '@/app/actions/exercise-actions';
import { ExerciseForm } from '@/app/components/exercise-form';


export default async function WeightsPage() {

  await authMiddleware();
  const exercise = await getExercise();

  return (
    <div className="container mx-auto py-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div>
          <ExerciseForm />
        </div>
        <div>
          <ExerciseTable exercise={exercise} />
        </div>
      </div>
    </div>
  )
}

