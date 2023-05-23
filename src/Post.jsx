import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
 
    <article className="flex bg-white transition hover:shadow-xl my-4">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time
          datetime="2022-10-10"
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
        >
          <span class="w-px flex-1 bg-gray-900/10"></span>
          <span className="text-gray-400">
            {formatISO9075(new Date(createdAt))}
          </span>
        </time>
      </div>

      <div className="hidden sm:block sm:basis-56">
        <img
          alt="Guitar"
          src={"http://localhost:4000/" + cover}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <Link to={`/post/${_id}`}>
            <h3 class="font-bold uppercase text-gray-900">{title}</h3>
          </Link>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {summary}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <a
            href="#"
            className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
          >
            Read Blog
          </a>
        </div>
      </div>
    </article>
  );
}
