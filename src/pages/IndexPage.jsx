import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
        setFiltered(posts); // Initialize filtered posts with all posts
      });
    });
  }, []);

  useEffect(() => {
    // Filter posts based on the search input
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredPosts);
  }, [search, posts]);

  return (
    <>
      <div className="bg-white">
        <input
          type="text"
          className="input bg-white mb-[100px]"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          placeholder="Search..."
        />

        {filtered.length > 0 ? (
          filtered.map((post, index) => <Post key={index} {...post} />)
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </>
  );
}
