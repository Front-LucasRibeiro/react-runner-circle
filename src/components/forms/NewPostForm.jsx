import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Textarea from '../ui/Textarea'
import RadioGroup from '../ui/RadioGroup'

function NewPostForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    tempo: '',
    distancia: '',
    ritmo: '',
    calorias: '',
    elevacao: '',
    bpm: '',
    descricao: '',
    tipoTreino: 'corrida'
  })

  const handleChange = (field) => (e) => {
    const value = e.target ? e.target.value : e
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(formData)
  }

  const workoutTypes = [
    { value: 'caminhada', label: 'Caminhada' },
    { value: 'corrida', label: 'Corrida' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-brand-graphite">Nova postagem</h2>
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

        {/* Métricas do Treino */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Tempo"
            placeholder="30"
            value={formData.tempo}
            onChange={handleChange('tempo')}
            type="number"
          />
          <div className="text-right pt-8">
            <span className="text-sm text-brand-gray-medium">Minutos</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Distância"
            placeholder="5km"
            value={formData.distancia}
            onChange={handleChange('distancia')}
          />
          <Input
            label="Ritmo"
            placeholder="6'00&#34;/km"
            value={formData.ritmo}
            onChange={handleChange('ritmo')}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Calorias"
            placeholder="300 kcal"
            value={formData.calorias}
            onChange={handleChange('calorias')}
          />
          <Input
            label="Elevação"
            placeholder="50 m"
            value={formData.elevacao}
            onChange={handleChange('elevacao')}
          />
          <Input
            label="BPM"
            placeholder="120"
            value={formData.bpm}
            onChange={handleChange('bpm')}
            type="number"
          />
        </div>

        {/* Descrição */}
        <Textarea
          label="Descrição"
          placeholder="Conte como foi seu treino! Como se sentiu? Alguma dificuldade? Conquista especial? Compartilhe sua experiência com a comunidade."
          value={formData.descricao}
          onChange={handleChange('descricao')}
          rows={4}
        />

        {/* Tipo de Treino */}
        <RadioGroup
          name="tipoTreino"
          label="Tipo de Treino"
          options={workoutTypes}
          value={formData.tipoTreino}
          onChange={handleChange('tipoTreino')}
        />

        {/* Botões */}
        <div className="flex space-x-4 pt-4">
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
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewPostForm