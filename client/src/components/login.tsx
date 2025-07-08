export function Login({ login }: { login: (username: string) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    if (typeof username === 'string' && username.trim()) {
      login(username.trim());
    }
  };

  return (
    <div>
      <h1>Welcome to Live Cursors!</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input name="username" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
