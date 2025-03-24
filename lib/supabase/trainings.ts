import { supabase } from './client';
interface Training {
  id: string;
  name: string;
  user_id: string;
}

export async function createTraining(userId: string, training: Training) {
  const { data, error } = await supabase
    .from('trainings')
    .insert({
      id: training.id,
      name: training.name,
      user_id: userId,
    })
    .select();

  if (error) {
    console.error('Error creating training:', error);
    return { data: null, error };
  }
}
export async function getTrainings() {
  const { data, error } = await supabase.from('trainings').select('*');

  if (error) {
    console.error('Error getting trainings:', error);
    return { data: null, error };
  }
  console.log(data);
  return data;
}
