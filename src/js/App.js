import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import '../index.css'

export default () => {
    return (
        <>
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </>
    )
}