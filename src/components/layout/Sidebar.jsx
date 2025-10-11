import FeedIcon from '@mui/icons-material/Feed'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'

function Sidebar({ activeItem = 'feed', onItemClick }) {
  const getIcon = (iconId) => {
    const iconProps = { className: "w-6 h-6" }
    switch (iconId) {
      case 'feed': return <FeedIcon {...iconProps} />
      case 'profile': return <PersonIcon {...iconProps} />
      case 'logout': return <LogoutIcon {...iconProps} />
      default: return null
    }
  }

  const menuItems = [
    { id: 'feed', label: 'Feed' },
    { id: 'profile', label: 'Perfil' },
    { id: 'logout', label: 'Logout' }
  ]

  return (
    <aside className="hidden md:flex bg-brand-graphite text-white w-16 min-h-screen flex-col items-center py-6 space-y-6">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick?.(item.id)}
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
            activeItem === item.id 
              ? 'bg-brand-green-lime text-brand-graphite' 
              : 'hover:bg-gray-700 text-gray-400'
          }`}
          title={item.label}
        >
          {getIcon(item.id)}
        </button>
      ))}
    </aside>
  )
}

export default Sidebar