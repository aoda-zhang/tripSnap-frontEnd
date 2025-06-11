import { z } from 'zod';

export enum Step1FormMapping {
  TripName = 'tripName',
  Destination = 'destination',
  Participants = 'participants',
  Transport = 'transport',
  TransportNo = 'transportNo',
}
// Validation schema
export const getStep1schema = (t: (key: string) => string) => {
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
      .number()
      .min(1, 'Participants is required'),
    [Step1FormMapping.Transport]: z.string(),
    [Step1FormMapping.TransportNo]: z.string(),
  });
};

// Export the schema Type
export type Step1FormType = z.infer<ReturnType<typeof getStep1schema>>;
