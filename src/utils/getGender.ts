export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
} as const;

export type Gender = ValueOf<typeof GENDER>;

export function getGender() {
  return Math.random() > 0.5 ? GENDER.MALE : GENDER.FEMALE;
}
