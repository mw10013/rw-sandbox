import PublicLayout from './PublicLayout'

export const loggedIn = () => {
  mockCurrentUser({ id: 'cuid', email: 'rob@redwoodjs.com' })

  return <PublicLayout>Children</PublicLayout>
}

export const loggedOut = () => {
  return <PublicLayout>Children</PublicLayout>
}

export default { title: 'Layouts/PublicLayout' }
