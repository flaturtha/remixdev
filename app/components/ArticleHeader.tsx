import { Separator } from "../../@/components/ui/separator";

export function ArticleHeader({ title, author, date }: { title: string; author: string; date: string }) {
  return (
    <div className="space-y-2 not-prose">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
        {title}
      </h1>
      <div className="flex items-center space-x-4 text-muted-foreground">
        <p>By {author}</p>
        <Separator orientation="vertical" />
        <p>Published on {date}</p>
      </div>
    </div>
  );
}
