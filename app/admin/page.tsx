import { authMiddleware } from '@/lib/auth';

export default async function Dashboard() {
  await authMiddleware();

  const adminLinks = [
    { label: "weights", link: "/admin/weights", dev: false },
    { label: "users", link: "/admin/users", dev: true },
    { label: "exercise", link: "/admin/exercise", dev: true }
  ];

  return (
    <main className="min-h-screen flex items-center justify-center py-auto">
      <div className="flex justify-between mx-auto p-1">
        {adminLinks.map((a) => (
          <a key={a.link} href={a.link}>
            <div className={`m-3 text-xl uppercase p-3 border rounded-lg ${a.dev ? 'text-red-500' : 'text-blue-500'}`}>
              {a.label}
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
