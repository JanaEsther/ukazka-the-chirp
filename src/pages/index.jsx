import { render } from '@czechitas/render';
import { Post } from '../components/Post';
import { fetchUser, fetchPosts } from '../functions/fc';
import '../global.css';
import './index.css';

const idUser = 4;
const loggedUser = await fetchUser(idUser);
const posts = await fetchPosts();
let edittedPost = null;

document.querySelector('#root').innerHTML = render(
  <div className="container">
    <h1>The Chirp</h1>
    <form className="post-form">
      <p>Co máte na srdci?</p>
      <textarea placeholder="Napište něco..." className="post-input"></textarea>
      <button type="submit">Publikovat</button>
    </form>

    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  </div>,
);

document.querySelector('.post-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const text = document.querySelector('.post-input').value;
  const post = {
    userName: loggedUser.name,
    userId: loggedUser.id,
    userHandle: loggedUser.handle,
    userAvatar: loggedUser.avatar,
    text,
    likes: 0,
  };

  await fetch('http://localhost:4000/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  window.location.reload();
});

const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    const postId = e.target.dataset.id;
    await fetch(`http://localhost:4000/api/posts/${postId}`, {
      method: 'DELETE',
    });
    window.location.reload();
  });
});

const editButtons = document.querySelectorAll('.edit-btn');
editButtons.forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    const postId = Number(e.target.dataset.id);
    edittedPost = posts.find((p) => p.id === postId);

    document.querySelector('.post-form button').textContent = 'Upravit';
    const postInput = document.querySelector('.post-input');
    postInput.value = edittedPost.text;
    postInput.focus();
  });
});
