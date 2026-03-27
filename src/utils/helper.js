// utils/helper.js


export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};


export const isValidPassword = (password) => {
  return password && password.length >= 6;
};


export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};


export const isValidUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,}$/;
  return regex.test(username);
};


export const isValidPhone = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};



export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!isRequired(email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email';
  }

  if (!isRequired(password)) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(password)) {
    errors.password = 'Minimum 6 characters required';
  }

  return errors;
};