import React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../redux-store'

const Logout = () => {

  const dispatch = useDispatch()
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(authActions.logout())
  }, [dispatch])

  return  navigateTo('/')
}

export default Logout
