import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Loading from '../Loading'

type Props = { children: React.ReactNode }

const PrivateRoute = ({ children }: Props) => {
  const { user, loading } = useAuth()

  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default PrivateRoute
