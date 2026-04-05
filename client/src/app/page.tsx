type Post = {
  id: number;
  title: string;
  content: string;
  tags: string | null;
  created_at: string;
};

export default async function Home() {
  const res = await fetch("http://localhost:3000/posts");
  const posts: Post[] = await res.json();

  return (
    <>
      {/* <div className="flex flex-col flex-1 items-center justify-center gap-16"> */}
      <header className="w-full max-w-3xl flex items-center justify-between border-b border-gray-300 pb-4">
        <h1>Code.Log</h1>
      </header>

      <main className="flex flex-1 w-full max-w-3xl flex-col items-center gap-16 sm:items-start">
        <div className="w-full flex flex-col gap-8">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              {post.tags && <p className="text-sm text-gray-500">Tags: {post.tags}</p>}

              <p className="text-base mt-2">{post.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </main>
      {/* </div> */}
    </>
  );
}
