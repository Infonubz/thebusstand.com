// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';  // Add this if using routing
// import App from './App';

// test('renders learn react link', () => {
//   render(
//     <MemoryRouter>
//       <App />
//     </MemoryRouter>
//   );
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import { createStore } from 'redux';
import { busreducer } from './Store/Reducer'; // Import your reducer

// Create the store for testing
const store = createStore(busreducer);

test('renders learn react link', async () => {
  // Render the App component with the store provider
  await act(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  // Custom matcher to check if "learn react" is in the document
  expect(screen.getByText((content, element) => content.includes("learn react"))).toBeInTheDocument();
});

