import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { UpdateFolder } from '../functions/UpdateFolder';

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
  
describe('UpdateFolder', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should show a warning notification when new name is empty', async () => {

    await UpdateFolder('light', 'oldFolder', '', 'path');

    // Verify that the warning notification was triggered with the correct theme and error message
    expect(toast.warn).toHaveBeenCalledWith('Please fill out the folder name.', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    expect(axios.get).not.toHaveBeenCalled();

    expect(toast.success).not.toHaveBeenCalled();
  });

  test('should show a warning notification when new name contains extension', async () => {
    
    await UpdateFolder('light', 'oldFolder', 'newFolder.json', 'path');

  
    expect(toast.warn).toHaveBeenCalledWith('Please remove extension from name.', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });


    expect(axios.get).not.toHaveBeenCalled();

    expect(toast.success).not.toHaveBeenCalled();
  });

  test('should make a request and show a success notification on successful update', async () => {

    axios.get.mockResolvedValue({});


    await UpdateFolder('light', 'oldFolder', 'newFolder', 'path');

    expect(axios.get).toHaveBeenCalledWith(
      'http://ec2-18-224-39-255.us-east-2.compute.amazonaws.com:8000/update/oldFolder/newFolder/path/folder'
    );

    // Verify that the success notification was triggered with the correct theme and name
    expect(toast.success).toHaveBeenCalledWith('Folder successfully renamed!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    // Verify that the warning notification was not triggered
    expect(toast.warn).not.toHaveBeenCalled();
  });

  test('should handle an error and show a warning notification', async () => {
    // Mock axios.get to throw an error
    const errorMessage = 'An error occurred';
    axios.get.mockRejectedValue(new Error(errorMessage));

    // Call the UpdateFolder function
    await UpdateFolder('light', 'oldFolder', 'newFolder', 'path');

    // Verify that axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      'http://ec2-18-224-39-255.us-east-2.compute.amazonaws.com:8000/update/oldFolder/newFolder/path/folder'
    );

 
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


    expect(toast.success).not.toHaveBeenCalledWith();

  });
});