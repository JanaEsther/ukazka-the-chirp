import { render } from '@czechitas/render';
import { Post } from '../components/Post';
import { fetchUser } from '../functions/fc';
import '../global.css';
import './index.css';
import './profil.css';

const params = new URLSearchParams(window.location.search);
const userId = params.get('user');


const user = await fetchUser(userId);

document.querySelector('#root').innerHTML = render(
  <div className="container">
    <h1>Profil uživatele</h1>
    <img
      className="post__avatar"
      src={`http://localhost:4000${user.avatar}`}
      alt={user.name}
    />
    <div>
      <h2>
        {user.name} <small>{user.handler}</small>
      </h2>
      <p>{user.bio}</p>
    </div>
  </div>,
);
