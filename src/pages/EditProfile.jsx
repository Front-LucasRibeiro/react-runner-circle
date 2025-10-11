import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import BottomNavigation from '../components/layout/BottomNavigation'
import EditProfileForm from '../components/forms/EditProfileForm'

import { useState } from 'react'

function EditProfile({ onNavigateToFeed, onNavigateToNewPost, onLogout }) {
  const [activeItem, setActiveItem] = useState('profile')

  const handleMenuClick = (itemId) => {
    setActiveItem(itemId)
    
    if (itemId === 'feed') {
      onNavigateToFeed?.()
    } else if (itemId === 'logout') {
      onLogout?.()
    }
  }
  const handleSubmit = (formData) => {
    console.log('Perfil atualizado:', formData)
    // Aqui seria onde salvaria os dados no backend
    // Por enquanto, só navega de volta ao feed
    onNavigateToFeed?.()
  }

  const handleCancel = () => {
    onNavigateToFeed?.()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="md:flex">
        {/* Desktop Sidebar */}
        <Sidebar activeItem={activeItem} onItemClick={handleMenuClick} />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-4xl mx-auto">
            <EditProfileForm 
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeItem={activeItem} onItemClick={handleMenuClick} />
    </div>
  )
}

export default EditProfile