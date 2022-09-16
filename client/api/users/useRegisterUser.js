import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const addNewUser = (registerPayload) => {
  return axios.post('http://localhost:8000/api/v1/users', registerPayload);
};

const useRegisterUser = (onSuccess, onError) => {
  return useMutation(addNewUser, {
    onSuccess,
    onError
  });
};

export default useRegisterUser;
