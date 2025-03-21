import { PostProvider } from './context/PostContext';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import { apiUrl } from './config';

function App() {
  console.log('URL-->', apiUrl);
  return (
    <div className="App bg-theme-dark relative">
      <PostProvider>
        <PostForm />
        <PostList />
      </PostProvider>
    </div>
  );
}

export default App;
