import { useState, useEffect } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Textarea from '../ui/Textarea'

function EditProfileForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    bio: ''
  })
  const [originalPassword, setOriginalPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3001/user')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const userData = await response.json()
        
        setFormData({
          name: userData.name || '',
          username: userData.username || '',
          email: userData.email || '',
          phone: userData.phone || userData.telefone || '',
          city: userData.city || userData.cidade || '',
          state: userData.state || userData.estado || '',
          bio: userData.bio || ''
        })
        setOriginalPassword(userData.password || '')
        setError(null)
      } catch (err) {
        console.error('Error fetching user data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (field) => (e) => {
    const value = e.target ? e.target.value : e
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: originalPassword,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          bio: formData.bio
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      onSubmit?.(formData)
    } catch (err) {
      console.error('Error updating user data:', err)
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Carregando dados do perfil...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="flex justify-center items-center py-8">
          <div className="text-red-500">Erro ao carregar perfil: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-brand-graphite">Editar Perfil</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Informações Pessoais */}
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={handleChange('name')}
            placeholder="Your full name"
          />

          <Input
            label="Username"
            value={formData.username}
            onChange={handleChange('username')}
            placeholder="@yourusername"
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="your@email.com"
          />

          <Input
            label="Phone"
            value={formData.phone}
            onChange={handleChange('phone')}
            placeholder="(11) 99999-9999"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              value={formData.city}
              onChange={handleChange('city')}
              placeholder="Your city"
            />
            <Input
              label="State"
              value={formData.state}
              onChange={handleChange('state')}
              placeholder="SP"
            />
          </div>

          <Textarea
            label="Bio"
            value={formData.bio}
            onChange={handleChange('bio')}
            placeholder="Tell us about yourself..."
            rows={3}
          />
        </div>

        {/* Botões */}
        <div className="flex space-x-4 pt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-brand-green-lime text-brand-graphite hover:bg-brand-green-medium"
          >
            Salvar alterações
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProfileForm