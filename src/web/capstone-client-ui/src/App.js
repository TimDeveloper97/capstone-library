import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import BookItem from './components/bookItem/BookItem';

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <div style={{display:'block'}}>
      <BookItem />
      </div>
    </div>
  );
}

export default App;
