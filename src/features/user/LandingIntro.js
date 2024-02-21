function LandingIntro({ page }) {

  return (
    <div className={`w-full h-full p-4 bg-base-200`}>
      <div className={`w-full h-full ${page == 'login' ? 'bg-img-login' : (page == 'register' ? 'bg-img-register' : 'bg-img-forgot')}`}>
        <h1 className='text-3xl text-center font-bold '></h1>
      </div>
    </div>
  )
}

export default LandingIntro