import { PostProvider } from './context/PostContext';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import { apiUrl } from './config';

function App() {
  console.log('URL-->', apiUrl);
  return (
    <PostProvider>
      <div className="App bg-theme-dark">
        <PostForm />
        <PostList />
      </div>
    </PostProvider>
  );
}

export default App;
