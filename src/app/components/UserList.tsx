type UserListProps = {
  users: { id: number; name: string }[];
};

export const UserList = ({ users }: UserListProps) => {
  return (
    <ul className="list-none p-0 text-gray-700 space-y-3">
      {users.map((user) => (
        <li
          key={user.id}
          className="bg-gray-100 rounded-lg p-3 shadow-sm hover:bg-gray-200 transition-colors"
        >
          {user.name}
        </li>
      ))}
    </ul>
  );
};
