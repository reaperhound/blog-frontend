import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {UserContext} from "../UserContext";
import {Link} from 'react-router-dom';

export default function PostPage() {
  const [postInfo,setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();

  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState([])
  // console.log(postInfo.comments[0].comment);
  //       setShowComments(comments)
  // console.log(showComments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postId = postInfo._id
    try {
      const response = await fetch('http://localhost:4000/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment,
          postId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Comment submitted:', data);
        // Reset comment field
        setComment('');
      } else {
        console.error('Error submitting comment:', response.status);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  if (!postInfo) return '';

  return (
    <div className="post-page">
      <h1 className="font-semibold">{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="my-4">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} className="rounded-md" alt=""/>
      </div>
      <div className="p-8  text-red-500" dangerouslySetInnerHTML={{__html:postInfo.content}} />
      <div>
        {
          postInfo.comments.map(comm => <p className="p-10 bg-slate-100 my-4 rounded-[25px] shadow-xl">{comm.comment}</p>)
        }
        </div>
      <h2 className="mx-auto font-semibold text-2xl my-4">Submit a Comment</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full max bg-slate-50 my-3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          rows={4}
        ></textarea>
        <button type="submit" className="btn">Submit Comment</button>
      </form>
    </div>
  );
}