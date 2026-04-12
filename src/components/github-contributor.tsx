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
