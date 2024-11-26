
type User = {
  id: number;
  name: string;
};

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('http://localhost:3000/api/users'); 
  const data = await response.json();
  return data;
}

export default async function Omnie() {
  const users = await fetchUsers();

  return (
    <div>
      <h1>Lista użytkowników:</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
