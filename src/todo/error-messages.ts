export const ErrorMessages = {
  name: {
    isEmpty: 'Name is empty.',
    short: 'Name must have at least 3 characters.',
    long: 'Name must have at most 10 characters.',
  },
  description: {
    isEmpty: 'Description is empty.',
    short: 'Description must have at least 10 characters.',
  },
} as const;
