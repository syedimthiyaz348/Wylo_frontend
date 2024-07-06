import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import PostDisplay from './components/PostsDisplay';

function App() {
  return (
    <div className="App">
      <Header/>
      <PostDisplay/>
    </div>
  );
}

export default App;
