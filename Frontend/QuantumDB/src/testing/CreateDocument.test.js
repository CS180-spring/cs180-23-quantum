//const CreateDocument = require('./CreateDocument');
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {CreateDocument} from '../functions/CreateDocument';


//import axios from 'axios';
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
  
  
describe('CreateDocument', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('should create a document with valid inputs', () => {
      // Mock the axios.get method to simulate a successful request
      axios.get.mockResolvedValue({ data: 'Response data' });
  
      // Call the CreateDocument function with valid inputs
      CreateDocument('light', 'my-document', 'documents');
  
      // Verify that axios.get was called with the correct URL
      expect(axios.get).toHaveBeenCalledWith('http://ec2-18-224-39-255.us-east-2.compute.amazonaws.com:8000/create/my-document/documents/file');
  
      // Verify that the success notification was triggered with the correct theme and name
      expect(toast.success).toHaveBeenCalledWith('Document: my-document Created!', {
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
      // Call the CreateDocument function with an empty name
      CreateDocument('light', '', '/documents/');
  
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
      // Call the CreateDocument function with a name containing an extension
      CreateDocument('light', 'my-document.json', 'documents');
  
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