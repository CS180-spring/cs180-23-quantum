import { DeleteDocument } from '../functions/DeleteDocument';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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
describe('DeleteDocument', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should delete a document with valid inputs', async () => {

    axios.get.mockResolvedValue({ data: 'Response data' });

    await DeleteDocument('light', 'my-document', 'documents');

    expect(axios.get).toHaveBeenCalledWith(
      'http://ec2-18-224-39-255.us-east-2.compute.amazonaws.com:8000/delete/my-document/documents/file'
    );

    expect(toast.success).toHaveBeenCalledWith('File: my-document Deleted!', {
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

    await DeleteDocument('light', 'my-document', 'documents');

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