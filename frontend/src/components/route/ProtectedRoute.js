import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PrivateComponent = ({ isAdmin, element: Element, ...props }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth)
  const navigate = useNavigate();

  if(!loading && !isAuthenticated) {
    navigate("/login");
    return null;
  }

  if(isAdmin && !isAuthenticated.user.role !== 'admin') {
    navigate("/");
    return null;
  }

  return isAuthenticated ? <Element {...props}/> : null;
}
