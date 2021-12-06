export default function UserCard({ id, name, url, avatar }) {
  return (
    <div className={"user"}>
      <img width="50" src={avatar} alt={id} />
      <div>{name}</div>
      <div>{url}</div>
    </div>
  );
}
