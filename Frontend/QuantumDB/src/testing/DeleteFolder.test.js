import { DeleteFolder } from '../functions/DeleteFolder';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

describe('DeleteFolder', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should delete a folder with valid inputs', async () => {
    // Mock axios.get to return a successful response
    axios.get.mockResolvedValue({ data: {} });

    // Call the DeleteFolder function with valid inputs
    await DeleteFolder('light', 'myFolder', 'documents');

    // Verify that axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      'http://ec2-18-224-39-255.us-east-2.compute.amazonaws.com:8000/delete/myFolder/documents/folder'
    );

    // Verify that the success notification was triggered with the correct theme and name
    expect(toast.success).toHaveBeenCalledWith('File: myFolder Deleted!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  });

  test('should show a warning notification when an error occurs', async () => {
    // Mock axios.get to throw an error
    const errorMessage = 'An error occurred';
    axios.get.mockRejectedValue(new Error(errorMessage));

    // Call the DeleteFolder function
    await DeleteFolder('light', 'myFolder', 'documents');

    // Verify that the warning notification was triggered with the correct theme and error message
    expect(toast.warn).toHaveBeenCalledWith(Error(errorMessage), {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  });
});