import { classes } from './mockData';

// Function to get all classes
export const getAllClasses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(classes);
    }, 1000); // Simulate API delay
  });
};
