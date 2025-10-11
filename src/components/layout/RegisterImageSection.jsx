import logoColors from '../../assets/logo-colors.svg'
import createAccountImage from '../../assets/create-account-image.png'

function RegisterImageSection() {
  return (
    <>
      <div className="absolute top-8 left-8">
        <img src={logoColors} alt="Runner Circle" className="h-12" />
      </div>
      <div className="flex items-center justify-center w-full p-8">
        <img 
          src={createAccountImage} 
          alt="Corredora se aquecendo" 
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </>
  )
}

export default RegisterImageSection