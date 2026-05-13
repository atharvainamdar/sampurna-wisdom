import Link from 'next/link';

type Translation = {
  language: string;
  title: string | null;
  video_url: string | null;
  audio_url: string | null;
  resources: unknown;
};

type WisdomRow = {
  id: string;
  slug: string;
  content_date: string;
  pillar: string;
  status: string;
  published_at: string | null;
  wisdom_translations: Translation[] | null;
};

export function WisdomPostList({ posts }: { posts: WisdomRow[] }) {
  return (
    <div className="admin-panel saved-posts-panel">
      <div className="editor-header-row">
        <div>
          <h2>Saved wisdom</h2>
          <p>{posts.length ? 'Recent posts from Supabase.' : 'No saved posts yet. Create the first one above.'}</p>
        </div>
      </div>
      <div className="saved-post-list">
        {posts.map((post) => {
          const languages = post.wisdom_translations?.map((item) => item.language.toUpperCase()).join(' / ') || 'No language text';
          const title = post.wisdom_translations?.find((item) => item.language === 'en')?.title || post.wisdom_translations?.[0]?.title || post.slug;
          return (
            <article className="saved-post-row" key={post.id}>
              <div>
                <span>{post.content_date} • {post.pillar}</span>
                <h3>{title}</h3>
                <small>{languages}</small>
              </div>
              <div className="saved-post-actions">
                <b className={`status-badge ${post.status}`}>{post.status}</b>
                {post.status === 'published' ? <Link href={`/en/wisdom/${post.slug}`}>View</Link> : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
