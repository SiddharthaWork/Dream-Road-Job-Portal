import * as yup from 'yup';

export const jobFormSchema = yup.object({
  title: yup.string().required('Job title is required'),
  department: yup.string().required('Department is required'),
  location: yup.string().required('Location is required'),
  type: yup.string().required('Employment type is required'),
  experience: yup.string().required('Experience level is required'),
  salaryMin: yup.number().required('Minimum salary is required').typeError('Must be a number'),
  salaryMax: yup.number().required('Maximum salary is required').typeError('Must be a number'),
  description: yup.string().required('Job description is required'),
  skills: yup.array().of(yup.string()).min(1, 'At least one skill is required'),
  benefits: yup.string(),
  perks: yup.string(),
  deadline: yup.date().nullable(),
  hasDeadline: yup.boolean(),
  status: yup.string(),
});
