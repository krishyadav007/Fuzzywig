import prisma from '@/lib/prisma'

export default async function UsersPage() {
  const users =  await prisma.user.findMany({
    // orderBy: {
    //   createdAt: 'desc'
    // }
  })

  const files = [
    { name:"SOP for Chat masala", href: '#'},
    { name:"SOP for Pani puri", href: '#' },
    { name:"More instructions", href: '#' },
  ] 

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit assinant</h1>
      <div className="rounded overflow-hidden border-2 border-sky-500">
        <div className="px-6 py-4">
          <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out"> Last run: Random date</a>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">

    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
    <div className="rounded overflow-hidden border-2 border-yellow-300	">
            <div className="px-6 py-4">
                <a href="#"
                    className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">Add more files</a>
                <p className="text-gray-500 text-sm">
                    Add more files
                </p>
            </div>
        </div>
      {files.map((file) => {
            // const Icon = item.icon
            return (
                <div key={file.href} className="rounded overflow-hidden border-2 border-sky-500">
                  <div className="px-6 py-4">
                      <a href="#"
                          className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{file.name}</a>
                      <p className="text-gray-500 text-sm">
                          The city that never sleeps
                      </p>
                  </div>
              </div>
              // <Link
              //   key={item.href}
              //   href={item.href}
              //   className={`flex items-center px-4 py-3 hover:bg-gray-700 ${
              //     pathname === item.href ? 'bg-gray-700' : ''
              //   }`}
              // >
              //   <Icon className="w-5 h-5 mr-3" />
              //   {item.label}
              // </Link>
            )
          })}
    </div>
</div>
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assinant name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.image && (
                      <img
                        className="h-8 w-8 rounded-full mr-3"
                        src={user.image}
                        alt=""
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'ADMIN' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}