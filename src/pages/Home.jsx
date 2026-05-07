import React from 'react'
import UserDeshboard from '../components/userDeshboard'
import OwnerDeshboard from '../components/OwnerDeshboard'
import { useSelector } from 'react-redux'

const Home = () => {
      const { userData } = useSelector(state => state.user)

  return (

    <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
        {/* {userData.fullName} */}
        {userData.role==='member' && <UserDeshboard/>}
        {userData.role==='admin' && <OwnerDeshboard/>}
    </div>
  )
}

export default Home
