import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ReadCollection } from '../functions/ReadCollection';

// Mock the necessary dependencies
jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn(),
  },
}));
// Mock the axios library
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: 'Mocked response' })),
  }));

describe('ReadCollection', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return an array of objects on successful read', async () => {
    const mockResponseData = 'object1-object2-object3-';
    axios.get.mockResolvedValue({ data: mockResponseData });

    const result = await ReadCollection('my-collection', 'collections', 'json');

    expect(axios.get).toHaveBeenCalledWith(
      'http://ec2-18-224-39-255.us-east-2.compute.amazonaws.com:8000/read/my-collection/collections/json'
    );

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(['object1', 'object2', 'object3']);
  });

//   test('should handle an error and show a warning notification', async () => {
//     const errorMessage = 'An error occurred';
//     axios.get.mockRejectedValue(new Error(errorMessage));

//     await ReadCollection('my-collection', 'collections', 'json');



//     expect(toast.warn).toHaveBeenCalledWith(errorMessage, {
//       position: 'bottom-right',
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'light',
//     });

//   });
});