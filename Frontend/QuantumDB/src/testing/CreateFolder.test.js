import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { CreateFolder } from '../functions/CreateFolder';
import {ThemeContext} from '../components/ThemeContext';
import React, { useContext } from 'react'

// const {theme,setTheme} = useContext(ThemeContext)


    // Mock the necessary dependencies
    jest.mock('axios');
    jest.mock('react-toastify', () => ({
      toast: {
        success: jest.fn(),
        warn: jest.fn(),
      },
    }));
    jest.mock('axios', () => ({
        get: jest.fn(() => Promise.resolve({ data: 'Mocked response' })),
      }));
      describe('CreateFolder', () => {
        afterEach(() => {
          jest.clearAllMocks();
        });
  test('should create a folder with valid inputs', () => {
    
    axios.get.mockResolvedValue({ data: 'Response data' });


    // Call the CreateFolder function with valid inputs
    CreateFolder('light', 'myFolder', 'documents');

    // Verify that axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith('http://ec2-18-224-39-255.us-east-2.compute.amazonaws.com:8000/create/myFolder/documents/folder');

    // Verify that the success notification was triggered with the correct theme and name
    expect(toast.success).toHaveBeenCalledWith('Folder: myFolder Created!', {
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

  test('should show a warning notification when name is empty', () => {


    // Call the CreateFolder function with an empty name
    CreateFolder('light', '', '/documents/');

    // Verify that the warning notification was triggered with the correct theme and error message
    expect(toast.warn).toHaveBeenCalledWith('Please fill out the file name.', {
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

  test('should show a warning notification when name contains extension', () => {
    // Mock the necessary dependencies
    jest.mock('axios');
    jest.mock('react-toastify', () => ({
      toast: {
        success: jest.fn(),
        warn: jest.fn(),
      },
    }));

    // Call the CreateFolder function with a name containing an extension
    CreateFolder('light', 'myFolder.json', '/documents/');

    // Verify that the warning notification was triggered with the correct theme and error message
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
  });
});