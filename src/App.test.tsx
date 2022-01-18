import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from './App';

afterEach(cleanup)


test('renders title', () => {
  render(<App />)
  const titleElement = screen.getByText(/Search for music/i);
  expect(titleElement).toBeInTheDocument();
});

test('show no results label when there is an empty search through submit', () => {
  render(<App />) 
  const formsubmit = screen.getByTestId('searchForm'); 

  fireEvent.submit(formsubmit);  
  expect(screen.queryByTestId(/noResult/i)).toBeTruthy();

});

test('Do not show no results label when no input on submission has been made', () => {
  render(<App />)   
  const search = screen.getByTestId('search'); 
  fireEvent.change(search);
  expect(screen.queryByTestId(/noResult/i)).toBeFalsy();
});

test('Show no results label when no results are found', () => {
  render(<App />)   
  const search = screen.getByTestId('search'); 
  fireEvent.change(search, { target: {value:'kljvdljkfdklgjfkl'}});
  expect(screen.queryByTestId(/noResult/i)).toBeTruthy();
});

test('Show 10 results if a search is successful', async () => {
  const manualData = [
    {trackCensoredName: 'Hello', artistName: 'John Smith', collectionCensoredName: 'Happy days'},
    {trackCensoredName: 'Hello', artistName: 'John Smith', collectionCensoredName: 'Happy days'},
    {trackCensoredName: 'Hello', artistName: 'John Smith', collectionCensoredName: 'Happy days'},
    {trackCensoredName: 'Hello', artistName: 'John Smith', collectionCensoredName: 'Happy days'},
    {trackCensoredName: 'Hello', artistName: 'John Smith', collectionCensoredName: 'Happy days'},
    {trackCensoredName: 'Hello', artistName: 'John Smith', collectionCensoredName: 'Happy days'},
    {trackCensoredName: 'Hello', artistName: 'John Smith', collectionCensoredName: 'Happy days'},
    {trackCensoredName: 'Hello', artistName: 'John Smith', collectionCensoredName: 'Happy days'},
    {trackCensoredName: 'Hello', artistName: 'John Smith', collectionCensoredName: 'Happy days'},
    {trackCensoredName: 'Hello', artistName: 'John Smith', collectionCensoredName: 'Happy days'}
  ];
  //@ts-ignore
  render(<App manualData={manualData} />)   
  const search = screen.getByTestId('search'); 
  await fireEvent.change(search, { target: {value:'Michael Jackson'}});
  expect(screen.getAllByTestId('result')).toHaveLength(10);
  
});




