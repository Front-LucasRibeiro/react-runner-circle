import logoColors from '../../assets/logo-colors.svg'
import loginImage from '../../assets/login-image.png'

function ImageSection() {
  return (
    <>
      <div className="absolute top-8 left-8">
        <img src={logoColors} alt="Runner Circle" className="h-12" />
      </div>
      <div className="flex items-center justify-center w-full p-8">
        <img 
          src={loginImage} 
          alt="Corredores felizes" 
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </>
  )
}

export default ImageSection