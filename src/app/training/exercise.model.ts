export interface Exercise {
  id: string
  name: string
  duration: number
  calories: number
  date?: Date
  state?: 'completed' | 'cancelled' | null
}//for the exercises in the dropdownn as well as exercises selected by user. dropdown will not have date and state so they are optional
