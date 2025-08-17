import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">PayFlow Dashboard</h1>
      <div className="space-x-4">
        <Link href="/topup">Add Money</Link>
        <Link href="/send">Send Money</Link>
        <Link href="/transactions">Transactions</Link>
      </div>
    </div>
  )
}