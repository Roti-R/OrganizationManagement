import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import District from '../../features/district'
import { Navigate, Router } from 'react-router-dom'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "District" }))
    }, [])


    return (
        <District />

    )
}

export default InternalPage