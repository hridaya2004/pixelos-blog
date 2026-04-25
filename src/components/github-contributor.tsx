import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "./avatar";

interface GithubContributorsProps {
  users: string[];
}

export const GithubContributors = ({ users }: GithubContributorsProps) => (
  <AvatarGroup>
    {users.map((username) => (
      <Avatar className="ring-fd-accent" key={username}>
        <AvatarImage src={`https://github.com/${username}.png`} alt={username} />
        <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    ))}
  </AvatarGroup>
);

interface PageAuthorsProps {
  authors?: string[];
}

export const PageAuthors = ({ authors }: PageAuthorsProps) => {
  if (!authors) {
    return null;
  }
  return (
    <div className="inline-flex items-center gap-2">
      <span>{authors.length > 1 ? "Authors: " : "Author: "}</span>
      <GithubContributors users={authors} />
    </div>
  );
};
