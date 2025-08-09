import { z } from 'zod';

export enum Step1FormMapping {
  TripName = 'tripName',
  Destination = 'destination',
  Participants = 'participants',
}
// Validation schema
export const getTripBasicSchema = (t: (key: string) => string) => {
  return z.object({
    [Step1FormMapping.TripName]: z
      .string()
      .trim()
      .min(1, 'Trip name is required')
      .max(20, 'Trip name is too long')
      .regex(/^[a-zA-Z0-9 ]*$/, t('trip.trip_name_rules')),
    [Step1FormMapping.Destination]: z
      .string()
      .trim()
      .min(1, 'Destination is required')
      .max(50, 'Destination is too long'),
    [Step1FormMapping.Participants]: z
      .string()
      .min(1, 'Number of Travelers is required')
      .regex(/^\d+$/, 'Only numbers are allowed'),
  });
};

// Export the schema Type
export type TripBasic = z.infer<ReturnType<typeof getTripBasicSchema>>;
